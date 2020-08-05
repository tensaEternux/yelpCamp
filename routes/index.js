var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");

// ROOT ROUTES
router.get("/", function(req, res) {
	res.render("landing");
});

// show register form
router.get("/register", function(req, res) {
	res.render("register");
});

// handle sign up logic
router.post("/register", function(req, res) {
	var newUser = new User({username: req.body.username});
	User.register(newUser, req.body.password, function(err, user) {
		if(err) {
			// req.flash("error", err.message);
			// for rendering we have to pass it as an object in template or the flash message will display
				// after loading the page once again or going to some another page(next to next page)
			return res.render("register", {error: err.message});
		}
		passport.authenticate("local")(req, res, function() {
			req.flash("success", "Successfully Signed Up! Nice to meet you " + user.username);
			res.redirect("/campgrounds");
		});
	});
});

// show login form
router.get("/login", function(req, res) {
	res.render("login");
});

// handling login logic
router.post("/login", passport.authenticate("local",
  {
	    successRedirect: "/campgrounds",
	    failureRedirect: "/login",
			failureFlash: true,
      successFlash: "Welcome to YelpCamp!"
  }), function(req, res){
});

// logout route
router.get("/logout", function(req, res) {
	req.logout();
	// flash message should be before the template where it should display
	req.flash("success", "Logged you out!");
	res.redirect("/campgrounds");
})

module.exports = router;