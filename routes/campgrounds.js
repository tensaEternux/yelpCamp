var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
// we don't have to mention /index to require index file because if we require a directory then by default
	// it will automatically import and use contents of index.js as index is a special name
var middleware = require("../middleware");

// CAMPGROUNDS INDEX ROUTE: show all campgrounds
router.get("/", function(req, res) {
	Campground.find({}, function(err, allCampgrounds) {
		if(err){
			console.log(err);
		} else{
			// {name of the argument to send: which argument to send}
				// usually take the name as the name of argument to send
			// we can also pass currentUser: req.user to template like:- 
				// res.render("campgrounds/index", {campgrounds: allCampgrounds, currentUser: req.user});
				// if not passing it with middleware but we have to pass it to every route
			res.render("campgrounds/index", {campgrounds: allCampgrounds});
		}
	});
});

// CAMPGROUNDS NEW ROUTE: show form to create new campground
// Restful conventions for xyz/new for adding anything new and replace xyz with to what we are adding
router.get("/new", middleware.isLoggedIn, function(req, res) {
	res.render("campgrounds/new");
});

// CAMPGROUNDS CREATE ROUTE: add new campgrounds to database
// Restful conventions for post requests to have same name as get requests
router.post("/", middleware.isLoggedIn, function(req, res) {
	// getting the data
	var name = req.body.name,
			price = req.body.price,
	    image = req.body.image,
	    desc = req.body.description,
			author = {
				id: req.user._id,
				username: req.user.username
			};
	var newCampground = {name: name, price: price, image: image, description: desc, author: author};
	Campground.create(newCampground, function(err, newlyCreated) {
		if(err){
			req.flash("error", "Couldn't create Campground");
		} else {
			// redirecting to campgrounds (By default, it will be redirected to get method)
			res.redirect("/campgrounds");
		}
	});
});

// CAMPGROUNDS SHOW ROUTE: show information about one campgrounds
router.get("/:id", function(req, res) {
	// find the campground with the provided id
	// argument of populate is the name of the field like name, image here it is comments
	Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground) {
		if(err){
			req.flash("error", "Couldn't show the Campground");
		} else {
			// render show template of that campground
			res.render("campgrounds/show", {campground: foundCampground});
		}
	});
});

// CAMPGROUNDS EDIT ROUTE
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res) {
	Campground.findById(req.params.id, function(err, foundCampground) {
		res.render("campgrounds/edit", {campground: foundCampground});
	});
});

// CAMPGROUNDS UPDATE ROUTE
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res) {
	Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground) {
		req.flash("info", "Campground edited");
		res.redirect("/campgrounds/" + req.params.id);
	});
});

// CAMPGROUNDS DESTROY ROUTE
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res) {
	Campground.findByIdAndRemove(req.params.id, function(err) {
		req.flash("success", "Successfully deleted Campground");
		res.redirect("/campgrounds");
	});
});

module.exports = router;