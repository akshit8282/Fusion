const router=require('express').Router();
const Category=require('../models/category');
const bcrypt=require('bcrypt');


//post a post
router.post('/',async (req,res)=>{
const cat=new Category(req.body);

    try{
const newcat=await cat.save();
res.status(200).json(newcat);
}catch(err){
    res.status(400).json(err);
}
})
router.get('/',async (req,res)=>{
   
    
        try{
   const cat=await Category.find();
    res.status(200).json(cat);
    }catch(err){
        res.status(400).json(err);
    }
    })
    



module.exports=router;