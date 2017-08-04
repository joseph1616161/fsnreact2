const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const bodyParser = require("body-parser");
const keys = require("./config/keys");

require("./models/user");
require("./services/passport");

mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoURI);

const app = express();
app.disable("x-powered-by");
app.use(bodyParser.json());
app.use(
	cookieSession({
		maxAge: 30 * 24 * 60 * 60 * 1000,
		keys: [keys.cookieKey]
	})
);
app.use(passport.initialize());
app.use(passport.session());

require("./routes/authRoutes")(app);

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
