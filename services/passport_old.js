const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require("../config/keys");
const mongoose = require("mongoose");
const User = mongoose.model("users");

passport.serializeUser((user, done) => {
	done(null, user.id); // user.id is the mongo generated id, user is what passportjs found
});
passport.deserializeUser((id, done) => {
	User.findById(id).then(user => {
		done(null, user);
	});
});
passport.use(
	new GoogleStrategy(
		{
			clientID: keys.googleClientID,
			clientSecret: keys.googleClientSecret,
			callbackURL: "/auth/google/callback"
		},
		(accessToken, refreshToken, profile, done) => {
			User.findOne({ googleId: profile.id }).then(existingUser => {
				if (existingUser) {
					//We already have a record with the give profile ID
					console.log("====================================");
					console.log("access token:  ", accessToken);
					console.log("====================================");
					console.log("refresh token:  ", refreshToken);
					console.log("====================================");
					console.log("profile:  ", profile);
					console.log("==================================");
					console.log("profile:  ", existingUser.id);
					console.log("==================================");
					done(null, existingUser);
				} else {
					//We don't have a user record with this ID, make a new one
					new User({ googleId: profile.id })
						.save()
						.then(user => done(null, user));
				}
			});
		}
	)
);
