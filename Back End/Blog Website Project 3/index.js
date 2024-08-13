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

// Edit Blog
app.get("/edit/:id", (req, res) => {
    const blog = blogList[req.params.id];
    res.render("editpost.ejs", { blog: blog, id: req.params.id });
});

app.post("/edit/:id", (req, res) => {
    const id = req.params.id;
    blogList[id] = {
        email: req.body.email,
        author: req.body.author,
        category: req.body.category,
        content: req.body.content,
    };
    res.redirect(`/blogs?message=Your blog post has been successfully updated!`);
});

// Delete Blog
app.post("/delete/:id", (req, res) => {
    blogList.splice(req.params.id, 1);
    res.redirect(`/blogs?message=Your blog post has been successfully deleted!`);
});

// Full Blog Post Route
app.get("/blogs/:id", (req, res) => {
    const blog = blogList[req.params.id];
    res.render("fullpost.ejs", { blog: blog });
});

app.get("/FAQ",(req,res) => {

res.render("FAQ.ejs");

});

app.get("/about",(req,res)=>{

res.render("about.ejs");

})

app.get("/contact",(req,res)=>{

    res.render("contact.ejs");

})

app.get("/ai-automation",(req,res)=>{

    res.render("partials/blog1.ejs");

});

app.get("/ux-ui-evolution",(req,res)=>{

    res.render("partials/blog2.ejs");

});

app.get("/tech-insights",(req,res)=>{

    res.render("partials/blog3.ejs");

});

app.get("/design-strategies",(req,res)=>{

    res.render("partials/blog4.ejs");

});

app.get("/trends",(req,res)=>{

    res.render("partials/blog5.ejs");

});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
