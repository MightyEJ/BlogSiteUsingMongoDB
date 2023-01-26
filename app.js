//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const _ = require("lodash");
const { reject, result } = require("lodash");

const homeStartingContent =
  "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent =
  "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent =
  "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

// const globalPost = [];

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.set("strictQuery", false);
mongoose.connect(
  "mongodb+srv://admin-ejoseph:Dont4get@cluster0.si5hyay.mongodb.net/blogDB",
  {
    usenewURLParser: true,
  }
  // (err, myDb) => {
  //   if (err) throw err;
  //   db = myDb;
  // }
);

const postsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  post: { type: String, required: true },
});

const Post = mongoose.model("Post", postsSchema);

// HOME / MAIN PAGE
app.get("/", (req, res) => {
  Post.find({}, (err, post) => {
    res.render("home", {
      homeStartingContent: homeStartingContent,
      postItem: post,
    });
  });
});

// ABOUT
app.get("/About", function (req, res) {
  res.render("about", { aboutContent: aboutContent });
});

// CONTACT
app.get("/Contact", function (req, res) {
  res.render("contact", { contactContent: contactContent });
});

// COMPOSE
app.get("/compose", function (req, res) {
  res.render("compose", { contactContent: contactContent });
});

app.get("/post/:postName", function (req, res) {
  // let isExist = false;
  // let title = "";
  // let content = "";

  // const postName = _.lowerCase(req.params.postName);
  const postName = req.params.postName;

  Post.findOne({ _id: postName }, (err, blogPost) => {
    if (!err) {
      res.render("post", {
        titlePost: blogPost.title,
        contentPost: blogPost.post,
      });
    } else throw err;
  });
  // globalPost.forEach((element) => {
  //   if (_.lowerCase(element.title) === postName) {
  //     (title = element.title), (content = element.post);
  //     isExist = true;
  //     return;
  //   }
  // });
  // if (isExist == true) {
  //   res.render("post", { titlePost: title, contentPost: content });
  // }
});

// POSTS
app.post("/compose", (req, res) => {
  const post = {
    title: req.body.txtTitle,
    post: req.body.txtPost,
  };
  // globalPost.push(post);

  const blogPost = new Post({
    title: post.title,
    post: post.post,
  });

  blogPost.save((err) => {
    if (err) {
      console.log(err);
    }
    res.redirect("/");
  });
});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
