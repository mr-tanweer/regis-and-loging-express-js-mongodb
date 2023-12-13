const express = require("express");
const collection = require("./Modal/user")
const bcrypt = require("bcrypt");
const { error } = require("console");
const app = express();
// conver data into json format
app.use (express.json());
app.use (express.urlencoded({extended:false}));

// use EJS as the view engine

app.set('view engine','ejs');

//static file 
app.use(express.static("public"));

app.get("/", (req,res)=>{
    res.render("home")
})

app.get("/signup", (req,res)=>{
    res.render("signup")
})

app.get("/login", (req,res)=>{
    res.render("login")
})


// registor User
app.post("/signup",(req,res)=>{
    const {username, password}= req.body;
   bcrypt.hash(password, 10)
   .then(hash => {
    collection.create({name:username,password:hash})
    .then(res.render("login"))
    .catch(err => res.json(err))

   }).catch(err=> console.log(err.message))
})

//login
app.post("/login",(req,res)=>{
    const {username, password}= req.body;
    collection.findOne({name:username})
    .then(user=>{
        if(user){
            bcrypt.compare(password,user.password,(err, response)=>{
                if(response){
                    res.re("success")
                }else{
                    res.json("the pasword incorrect")
                }
            })
        }
       
})
})
   


const port = 3000;
app.listen(port,()=>{
    console.log(`server running on port: ${port}`);
})