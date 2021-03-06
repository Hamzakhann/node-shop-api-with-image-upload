const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');


const storage = multer.diskStorage({
    destination : function(req , file , cb){
        cb(null , './uploads/');
    },
    filename : function(req , file , cb){
        cb(null , new Date().toISOString() + file.originalname); 
    }
})
const fileFilter = (req , file , cb)=>{
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        cb(null , true)
    }else{
        cb(null , false)
    }
}
const upload = multer({
    storage : storage , 
    limits:{
    fileSize:1024 * 1024 * 5
    },
    fileFilter : fileFilter 

})
const Product = require('../models/product');





router.get('/' , (req , res , next) =>{
    Product.find()
    .select('name price _id productImage')
    .exec()
    .then(docs =>{
        if(docs.length > 0){
            console.log(docs)
            const response = {
                count : docs.length,
                products : docs
            }
            res.status(200).json(response)    
        }else{
            res.status(500).json({
                message: 'No entry avail'
            })
        }
    }).catch(err =>{
        res.status(500).json({error : err})
    })
    res.status(200).json({
        message : 'it also works'
    })
})


router.post('/' ,upload.single('productImage') , (req , res , next) =>{
    console.log(req.file)
    const product = new Product({
        _id : mongoose.Types.ObjectId(),
        name : req.body.name,
        price : req.body.price,
        productImage : req.file.path
    })
    product.save().then(result =>{
        console.log(result)
        res.status(200).json({
            message : 'Created product successfully',
            createdProduct  : {
                name : result.name,
                price : result.price,
                _id : result._id
            }
        })
    }).catch(error =>{
        console.log(error)
        res.status(500).json({error : error})
    })
})

router.get('/:productId' , (req , res , next) =>{
    const id = req.params.productId;
    Product.findById(id)
    .select('name , price , _id')
    .exec()
    .then(doc =>{
        comnsole.log(doc)
        if(doc){
            res.status(200).json(doc)
        }else{
            res.status(404).json({message: 'No valid entry found'})
        }
    })
    .catch(error =>{
        console.log(error)
        res.status(500).json({error : error})
    })
})

router.patch('/:productId' , (req , res , next) =>{
    const id = req.params.productId;
    Product.update({_id : id} , {$set:{name : req.body.newName , price : req.body.newPrice}})
    .exec()
    .then(result =>{
        res.status(200).json(result)
    })
    .catch(error =>{
        res.status(500).json({error: error})
    })
})


router.delete('/:productId' , (req , res , next) =>{
    const id = req.params.productId;
    Product.remove({_id : id})
    .exec().then(result =>{
        res.status(200).json({
            message : 'Product deleted'
        })
    }).catch(err =>{
        res.status(500).json({error: err})
    })
})



module.exports = router;