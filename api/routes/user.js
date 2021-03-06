const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');


const User = require('../models/user');


router.post('/signup' , (req , res , next)=>{
    User.find({email : req.body.email})
    .exec()
    .then(user =>{
        if(user){
            return res.status(409).json({message : 'user exist'})
        }else{

            bcrypt.hash(req.body.password , 10 , (err , hash)=>{
                if(err){
                    return res.this.status(500).json({
                        error : err
                    });
                }else{
        
                    const user = new User({
                        _id : new mongoose.Types.ObjectId(),
                        email : req.body.email,
                        password : hash
                    });
                    user
                    .save()
                    .then(result =>{
                        res.status.json({
                            message : 'user created'
                        })
                    })
                    .catch(err =>{
                        res.status(500).json({
                            error: err
                        })
                    })
                }
            })
        }
    })
    .catch()
    
});

router.delete("/:userId" , (req, res , next)=>{
    User.remove({_id : req.params.userId})
    .exec()
    .then(res =>{
        res.status(200).json({message : 'user deleted'})
    })
    .catch(err =>{
        res.status(500).json({error:err})
    })
})
module.exports = router;