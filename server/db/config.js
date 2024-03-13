const mongoose = require("mongoose");
mongoose.connect("MONGO_DB_LINK");
mongoose.connection.once("open", () => {
  console.log("mongodb connected successfully");
});
