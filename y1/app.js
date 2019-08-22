var express = require("express");
var app = express();
var bodyParser = require("body-parser");
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

var campgrounds = [
    {name :"salmon creek", image: "http://static3.grsites.com/archive/textures/misc/misc285.jpg"},
    {name :"salmon creek2", image: "http://www.deepdiveintel.com/wp-content/uploads/2013/09/Owl-Eye-art-300x300.jpg"},
    {name :"salmon creek3", image: "https://www.gorilladoctors.org/wp-content/uploads/2014/10/empowering2-300x300.jpg"},
    {name :"salmon creek", image: "http://static3.grsites.com/archive/textures/misc/misc285.jpg"},
    {name :"salmon creek2", image: "http://www.deepdiveintel.com/wp-content/uploads/2013/09/Owl-Eye-art-300x300.jpg"},
    {name :"salmon creek3", image: "https://www.gorilladoctors.org/wp-content/uploads/2014/10/empowering2-300x300.jpg"},
    {name :"salmon creek", image: "http://static3.grsites.com/archive/textures/misc/misc285.jpg"},
    {name :"salmon creek2", image: "http://www.deepdiveintel.com/wp-content/uploads/2013/09/Owl-Eye-art-300x300.jpg"},
    {name :"salmon creek3", image: "https://www.gorilladoctors.org/wp-content/uploads/2014/10/empowering2-300x300.jpg"}
]


app.get("/", function(req, res){
    res.render("landing");
});

app.get("/campgrounds", function(req,res){
    res.render("campgrounds", {campgrounds: campgrounds});
});

app.post("/campgrounds", function(req, res){
    //get data from form
    var name = req.body.name;
    var image = req.body.image;
    //redirect back to campgrounds page
    var newCampground = {name: name, image: image}
    campgrounds.push(newCampground);
    res.redirect("/campgrounds")
});

app.get("/campgrounds/new", function(req,res){
    res.render("new.ejs");
});
app.listen(3000,function(){
    console.log("Started Server");
});