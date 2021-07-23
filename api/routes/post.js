const router=require('express').Router();
const Post=require('../models/post');
const bcrypt=require('bcrypt');


//post a post
router.post('/',async (req,res)=>{
const post=new Post(req.body);
    try{
const newpost=await post.save();
res.status(200).json(newpost);
}catch(err){
    res.status(400).json(err);
}
})


router.put('/:id',async (req,res)=>{
   
    try{
        const post=await Post.findById(req.params.id);
        if(post.username===req.body.username){
            try{
const updated=await Post.findByIdAndUpdate(req.params.id,{
    $set:req.body,
},{new:true})
res.status(200).json(updated);
            }catch(err){
                res.status(400).json(err);
            }
        }else{
            res.status(400).json('you cannot update');
        }
    }catch(err){
        res.status(400).json(err);
    }
});
//delete
router.delete('/:id',async (req,res)=>{
    try{
        const post=await Post.findById(req.params.id);
        if(post.username===req.body.username){
            try{
post.delete();
res.status(200).json("deleted");
            }catch(err){
                res.status(400).json(err);
            }
        }else{
            res.status(400).json('you cannot delete');
        }
    }catch(err){
        res.status(400).json(err);
    }
   
})
router.get('/:id',async(req,res)=>{
   
        try{
            const post=await Post.findById(req.params.id);
            
           
    
            res.status(200).json(post);
        }catch(err){
            res.status(400).json(err);  
        }
    
})
router.get('/',async (req,res)=>{
    const user=req.query.user;
    const catName=req.query.cat;
    try{
        let post;
if(user){
    post=await Post.find({username:user});

}else if(catName){
    post=await Post.find({category:{
        $in:[catName]
    }});
}else{
    post=await Post.find();
}
res.status(200).json(post);
    }catch(err){
        res.status(400).json(err);  
    }
})

module.exports=router;