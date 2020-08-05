var Campground = require("../models/campground");
var Comment = require("../models/comment");
// all the middleware goes here
var middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function(req, res, next) {
	if(req.isAuthenticated()){
		Campground.findById(req.params.id, function(err, foundCampground) {
			if(err) {
				req.flash("error", "Campground not found");
				// back takes us back to the page
				res.redirect("back");
			} else {
				// foundCampground.author.id is a mongoose object
					// req.user._id is a string therefore we can't use ===
					// so we use mongoose method .equals()
				if(foundCampground.author.id.equals(req.user._id)) {
					next();
				} else {
					req.flash("error", "You don't have permission to do that");
					// back takes us back to the page
					res.redirect("back");
				}
			}
		});
	} else {
		req.flash("error", "You need to be Logged In to do that");
		// back takes us back to the page
		res.redirect("back");
	}
}

middlewareObj.checkCommentOwnership = function(req, res, next) {
	if(req.isAuthenticated()) {
		Comment.findById(req.params.comment_id, function(err, foundComment) {
			if(err) {
				req.flash("error", "Comment not found");
				// back takes us back to the page
				res.redirect("back");
			} else {
				// foundCampground.author.id is a mongoose object
					// req.user._id is a string therefore we can't use ===
					// so we use mongoose method .equals()
				if(foundComment.author.id.equals(req.user._id)) {
					next();
				} else {
					req.flash("error", "You don't have permission to do that");
					// back takes us back to the page
					res.redirect("back");	
				}
			}
		});
	} else {
		req.flash("error", "You need to be Logged In to do that");
		// back takes us back to the page
		res.redirect("back");
	}
}

middlewareObj.isLoggedIn = function(req, res, next) {
	if(req.isAuthenticated()) {
		return next();
	}
	// flash message should be before the template where it should display
	// the first argument is the key that will tell us in which color the message should appear
		// see app.js(res.locals) and the second argument is the message to display
	req.flash("error", "You need to be Logged In to do that");
	res.redirect("/login");
}

module.exports = middlewareObj;