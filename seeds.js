var mongoose   = require("mongoose"),
		Campground = require("./models/campground"),
		Comment    = require("./models/comment");

var data = [
	{
		name: "Mount Goat",
		image: "https://images.unsplash.com/photo-1537565266759-34bbc16be345?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In at porta dolor. Vestibulum vel pellentesque justo, placerat ullamcorper ante. Vestibulum consequat hendrerit augue, eget blandit orci imperdiet nec. Nam lacus felis, ornare ut metus in, faucibus porta lectus. Nullam imperdiet metus lorem. Curabitur sed diam id dolor scelerisque consequat. Integer tincidunt, lorem id pretium tempor, tellus justo placerat urna, ac gravida orci lorem id enim. Nunc varius pretium augue vel vestibulum. Aliquam sollicitudin condimentum tellus, vel congue libero consequat sed. Donec ut tortor in eros volutpat tincidunt. Phasellus lobortis augue justo. Integer eros mauris, varius sed facilisis id, molestie viverra elit. Nam in rhoncus nisl. Pellentesque et pharetra ipsum. Praesent euismod, ex nec convallis fringilla, ligula diam vestibulum arcu, ut tempus nibh diam ac augue."
	},
	{
		name: "Downside Hill",
		image: "https://images.unsplash.com/photo-1505735754789-3404132203ed?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In at porta dolor. Vestibulum vel pellentesque justo, placerat ullamcorper ante. Vestibulum consequat hendrerit augue, eget blandit orci imperdiet nec. Nam lacus felis, ornare ut metus in, faucibus porta lectus. Nullam imperdiet metus lorem. Curabitur sed diam id dolor scelerisque consequat. Integer tincidunt, lorem id pretium tempor, tellus justo placerat urna, ac gravida orci lorem id enim. Nunc varius pretium augue vel vestibulum. Aliquam sollicitudin condimentum tellus, vel congue libero consequat sed. Donec ut tortor in eros volutpat tincidunt. Phasellus lobortis augue justo. Integer eros mauris, varius sed facilisis id, molestie viverra elit. Nam in rhoncus nisl. Pellentesque et pharetra ipsum. Praesent euismod, ex nec convallis fringilla, ligula diam vestibulum arcu, ut tempus nibh diam ac augue."
		
	},
	{
		name: "Rider's Paradise",
		image: "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In at porta dolor. Vestibulum vel pellentesque justo, placerat ullamcorper ante. Vestibulum consequat hendrerit augue, eget blandit orci imperdiet nec. Nam lacus felis, ornare ut metus in, faucibus porta lectus. Nullam imperdiet metus lorem. Curabitur sed diam id dolor scelerisque consequat. Integer tincidunt, lorem id pretium tempor, tellus justo placerat urna, ac gravida orci lorem id enim. Nunc varius pretium augue vel vestibulum. Aliquam sollicitudin condimentum tellus, vel congue libero consequat sed. Donec ut tortor in eros volutpat tincidunt. Phasellus lobortis augue justo. Integer eros mauris, varius sed facilisis id, molestie viverra elit. Nam in rhoncus nisl. Pellentesque et pharetra ipsum. Praesent euismod, ex nec convallis fringilla, ligula diam vestibulum arcu, ut tempus nibh diam ac augue."
	},
	{
		name: "Forest Point",
		image: "https://images.unsplash.com/photo-1519395612667-3b754d7b9086?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In at porta dolor. Vestibulum vel pellentesque justo, placerat ullamcorper ante. Vestibulum consequat hendrerit augue, eget blandit orci imperdiet nec. Nam lacus felis, ornare ut metus in, faucibus porta lectus. Nullam imperdiet metus lorem. Curabitur sed diam id dolor scelerisque consequat. Integer tincidunt, lorem id pretium tempor, tellus justo placerat urna, ac gravida orci lorem id enim. Nunc varius pretium augue vel vestibulum. Aliquam sollicitudin condimentum tellus, vel congue libero consequat sed. Donec ut tortor in eros volutpat tincidunt. Phasellus lobortis augue justo. Integer eros mauris, varius sed facilisis id, molestie viverra elit. Nam in rhoncus nisl. Pellentesque et pharetra ipsum. Praesent euismod, ex nec convallis fringilla, ligula diam vestibulum arcu, ut tempus nibh diam ac augue."
	},
	{
		name: "Moon Light Mountain",
		image: "https://images.unsplash.com/photo-1513781419235-2988ecacab83?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In at porta dolor. Vestibulum vel pellentesque justo, placerat ullamcorper ante. Vestibulum consequat hendrerit augue, eget blandit orci imperdiet nec. Nam lacus felis, ornare ut metus in, faucibus porta lectus. Nullam imperdiet metus lorem. Curabitur sed diam id dolor scelerisque consequat. Integer tincidunt, lorem id pretium tempor, tellus justo placerat urna, ac gravida orci lorem id enim. Nunc varius pretium augue vel vestibulum. Aliquam sollicitudin condimentum tellus, vel congue libero consequat sed. Donec ut tortor in eros volutpat tincidunt. Phasellus lobortis augue justo. Integer eros mauris, varius sed facilisis id, molestie viverra elit. Nam in rhoncus nisl. Pellentesque et pharetra ipsum. Praesent euismod, ex nec convallis fringilla, ligula diam vestibulum arcu, ut tempus nibh diam ac augue."
	}
]

// encoding all of this in a function because we want a return value
// for the file for exporting it
function seedDB() {
	// removing all the campgrounds
	// using deleteMany rather than remove
	Campground.deleteMany({}, function(err) {
		if(err) {
			console.log(err);
		}else {
			console.log("Campgrounds Removed!!!");
			// add a few campgrounds
			data.forEach(function(seed) {
				Campground.create(seed, function(err, campground) {
					if(err) {
						console.log(err);
					}else {
						console.log("added a campground");
						// create a comments
						Comment.create({
							text: "This place is great but i feel home sick",
							author: "whatever"
						}, function(err, comment) {
							if(err) {
								console.log(err);
							}else {
								campground.comments.push(comment);
								campground.save();
								console.log("comment added");
							}
						})
					}
				})
			});
		}
	});
}

// seedDB not seedDB() as we will execute it when imported in app.js
module.exports = seedDB;