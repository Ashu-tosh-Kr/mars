import Company from "../models/companyModel.js";

export const getAllCompanies = async (req, res) => {
  const companies = await Company.find();
  res.json({ message: "Successful", data: companies });
};

export const addCompany = async (req, res) => {
  const { name, postCode, officeAddress, note } = req.body;

  const newCompany = new Company({
    name,
    postCode,
    officeAddress,
    note,
  });
  await newCompany.save();
  res.json({ message: "Successful", data: newCompany });
};
