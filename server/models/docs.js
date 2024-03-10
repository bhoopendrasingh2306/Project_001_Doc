const mongoose = require("mongoose");

const DocsSchema = new mongoose.Schema({
  name: String,
  ownerId: String,
  users: Array,
  text: String,
});

const DocsModel = mongoose.model("Docs", DocsSchema);
module.exports = DocsModel;
