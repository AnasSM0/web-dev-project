import express from "express";

const app = express();
const port = 3000; 

let blogs = [];
  
  module.exports = blogs;

app.use(express.static("public"));

app.get("/",(req,res)=>{

res.render("index.ejs");

});

app.listen(port,()=>{

console.log(`Listening on port ${port}`);

});