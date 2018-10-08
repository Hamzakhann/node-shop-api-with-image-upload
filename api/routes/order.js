const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Order = require('../models/order');



router.get('/' , (req , res , next) =>{
    Order.find()
    .select('product quantity _id')
    .exec()
    .then(docs =>{
        res.status.json(docs)
    })
    .catch(err =>{
        res.status(500).json({error : err})
    })
})


router.post('/' , (req , res , next) =>{
    const order = new Order({
        _id : mongoose.Types.ObjectId(),
        quantity : req.body.quantity,
        product  : req.body.productId
    });
    order
    .save()
    .then(result =>{
        res.status(201).json(result)
    })
    .catch(err =>{
        res.status(500).json({error : err})
    })
})


router.get('/:orderId' , (req , res , next) =>{
    const id = req.params.orderId;
    if(id === 'special'){
        res.status(200).json({
            message : 'you order pass id',
            id : id
        });
    }else {
        res.status.json({
            message : 'It is order product',
            id : id
        })
    }
})

router.delete('/:orderId' , (req , res , next) =>{
    res.status(200).json({
        message : 'delete order works'
    })
})


module.exports = router;