// keys.js figure out what credentials to return

if (process.env.NODE_ENV === "production") {
	//In production, rettrun prod keys
	module.exports = require("./prod");
} else {
	//In production, retrun dev keys
	module.exports = require("./dev");
}
