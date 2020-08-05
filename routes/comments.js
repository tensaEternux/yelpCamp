var express = require("express");
// for merging the params of campground and this file, mergeParams is set to true
	// otherwise req.params.id will be displayed as null
var router = express.Router({mergeParams: true});
var Campground = require("../models/campground");
var Comment = require("../models/comment");
// we don't have to mention /index to require index file because if we require a directory then by default
	// it will automatically import and use contents of index.js as index is a special namevar Comment = require("../models/comment");
var middleware = require("../middleware");

// COMMENTS NEW ROUTE
router.get("/new", middleware.isLoggedIn, function(req, res) {
	Campground.findById(req.params.id, function(err, foundCampground) {
		if(err) {
			console.log(err);
		} else {
			res.render("comments/new", {campground: foundCampground});
		}
	});
})

// COMMENTS CREATE ROUTE
// adding isLoggedIn to this route also because we can fire postman with this post route and
// see the data without logging in but if we add it we will see the login form with postman
router.post("/", middleware.isLoggedIn, function(req, res) {
	Campground.findById(req.params.id, function(err, foundCampground) {
		if(err) {
			req.flash("error", "Couldn't found Campground");
			res.redirect("/campgrounds");
		} else {
			Comment.create(req.body.comment, function(err, newComment) {
				if(err) {
					req.flash("error", "Couldn't create Comment");
				} else {
					// add username and id to comment
					// req.body will store info about the author
					newComment.author.id = req.user._id;
					newComment.author.username = req.user.username;
					// save comment
					newComment.save();
					foundCampground.comments.push(newComment);
					foundCampground.save()
					req.flash("success", "Successfully added Comment");
					res.redirect("/campgrounds/" + req.params.id);
				}
			})
		}
	});
});

// COMMENTS EDIT ROUTE
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res) {
	Comment.findById(req.params.comment_id, function(err, foundComment) {
		res.render("comments/edit", {campground_id: req.params.id, comment: foundComment});
	});
});

// COMMENTS UPDATE ROUTE
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res) {
	Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment) {
		req.flash("info", "Comment edited");
		res.redirect("/campgrounds/" + req.params.id);
	});
});

// COMMENTS DESTROY ROUTE
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res) {
	Comment.findByIdAndRemove(req.params.comment_id, function(err) {
		req.flash("success", "Successfully deleted Comment");
		res.redirect("/campgrounds/" + req.params.id);
	});
});

module.exports = router;