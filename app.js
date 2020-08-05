var express               = require("express"),
		mongoose              = require("mongoose"),
		passport              = require("passport"),
		bodyParser            = require("body-parser"),
		flash                 = require("connect-flash"),
		LocalStrategy         = require("passport-local"),
		methodOverride        = require("method-override"),
		expressSession 	      = require("express-session"),
		passportLocalMongoose = require("passport-local-mongoose");

// requiring routes
var indexRoutes      = require("./routes/index"),
		commentRoutes    = require("./routes/comments"),
		campgroundRoutes = require("./routes/campgrounds");

var seedDB     = require("./seeds"),
		User       = require("./models/user"),
		Comment    = require("./models/comment"),
		Campground = require("./models/campground");

var app = express();

mongoose.connect("mongodb://localhost/yelp_camp_v12", { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
// __dirname is just to be safe so that we can add /public to current directory(if something changes too)
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
// executing the function which we imported from seeds.js
// seedDB();

// PASSPORT CONFIGURATION
app.use(expressSession({
	secret: "I am Ironman",
	resave: false,
	saveUninitialized: false
}));
// the below 2 lines are necessary whenever we use passport
app.use(passport.initialize());
app.use(passport.session());
// we are creating a new LocalStrategy using the User.authenticate() function that is coming from user.js
// by passport.plugin(), here it is using passportLocalMongoose
passport.use(new LocalStrategy(User.authenticate()));
// encoding and decoding function User.(de)serializeUser tells it to use the function
// which we have already defined in user.js by passport.plugin(), here it is using passportLocalMongoose
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// middleware to pass currentUser data to templates and then move to next function
app.use(function(req, res, next) {
	// req.user will either be undefined if no one has signed in or if the
	// user is signed in then it will contain username and id(not password)
	res.locals.currentUser = req.user;
	// the error or success or info of res.locals contains the message that we have to display as flash messages
	// the error or success or info of req.flash are just keys that tells us that we have to use which colored
		// alert of bootstrap to flash messages
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	res.locals.info = req.flash("info");
	next();
});

// use the route files
// shorten the routes by providing first argument which is common in all the routes of that particular file
// / in indexRoutes is not necessary but looks good as we can have the same pattern in all 3 of them
app.use("/", indexRoutes);
// :id won't be passed to commentRoutes therefore we have to give an argument to router in commentRoutes for
	// merging the params of this file and commentRoutes
app.use("/campgrounds/:id/comments", commentRoutes);
app.use("/campgrounds", campgroundRoutes);

app.listen(process.env.PORT || 3000, process.env.IP, function() {
	console.log("YelpCamp Server has started!!!")
});