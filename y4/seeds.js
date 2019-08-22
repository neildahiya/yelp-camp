var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
    {
        name: "Clouds",
        image: "https://pixabay.com/get/52e3d3404a55af14f6da8c7dda793f7f1636dfe2564c704c732a73d29648c259_340.png",
        description: "blah blah blah"
    
    },
    {
        name: "Clouds 2",
        image: "https://pixabay.com/get/52e3d3404a55af14f6da8c7dda793f7f1636dfe2564c704c732a73d29648c259_340.png",
        description: "blah blah blah"
    
    },
    {
        name: "Clouds 3",
        image: "https://pixabay.com/get/52e3d3404a55af14f6da8c7dda793f7f1636dfe2564c704c732a73d29648c259_340.png",
        description: "blah blah blah"
    
    }
];

function seedDB(){
    //remove campgrounds
    Campground.remove({}, function(err){
        if(err){
            console.log(err);
        } else{
            console.log("Done");
            //adding
            data.forEach(function(seed){
                Campground.create(seed, function(err, campground){
                    if(err){
                        console.log(err)
                    } else {
                        console.log("added a campground");
                        //create a comment
                        Comment.create(
                            {
                                text: "This place is great, but i wish.",
                                author: "Neil"
                            }, function(err, comment){
                                if(err){
                                    console.log(err);
                                }else{
                                    campground.comments.push(comment);
                                    campground.save();
                                    console.log("Created a new comment");
                                }
                            });
                    }
                });
            });
        }
            
    });
}

module.exports = seedDB;