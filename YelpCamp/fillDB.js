
var mongoose   = require("mongoose");

mongoose.connect("mongodb://localhost/yelpcamp",{useNewUrlParser : true, useUnifiedTopology: true});


var campgroundSchema = new mongoose.Schema({
	name: String,
	image: String,
	description: String
})

var Campground = mongoose.model("Campground",campgroundSchema);

var campgrounds = [
	{
		name: "Salmon Creek", 
		image: "https://media-cdn.tripadvisor.com/media/photo-s/06/49/26/d2/sentinel-mara-camp.jpg",
		description: "Best campground ever 1"
	},
	{
		name: "Granite Hill", 
		image: "https://pix10.agoda.net/hotelImages/6425194/-1/18f40048a640be5daf4c6dd1ff4bf0b6.jpg?s=1024x768",
		description: "Best campground ever 2"

	},
	{
		name: "Moutain Goats", 
		image: "https://www.safaritravelplus.com/wp-content/uploads/2016/08/family-tent-mara-intrepids.jpg",
		description: "Best campground ever 3"

	}
	
]

campgrounds.forEach( c => {
	Campground.create(c,
		function(err,cg) {
			if (err) {
				console.log(err)
			} else {
				console.log("Added campground:")
				console.log(cg)		
			}
		})	
})