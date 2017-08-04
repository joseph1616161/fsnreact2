const express = require("express");
const app = express();
const keys = require("./config/keys");
const mongoose = require("mongoose");
const passport = require("passport");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
require("./models/user"); //order of require can result in error
require("./services/passport");

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/emaily");
app.use(bodyParser.json());
app.use(
	cookieSession({
		maxAge: 30 * 24 * 60 * 60 * 1000,
		keys: [keys.cookieKey]
	})
);

//tell passport to make use of cookie to do the authentication
app.use(passport.initialize());
app.use(passport.session());

app.get("/", function(req, res) {
	res.send("hi");
});
require("./routes/authRoutes")(app); // SAME AS : const authRoutes = require("./routes/authRoutes"); authRoutes(app);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log("====================================");
	console.log(`SERVER STARTED, LISTENING PORT ${PORT}`);
	console.log("====================================");
});
