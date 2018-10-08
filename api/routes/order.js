const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Order = require('../models/order');
const Product = require('../models/product')



router.get('/' , (req , res , next) =>{
    Order.find()
    .select('product quantity _id')
    .populate('product' , 'name')
    .exec()
    .then(docs =>{
        res.status.json(docs)
    })
    .catch(err =>{
        res.status(500).json({error : err})
    })
})


router.post('/' , (req , res , next) =>{
    Product.findById(req.body.productId)
    .then(product =>{
        if(!product){
            return res.status(404).json({message : 'product not found'})
        }
        const order = new Order({
            _id : mongoose.Types.ObjectId(),
            quantity : req.body.quantity,
            product  : req.body.productId
        });
        return order.save();
    })
    .then(result =>{
        res.status(201).json(result)
    })
    .catch(err =>{
        res.status(500).json({message : 'Product not found'})
    })
    
})


router.get('/:orderId' , (req , res , next) =>{
    Order.findById(req.params.orderId)
    .exec()
    .then(order =>{
        if(!order){
            return res.status(500).json({message : 'order not found'})
        }
        res.status(200).json(order)
    })
    .catch(err =>{
        res.status(500).json({error : err})
    })
})

router.delete('/:orderId' , (req , res , next) =>{
    Order.remove({_id : req.params.orderId})
    .exec()
    .then(result =>{
        res.status(200).json({message : 'order deleted'})
    })
    .catch(err =>{
        res.status(500).json({error: err})
    })
})


module.exports = router;