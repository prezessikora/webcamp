var express    = require("express"), 
	app        = express(),
	bodyParser = require("body-parser"),
	mongoose   = require("mongoose");

mongoose.connect("mongodb://localhost/yelpcamp",{useNewUrlParser : true, useUnifiedTopology: true});


var campgroundSchema = new mongoose.Schema({
	name: String,
	image: String,
	description: String
})

var Campground = mongoose.model("Campground",campgroundSchema);

app.use(bodyParser .urlencoded({extended: true}));

app.set("view engine","ejs")

// APP ROUTES

app.get("/", function(req,res) {
	res.render("landing")
})

app.post("/campgrounds", function(req,res) {
	var name = req.body.name
	var image = req.body.image
	var newCamp = {name: name, image: image}
	Campground.create(newCamp, (err,camp) => {

		if (err) {
			console.log(err)
		} else {
			console.log("Added campground:")
			console.log(camp)		
		}
	})
	res.redirect("/campgrounds")

})

app.get("/campgrounds/new", function(req,res) {
	res.render("new.ejs")
})

app.get("/campgrounds/:id", function(req, res) {
	Campground.findById(req.params.id, function(err,campground) {
		if (err) {
			console.log("Error: "+err)
		} else {
			res.render("show",{campground : campground})	
		}
	})


	
})

app.get("/campgrounds",function(req,res) {

	Campground.find({}, function(err,campgrounds) {
		if (err) {
			console.log("Error when finding.")
		} else {
			console.log("All campgrounds: "+campgrounds.length);
			res.render("campgrounds",{campgrounds: campgrounds})

		}
		
	})

})

app.listen(8000, function() {
	console.log("The App has started.")
})