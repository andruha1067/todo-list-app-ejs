const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");
const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

const items = ["Buy Food", "Cook Food", "Eat Food"];
const workItems = [];

// GET request for root
app.get("/", function(req, res) {
  const day = date.getDate();
  res.render("list", {listTitle: day, listItems: items});
});

// POST request for root
app.post("/", function(req, res) {
  //console.log(req.body);

  const item = req.body.newItem;

  if (req.body.list === "Work") {
    // redirect to app.get to /work
    workItems.push(item);
    res.redirect("/work");
  } else {
    // redirect to app.get to /
    items.push(item);
    res.redirect("/");
  }
});

// GET request for /work
app.get("/work", function(req, res) {
  res.render("list", {listTitle: "Work List", listItems: workItems});
});

// POST request for /work
app.post("/work", function(req, res) {
  const item = req.body.newItem;
  workItems.push(item);
  res.redirect("/work");
});

// GET request for /about
app.get("/about", function(req, res) {
  res.render("about");
})

// Server setup
app.listen(3000, function() {
  console.log("Server listening on port 3000");
});
