const mongoose = require("mongoose");
const connect = mongoose.connect("mongodb://localhost:27017/UserData");

// check database connected or not

connect.then(()=>{
    console.log("Daatbase connected Successfully");
})
.catch(()=>{
    console.log("Database Cannot Be Connected");
})

// create a schema

const LoginSchema = new mongoose.Schema({
        name:{
            type:String,
            required:true,
            unique:true
           
        },
        password:{
            type:String,
            required:true
        }

});


// Collection  Part

const collection = new mongoose.model("users",LoginSchema);

module.exports = collection;