const router = require('express').Router();
const User = require('../models/user');
const List=require('../models/list');
const e = require('express');


//create a task
router.post('/addTask',async(req,res)=>{
    try{
        const {title, body, id}=req.body;
        const existingUser=await User.findById(id);
        if(existingUser){
            const newTask=new List({title, body, user:existingUser});
            await newTask.save().then(()=> 
            res.status(200).json({newTask}));
            existingUser.list.push(newTask);
            existingUser.save();
        }
    }catch(err){
        res.status(500).json({message:err.message});
}});

//update a task

router.put('/updateTask/:id',async(req,res)=>{
    try{
        const {title, body}=req.body;
            const updatedTask=await List.findByIdAndUpdate(req.params.id,{title, body},{new:true});
            updatedTask.save();
            res.status(200).json({updatedTask});
    }catch(err){
        res.status(500).json({message:err.message});
}});

//delete a task
router.delete('/deleteTask/:id',async(req,res)=>{
    try{
        const { id }=req.body;
        const existingUser=await User.findByIdAndUpdate(
            id,
            {$pull: {list: req.params.id}});
        if(existingUser){
            const deletedTask=await List.findByIdAndDelete(req.params.id);
            res.status(200).json({deletedTask});
        }
    }catch(err){
        res.status(500).json({message:err.message});
}});

//get all tasks of a user

router.get('/getTasks/:id',async(req,res)=>{
    const list=await List.find({user:req.params.id}).sort({createdAt:-1});
    if(list.length>0){
        res.status(200).json({list});
    }else{
        res.status(404).json({message:"No tasks found try creating one"});
    }
});

// get user details by ID
router.get('/getUser/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate('list');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json({ user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});




module.exports = router;