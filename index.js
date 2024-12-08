const express = require("express");
const path = require("node:path");

const app = express();

/* Serving static assets */
const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));
app.use(express.urlencoded({ extended: true }));

/* register template and view engine */
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

/* variables for the view template */
const messages = [
  {
    text: "Hi there!",
    user: "Amando",
    added: new Date(),
  },
  {
    text: "Hello World!",
    user: "Charles",
    added: new Date(),
  },
];
const title = "Mini message board";
/* app routes */
app.get("/", (req, res) => {
  res.render("index", { title, messages });
});
app.get("/new", (req, res) => {
  res.render("form");
});
app.post("/new", (req, res) => {
  const text = req.body["message"];
  const user = req.body["author"];
  const added = new Date();
  messages.push({ text, user, added });
  res.redirect("/");
});

app.listen(3000);
