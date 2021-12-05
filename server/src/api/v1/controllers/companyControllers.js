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

export const editCompany = async (req, res) => {
  const { companyId, name, postCode, officeAddress, note } = req.body;
  const company = await Company.findById(companyId);

  //validations
  if (!company) {
    res.status(404);
    throw new Error("Company Doesn't Exist");
  }

  const newCompany = await Company.findOneAndUpdate(
    { _id: companyId },
    {
      name,
      postCode,
      officeAddress,
      note,
    },
    {
      new: true,
    }
  );
  res.json({ message: "Successful", data: newCompany });
};
