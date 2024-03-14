const mongoose = require("mongoose");

// const path = require('path')
// require('dotenv').config({ path: path.resolve(__dirname, '../../.env') })
// const USER = process.env.USER;
// const PASS = process.env.PASS;
mongoose.connect(`mongodb+srv://bhoopendrasingh2306:bhoopendra@cluster001.dj3x6bj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster001`);
mongoose.connection.once("open", () => {
  console.log("mongodb connected successfully");
});
