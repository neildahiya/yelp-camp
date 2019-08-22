var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
    {
        name: "Clouds",
        image: "https://cdn.pixabay.com/photo/2019/05/31/14/22/sea-4242303__340.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam, suscipit ipsum fugit omnis illo quod corrupti fuga veritatis at voluptates sapiente iste. Saepe sint eius unde aperiam tempora eaque culpa!"
    
    },
    {
        name: "Clouds 2",
        image: "https://cdn.pixabay.com/photo/2019/05/31/14/22/sea-4242303__340.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam, suscipit ipsum fugit omnis illo quod corrupti fuga veritatis at voluptates sapiente iste. Saepe sint eius unde aperiam tempora eaque culpa!"
    
    },
    {
        name: "Clouds 3",
        image: "https://cdn.pixabay.com/photo/2019/05/31/14/22/sea-4242303__340.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam, suscipit ipsum fugit omnis illo quod corrupti fuga veritatis at voluptates sapiente iste. Saepe sint eius unde aperiam tempora eaque culpa!"
    
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