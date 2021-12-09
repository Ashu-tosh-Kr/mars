import Client from "../models/clientModel.js";
import Company from "../models/companyModel.js";
import Joi from "joi";

export const getAllClients = async (req, res) => {
  const clients = await Client.find().populate("company");
  res.json({ message: "Successful", data: clients });
};

export const addCLient = async (req, res) => {
  const { name, title, companyId, clientTeam, phone, email, note } = req.body;
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
    title,
    company: companyId,
    clientTeam,
    phone,
    email,
    note,
  });
  await newClient.save();
  res.json({ message: "Successful", data: newClient });
};

export const editClient = async (req, res) => {
  const { clientId, name, title, companyId, clientTeam, phone, email, note } =
    req.body;
  const client = await Client.findById(clientId);
  const company = await Company.findById(companyId);

  //validations
  if (!client) {
    res.status(404);
    throw new Error("Client Doesn't Exist");
  }
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

  const newClient = await Client.findOneAndUpdate(
    { _id: clientId },
    {
      name,
      title,
      company: companyId,
      clientTeam,
      phone,
      email,
      note,
    },
    {
      new: true,
    }
  );
  res.json({ message: "Successful", data: newClient });
};
