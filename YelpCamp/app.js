var express = require("express")
var app = express()
var bodyParser = require("body-parser")

var campgrounds = [
	{name: "Salmon Creek", image: "https://media-cdn.tripadvisor.com/media/photo-s/06/49/26/d2/sentinel-mara-camp.jpg"},
	{name: "Granite Hill", image: "https://pix10.agoda.net/hotelImages/6425194/-1/18f40048a640be5daf4c6dd1ff4bf0b6.jpg?s=1024x768"},
	{name: "Moutain Goats", image: "https://www.safaritravelplus.com/wp-content/uploads/2016/08/family-tent-mara-intrepids.jpg"},
	{name: "Salmon Creek", image: "https://media-cdn.tripadvisor.com/media/photo-s/06/49/26/d2/sentinel-mara-camp.jpg"},
	{name: "Granite Hill", image: "https://pix10.agoda.net/hotelImages/6425194/-1/18f40048a640be5daf4c6dd1ff4bf0b6.jpg?s=1024x768"},
	{name: "Moutain Goats", image: "https://www.safaritravelplus.com/wp-content/uploads/2016/08/family-tent-mara-intrepids.jpg"}
]

app.use(bodyParser .urlencoded({extended: true}));

app.set("view engine","ejs")

app.get("/", function(req,res) {
	res.render("landing")
})

app.post("/campgrounds", function(req,res) {
	var name = req.body.name
	var image = req.body.image
	var newCamp = {name: name, image: image}
	campgrounds.push(newCamp)
	res.redirect("/campgrounds")

})

app.get("/campgrounds/new", function(req,res) {
	res.render("new.ejs")
})

app.get("/campgrounds",function(req,res) {


	res.render("campgrounds",{campgrounds: campgrounds})

})

app.listen(8000, function() {
	console.log("The App has started.")
})