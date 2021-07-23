const router=require('express').Router();
const User=require('../models/user');
const bcrypt=require('bcrypt');
const Post=require('../models/post');


router.put('/:id',async (req,res)=>{
    if(req.body.userid==req.params.id){
        if(req.body.password){
            const salt =await bcrypt.genSaltSync(10);
            req.body.password = await bcrypt.hashSync(req.body.password, salt);
        }
        try{
            const user=await User.findById(req.params.id);
            if(user){
                user.username=req.body.username||user.username;
                user.email=req.body.email||user.email;
                if(req.body.password){
                    user.password=req.body.password||user.password;

                }
                if(req.body.profilePicture)
                user.profilePicture=req.body.profilePicture||user.profilePicture
            }
            const updated=await user.save();
            return res.status(200).json(updated);
/*const updateduser=await User.findByIdAndUpdate(req.body.userid,{
    $set:req.body,
},{new:true,});
console.log(updateduser);
return res.status(200).json(updateduser);*/
const updateduser=await User.findByIdAndUpdate(req.body.userid,{
    $set:req.body,
},{new:true,});
console.log(updateduser);
return res.status(200).json(updateduser);
        }catch(err){
            return res.status(300).json(err);
        }
    }else{
        res.status(500).json('you are not allowed to change');
    }
});
//delete
router.delete('/:id',async (req,res)=>{
    if(req.body.userid==req.params.id){
        try{
            const user=await User.findById(req.params.id);
            try{
                await Post.deleteMany({username:user.username});
             await User.findByIdAndDelete(req.params.id);
             res.status(200).json('deleted successfully');
            }catch(err){
                res.status(400).json(err);
            }
                }catch(err){
            res.status(400).json('user not found');
                }
    }else{
        res.status(500).json('you are not allowed');
    }
   
})
router.get('/:id',async(req,res)=>{
   
        try{
            const user=await User.findById(req.params.id);
            
            const {password,...others}=user._doc;
    
            res.status(200).json(others);
        }catch(err){
            res.status(400).json(err);  
        }
    
})

module.exports=router;