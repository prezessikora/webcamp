var express    = require("express"), 
	app        = express(),
	bodyParser = require("body-parser"),
	mongoose   = require("mongoose");

mongoose.connect("mongodb://localhost/blog",{useNewUrlParser : true, useUnifiedTopology: true});


var blogSchema = new mongoose.Schema({
	title: String,
	image: String,
	body: String,
	created: {type: Date, default: Date.now}
})

var Blog = mongoose.model("Blog",blogSchema);

app.use(bodyParser .urlencoded({extended: true}));
app.use(express.static("public"))
app.set("view engine","ejs")

Blog.create({
	title: "My Akita Blog",
	image: "https://images.unsplash.com/photo-1564959888455-38991be63424?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
	body: "This is my first blog entry on Akitas.",
})

// APP ROUTES

app.get("/blogs", function(req,res) {
	Blog.find({}, (error,entries) => {
		if (error) {
			console.log("An error occured: "+error)
		} else {
			res.render("index",{entries: entries})

		}
	}) 
})

app.get("/blogs/new", function(req,res) {
	res.render("new");
})

app.get("/", function(req,res) {
	res.redirect("blogs")
})

// app.post("/campgrounds", function(req,res) {
// 	var name = req.body.name
// 	var image = req.body.image
// 	var newCamp = {name: name, image: image}
// 	Campground.create(newCamp, (err,camp) => {

// 		if (err) {
// 			console.log(err)
// 		} else {
// 			console.log("Added campground:")
// 			console.log(camp)		
// 		}
// 	})
// 	res.redirect("/campgrounds")

// })

// app.get("/campgrounds/new", function(req,res) {
// 	res.render("new.ejs")
// })

// app.get("/campgrounds/:id", function(req, res) {
// 	Campground.findById(req.params.id, function(err,campground) {
// 		if (err) {
// 			console.log("Error: "+err)
// 		} else {
// 			res.render("show",{campground : campground})	
// 		}
// 	})


	
// })

// app.get("/campgrounds",function(req,res) {

// 	Campground.find({}, function(err,campgrounds) {
// 		if (err) {
// 			console.log("Error when finding.")
// 		} else {
// 			console.log("All campgrounds: "+campgrounds.length);
// 			res.render("campgrounds",{campgrounds: campgrounds})

// 		}
		
// 	})

// })

app.listen(8000, function() {
	console.log("The App has started.")
})