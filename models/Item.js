const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
  Id: { type: Number, required: true },
  RecentPrice: { type: Number, required: true },
  CurrentMinPrice: { type: Number, required: true },
  Time: { type: String, required: true },
});

module.exports = mongoose.model("Item", ItemSchema);
