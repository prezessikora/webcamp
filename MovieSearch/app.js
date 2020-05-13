var express = require("express");
var app = express();
app.set("view engine","ejs");

var rp = require("request-promise");

var options = {
    uri: "http://www.omdbapi.com/",
    qs: {
        
        apikey : "thewdb"        
    }
};


app.get("/", function(req,res) {
	res.render("search")
})

app.get("/results",function(req,res) {
	if (!req.query.searchTerm) {
		res.render("empty")
	}
	options.qs.s =  req.query.searchTerm;
	rp(options).
	  then((htmlString) => {
	  	//res.setHeader('Content-Type', 'application/json');
	  	var data = JSON.parse(htmlString)
	  	//console.log(data.Search[0])
	    //res.send(data.Search[0].Title)
	    res.render("results", {data: data})
	  })
	  .catch((error) => {
	    console.log("Error occured: "+error)
	  })

})

app.listen(8080,function() {
	console.log("Server started.")
});

