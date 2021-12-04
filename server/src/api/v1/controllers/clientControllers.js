import Client from "../models/clientModel.js";
import Company from "../models/companyModel.js";
import Joi from "joi";

export const getAllClients = async (req, res) => {
  const clients = await Client.find().populate("company");
  res.json({ message: "Successful", data: clients });
};

export const addCLient = async (req, res) => {
  const { name, companyId, phone, email, note } = req.body;
  const company = await Company.findById(companyId);

  //validations
  if (!company) {
    res.status(404);
    throw new Error("Company Doesn't Exist");
  }
  const validation = Joi.object({
    name: Joi.string(),
    email: Joi.string().email().required(),
  }).validate(req.body, { abortEarly: false, allowUnknown: true });
  if (validation.error) {
    res.status(400);
    throw new Error(validation.error);
  }

  const newClient = new Client({
    name,
    company: companyId,
    phone,
    email,
    note,
  });
  await newClient.save();
  res.json({ message: "Successful", data: newClient });
};
