//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");//lower case

const homeStartingContent = "Welcome to our Daily Journal. Inspiring Thoughts, One Day at a Time. Are you looking for a place to express your thoughts, share your experiences, and find inspiration? Look no further! Our Daily Journal is a platform where you can connect with your inner thoughts and document your journey through life.";
const aboutContent = "At Our Daily Journal, we are passionate about promoting creativity, self-expression, and personal growth. Our mission is to create a safe and supportive space where writers of all backgrounds can freely express their thoughts and emotions.Through the power of storytelling, we strive to foster a strong sense of community and encourage empathy and understanding among our readers. Our commitment to authenticity and vulnerability sets us apart, as we believe that sharing our journeys can lead to profound connections and personal transformations.";
const contactContent = "We love hearing from our readers and welcome your feedback, suggestions, or inquiries. Feel free to get in touch with us through the contact form below or connect with us on our social media channels.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

let posts = [];

app.get("/", function(req, res){
  res.render("home", {
    startingContent: homeStartingContent,
    posts: posts
    });
});

app.get("/about", function(req, res){
  res.render("about", {aboutContent: aboutContent});
});

app.get("/contact", function(req, res){
  res.render("contact", {contactContent: contactContent});
});

app.get("/compose", function(req, res){
  res.render("compose");
});

app.post("/compose", function(req, res){
  

  const post = {
    title: req.body.postTitle,
    content: req.body.postBody
  };

  posts.push(post);

  res.redirect("/");

});

app.get("/posts/:postName", function(req, res){
  const requestedTitle = _.lowerCase(req.params.postName);

  posts.forEach(function(post){
    const storedTitle = _.lowerCase(post.title);
    if (storedTitle === requestedTitle) {
      res.render("post", {
        title: post.title,
        content: post.content
      });
      
    }
  });


});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
