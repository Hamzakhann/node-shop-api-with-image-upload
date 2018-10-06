const express = require('express');
const router = express.Router()
const mongoose = require('mongoose')
const Product = require('../models/product');





router.get('/' , (req , res , next) =>{
    Product.find().exec()
    .then(docs =>{
        if(docs.length > 0){
            console.log(docs)
            res.status(200).json(docs)    
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


router.post('/' , (req , res , next) =>{
    console.log(req.body)
    const product = new Product({
        _id : mongoose.Types.ObjectId(),
        name : req.body.name,
        price : req.body.price
    })
    product.save().then(result =>{
        console.log(result)
        res.status(200).json({
            message : 'post req',
            createdPost  : product
        })
    }).catch(error =>{
        console.log(error)
        res.status(500).json({error : error})
    })
})

router.get('/:productId' , (req , res , next) =>{
    const id = req.params.productId;
    Product.findById(id)
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
    res.status(200).json({
        message : 'patch works'
    })
})


router.delete('/:productId' , (req , res , next) =>{
    const id = req.params.productId;
    Product.remove({_id : id})
    .exec().then(result =>{
        res.status(200).json(result)
    }).catch(err =>{
        res.status(500).json({error: err})
    })
})



module.exports = router;