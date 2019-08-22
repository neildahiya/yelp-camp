var express    = require("express");
var app        = express();
var bodyParser = require("body-parser");
var mongoose   = require("mongoose");
mongoose.connect("mongodb+srv://neildahiya:abcdefg@cluster0-cjlhb.mongodb.net/yelp_camp?retryWrites=true&w=majority", {useNewUrlParser: true});
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));



//schema setup
var campgroundSchema = new mongoose.Schema({
   name: String,
   image: String,
   description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create(
//     {
//         name :"salmon creek3",
//         image: "http://static3.grsites.com/archive/textures/misc/misc285.jpg",
//         description: "This is a campground 2"
//     }, function(err, campground){
//         if(err){
//             console.log("Error");
//         }else{
//             console.log("Newly Created Campground:");
//             console.log(campground);
//         }
//     });

app.get("/", function(req, res){
    res.render("landing");
});
app.get("/campgrounds", function(req,res){
    // Get all campground from DB
    Campground.find({}, function(err, allcampgrounds){
        if(err){
            console.log("Error");
        }else{
            res.render("index", {campgrounds: allcampgrounds});
        }
    });
    
});
app.post("/campgrounds", function(req, res){
    //get data from form
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    //redirect back to campgrounds page
    var newCampground = {name: name, image: image, description: desc}
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log("Error");
        }else{
            res.redirect("/campgrounds")
        }
    });
    //campgrounds.push(newCampground);
    

});
app.get("/campgrounds/new", function(req,res){
    res.render("new.ejs");
});

app.get("/campgrounds/:id", function(req, res){
    //find the ground with given id
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            console.log(err)
        }else{
            res.render("show", {campground: foundCampground});
        }
    });
    
    //show template with that ground
    
});

app.listen(3000,function(){
    console.log("Started Server");
});