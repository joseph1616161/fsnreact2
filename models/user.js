const mongoose = require("mongoose");
// const Schema = mongoose.Schema;

///object destructuring: The mongoose object' Schema property and asgin it to a variable called Schema
const { Schema } = mongoose;

const userSchema = new Schema({
	googleId: String
});

mongoose.model("users", userSchema);
