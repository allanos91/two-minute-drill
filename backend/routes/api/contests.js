const express = require('express');
const router = express.Router();
const { requireAuth } = require('../../utils/auth')
const {Contest, Prediction, Contest_prediction } = require('../../db/models')
const { formatDate } = require('../../utils/formatters');
const contest = require('../../db/models/contest');


//creates a contest
router.post('/', requireAuth, async (req, res, next) => {
    const newContest = await Contest.create({
        host_id : req.user.dataValues.id,
        description: req.body.description,
        closing_date: req.body.closing_date,
        preview_image: req.body.preview_image
    })

    //formats the date
    newContest.dataValues.createdAt = formatDate(newContest.dataValues.createdAt)
    newContest.dataValues.updatedAt = formatDate(newContest.dataValues.updatedAt)
    newContest.dataValues.closing_date = formatDate(newContest.dataValues.closing_date)


    //creates new contest predictions for each prediction sent in the body
    let predictions_arr = []
    for (let i = 0; i < req.body.predictions.length; i ++) {
        const newContestPrediction = await Contest_prediction.create({
            contest_id: newContest.dataValues.id,
            prediction_id: req.body.predictions[i]
        })
        delete newContestPrediction.dataValues.createdAt
        delete newContestPrediction.dataValues.updatedAt
        predictions_arr.push(newContestPrediction.dataValues)
    }

    newContest.dataValues.predictions = predictions_arr


    res.statusCode = 201
    res.json(newContest)
})




//gets contests that belongs to the current user
router.get('/current', async (req, res, next) => {

    const userId = req.user.dataValues.id
    const contests = await Contest.findAll({
        where: {
            host_id: userId
        }
    })

    //formats the date
    for (let i = 0; i < contests.length; i ++) {
        contests[i].dataValues.createdAt = formatDate(contests[i].dataValues.createdAt)
        contests[i].dataValues.updatedAt = formatDate(contests[i].dataValues.updatedAt)
        contests[i].dataValues.closing_date = formatDate(contests[i].dataValues.closing_date)
    }

    res.json(contests)
})

//gets details of a contest
router.get('/:contestId', async (req, res, next) => {
    const contestId = req.params.contestId

    //finds specific contest
    const contest = await Contest.findOne({
        where: {
            id: contestId
        }
    })

    //finds all predictions attached to it
    const predictions = await Contest_prediction.findAll({
        where: {
            contest_id: contest.dataValues.id
        }
    })

    let arr = []

    for (let i = 0; i < predictions.length; i++) {
        let predictionId = predictions[i].dataValues.prediction_id

        const prediction = await Prediction.findOne({
            where: {
                id: predictionId
            },
            attributes:['id', 'type', 'content']
        })
        arr.push(prediction.dataValues)
    }

    contest.dataValues.createdAt = formatDate(contest.dataValues.createdAt)
    contest.dataValues.updatedAt = formatDate(contest.dataValues.updatedAt)
    contest.dataValues.closing_date = formatDate(contest.dataValues.closing_date)

    contest.dataValues.predictions = arr



    res.json({contest})
})


//gets all the contests
router.get('/', async (req, res, next) => {
    //gets all the contests
    const contests = await Contest.findAll()


    //formats the date
    for (let i = 0; i < contests.length; i ++) {
        contests[i].dataValues.createdAt = formatDate(contests[i].dataValues.createdAt)
        contests[i].dataValues.updatedAt = formatDate(contests[i].dataValues.updatedAt)
        contests[i].dataValues.closing_date = formatDate(contests[i].dataValues.closing_date)
    }

    res.json(contests)
})

module.exports = router
