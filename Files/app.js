const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const _ = require("lodash");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/Travelopia");

const postSchema = {
 name: String,
 email: String,
 destination: String,
 noOfTravellers: Number,
 budget:Number
};

const Post = mongoose.model("Post", postSchema);


app.get("/", function(req, res){
  res.render("travelDetails");
});

app.get("/Details", function(req, res){
  Post.find(function(err, posts){
    if (posts._id===Post._id){
      res.render("Details", {

        posts: posts

        });
        console.log(posts);

    }else{
      console.log("No data");
    }
  });
     });

app.post("/", function(req, res){
  const post = new Post ({
    name: req.body.postName,
    email: req.body.postEmail,
    destination: req.body.postLocation,
    noOfTravellers: req.body.postTravellers,
    budget:req.body.postBudget

 });

 post.save(function(err){

  if (!err){

    res.redirect("/Details");

  }
});

});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
