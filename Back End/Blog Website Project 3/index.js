import bodyParser from "body-parser";
import express from "express";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

let blogList = [];

app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.get("/blogs", (req, res) => {
    res.render("blogs.ejs", { blogs: blogList, message: null });
});

app.get("/create", (req, res) => {
    res.render("newpost.ejs");
});

app.post("/create", (req, res) => {
    const newBlog = {
        email: req.body.email,
        author: req.body.author,
        category: req.body.category,
        content: req.body.content,
    };
    blogList.push(newBlog);
    res.redirect(`/blogs?message=Your blog post has been successfully submitted!`);
});

app.get("/blogs", (req, res) => {
    const message = req.query.message;
    res.render("blogs.ejs", { blogs: blogList, message: message });
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
