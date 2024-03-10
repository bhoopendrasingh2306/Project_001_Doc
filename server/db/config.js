const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/settyl_data");
mongoose.connection.once("open", () => {
  console.log("mongodb connected successfully");
});
