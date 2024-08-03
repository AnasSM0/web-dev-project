import express from "express"
const app = express();
const port = 3000;

app.get("/", (req,res)=>{

res.send("<h1>HALLO</h1>");
})

app.get("/contact", (req,res)=>{

res.send("<a>WWW.anas.com</a>");

})

app.get("/about", (req,res)=>{

    res.send("<h2>I am Anas</h2>");
    
    })
    
    


app.listen(port,()=>{
console.log(`Server is running on port ${port}.`);

})
