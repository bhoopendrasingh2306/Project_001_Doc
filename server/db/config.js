const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://bhoopendrasingh2306:bhoopendra@cluster001.dj3x6bj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster001");
mongoose.connection.once("open", () => {
  console.log("mongodb connected successfully");
});
