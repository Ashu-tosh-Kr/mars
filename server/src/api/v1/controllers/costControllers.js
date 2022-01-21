import Cost from "../models/costModel.js";
import Gig from "../models/gigModel.js";

export const addCost = async (req, res) => {
  const { costCategory, costDetail, price, paymentMethod } = req.body;
  const gig = await Gig.findById(req.params.gigId);
  //validation
  if (!gig) {
    res.status(404);
    throw new Error("Gig doesn't exist");
  }
  const newCost = new Cost({
    costCategory,
    costDetail,
    price: +price,
    paymentMethod,
  });
  await newCost.save();
  gig.costs.push(newCost);
  await gig.save();
  res.json({ message: "Cost Added Successfully", data: newCost });
};

export const delCost = async (req, res) => {
  const { costId } = req.body;
  const gig = await Gig.findById(req.params.gigId);
  //validation
  if (!gig) {
    res.status(404);
    throw new Error("Gig doesn't exist");
  }
  await Cost.findByIdAndDelete(costId);
  gig.costs = gig.costs.filter((cost) => cost._id.toString() !== costId);
  await gig.save();
  res.json({ message: "Cost Added Successfully" });
};
