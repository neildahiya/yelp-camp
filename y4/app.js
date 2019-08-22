var express    = require("express"),
    app        = express(),
    bodyParser = require("body-parser"),
    mongoose   = require("mongoose"),
    Campground = require("./models/campground"),
    Comment = require("./models/comment"),
    seedDB = require("./seeds");

mongoose.connect("mongodb+srv://neildahiya:abcdefg@cluster0-cjlhb.mongodb.net/yelp_camp4?retryWrites=true&w=majority", {useNewUrlParser: true});
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
seedDB();

app.get("/", function(req, res){
    res.render("landing");
});
//Index Route
app.get("/campgrounds", function(req,res){
    // Get all campground from DB
    Campground.find({}, function(err, allcampgrounds){
        if(err){
            console.log("Error");
        }else{
            res.render("campgrounds/index", {campgrounds: allcampgrounds});
        }
    });
    
});
//Create
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
//New Route
app.get("/campgrounds/new", function(req, res){
    res.render("campgrounds/new");
});
//Show route
app.get("/campgrounds/:id", function(req, res){
    //find the ground with given id
    
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        }else{
            console.log(foundCampground)
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
})


app.get("/campgrounds/:id/comments/new", function(req, res){
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
        }else{
            res.render("comments/new", {campground: campground});
        }
    });
});
app.post("/campgrounds/:id/comments", function(req, res){
    //lookup campground using id
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    console.log(err);
                } else {
                    console.log(comment);
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect('/campgrounds/'+ campground._id);
                }
            })
            
        }
    });
    //create new comment
    //connect new comment to campground
    //redirect to campground showpage
});



app.listen(3000,function(){
    console.log("Started Server");
});