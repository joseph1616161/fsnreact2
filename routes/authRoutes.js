const passport = require("passport");

module.exports = app => {
	app.get(
		"/auth/google",
		passport.authenticate("google", {
			scope: ["profile", "email"]
		})
	);

	app.get(
		"/auth/google/callback",
		passport.authenticate("google"),
		(req, res) => {
			console.log("====================================");
			console.log("callback auth");
			console.log(req.params);
			console.log(req.body);
			console.log(req.query);
			console.log("====================================");
			res.redirect("/");
		}
	);

	app.get("/api/logout", (req, res) => {
		req.logout();
		res.redirect("/");
	});

	app.get("/api/current_user", (req, res) => {
		console.log("============req.user===================");
		console.log(req.user);
		console.log("====================================");
		res.send(req.user);
	});
};
