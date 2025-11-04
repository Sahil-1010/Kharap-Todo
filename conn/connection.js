const mongoose = require('mongoose');

const conn =async(req,res)=>{
    try{
         await mongoose
    .connect("mongodb+srv://to_do_user:todoadmin123@cluster0.jsarpbj.mongodb.net/")
    .then(() => {
        console.log("connection successful");
    }); 
    }catch(err){
        console.log("no connection");
    }
};
conn();