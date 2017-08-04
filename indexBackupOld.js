const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require("./config/keys");

passport.use(
	new GoogleStrategy(
		{
			clientID: keys.googleClientID,
			clientSecret: keys.googleClientSecret,
			callbackURL: "/auth/google/callback"
		},
		(accessToken, refreshToken, profile, done) => {
			console.log("====================================");
			console.log("access token:  ", accessToken);
			console.log("====================================");
			console.log("refresh token:  ", refreshToken);
			console.log("====================================");
			console.log("profile:  ", profile);
			console.log("==================================");
		}
	)
);

app.get(
	"/auth/google",
	passport.authenticate("google", {
		//tell google what kind of access we want to have
		scope: ["profile", "email"]
	})
);

app.get("/auth/google/callback", passport.authenticate("google"));

app.listen(PORT, () => {
	console.log("====================================");
	console.log(`SERVER STARTED, LISTENING PORT ${PORT}`);
	console.log("====================================");
});
