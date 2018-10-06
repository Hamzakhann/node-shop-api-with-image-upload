const express = require('express');

const router = express.Router()


router.get('/' , (req , res , next) =>{
    res.status(200).json({
        message : 'it for order works'
    })
})


router.post('/' , (req , res , next) =>{
    res.status(201).json({
        message : 'order post'
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