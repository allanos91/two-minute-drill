const express = require('express');
const router = express.Router();
const { requireAuth } = require('../../utils/auth')
const {Contest, Prediction} = require('../../db/models')





//creates new prediction
router.post('/', requireAuth, async(req, res, next) => {
    const prediction = await Prediction.findOne({
        where: {
            content: req.body.content
        }
    })

    if (!prediction) {
        const newPrediction = await Prediction.create({
            type: req.body.type,
            content:req.body.content
        })
        console.log("FLAG FLAG FLAG")
        res.json(newPrediction)
        return
    } else {
        res.json({message: "Prediction already exists"})
        return
    }

})


//gets all the predictions in the database
router.get('/', requireAuth, async(req, res, next) => {
    const predictions = await Prediction.findAll()

    res.json({Predictions: predictions})
})

module.exports = router
