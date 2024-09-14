const express = require('express');
const router = express.Router();
const { requireAuth } = require('../../utils/auth')
const {Contest, Prediction, Contest_prediction, Submission } = require('../../db/models')
const { formatDate } = require('../../utils/formatters');


//gets all contests that a user has a submission to
router.get('/user/submissions', requireAuth, async (req, res, next) => {
    const userId = req.user.dataValues.id
    const submissions = await Submission.findAll({
        where: {
            user_id: userId
        }
    })

    let contestidArr = submissions.map(sub => {
        return sub.dataValues.contest_id
    })

    let arr = []

    for (let i = 0; i <contestidArr.length; i++) {
        const contest = await Contest.findOne({
            where: {
                id: contestidArr[i]
            }
        })
        contest.dataValues.closing_date = formatDate(contest.dataValues.closing_date)
        arr.push(contest.dataValues)
    }

    res.json(arr)
})

//deletes a contest a user is hosting as long as closing date hasn't been reached.
router.delete('/:contestId', requireAuth, async (req, res, next) => {
    const contestId = parseInt(req.params.contestId)
    const userId = req.user.dataValues.id

    //find the contest

    const contest = await Contest.findOne({
        where: {
            id: contestId
        }
    })

    //check if contest exists
    if (!contest){
        const err = new Error('Contest does not exist')
        err.status = 404
        next(err)
        return
    }

    //check if user is hosting the contest
    if (userId !== contest.host_id) {
        const err = new Error('Forbidden')
        err.status = 403
        next(err)
        return
    }

    //checks if closing date has been reached.
    let currentDate = new Date()

    if (currentDate > contest.closing_date) {
        const err = new Error("Cannot delete a contest past it's closing date")
        err.status = 401
        next(err)
        return
    }

    //deletes the contest
    await Contest.destroy({
        where: {
            id: contestId
        }
    })

    res.json({
        message: "Your contest was successfully delete."
    })
})


//updates a contest as long as no submission has been submitted.
router.put('/:contestId', requireAuth, async (req, res, next) => {
    const contestId = parseInt(req.params.contestId)

    //gets the contest
    const contest = await Contest.findOne({
        where: {
            id: contestId
        }
    })

    //checks if user is hosting the contest
    const isHost = contest.dataValues.host_id === req.user.dataValues.id
    if (!isHost) {
        let err = new Error("User must be the contest host to edit a contest")
        err.status = 401
        next(err)
        return
    }

    //checks if a submission has been sent
    const submission = await Submission.findOne({
        where: {
            contest_id: contestId
        }
    })

    if (submission) {
        let err = new Error("Cannot edit a contest after recieving a submission.")
        err.status = 401
    }

    //deletes contest predictions
    await Contest_prediction.destroy({
        where: {
            contest_id: contestId
        }
    })

    const { description, closing_date, preview_image } = req.body

    //edits contest
    await contest.update({
        description,
        closing_date,
        preview_image
    })

    let predictions_arr = []
    for (let i = 0; i < req.body.predictions.length; i ++) {
        const newContestPrediction = await Contest_prediction.create({
            contest_id: contest.dataValues.id,
            prediction_id: req.body.predictions[i]
        })
        delete newContestPrediction.dataValues.createdAt
        delete newContestPrediction.dataValues.updatedAt
        predictions_arr.push(newContestPrediction.dataValues)
    }

    contest.dataValues.createdAt = formatDate(contest.dataValues.createdAt)
    contest.dataValues.updatedAt = formatDate(contest.dataValues.updatedAt)
    contest.dataValues.closing_date = formatDate(contest.dataValues.closing_date)

    contest.dataValues.predictions = predictions_arr

    res.json(contest)

})

//creates a contest
router.post('/', requireAuth, async (req, res, next) => {
    const newContest = await Contest.create({
        host_id : req.user.dataValues.id,
        description: req.body.description,
        closing_date: req.body.closing_date,
        preview_image: req.body.preview_image,
        price: req.body.price
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




//gets contests that the user is hosting.
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

        //gets all submissions attached to the contest
        let subArr = []
        let predictionArr = []
        const submissions = await Submission.findAll({
            where: {
                contest_id: contests[i].dataValues.id
            },
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            }
        })
        const predictions = await Contest_prediction.findAll({
            where: {
                contest_id: contests[i].dataValues.id
            },
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            }
        })
        submissions.forEach(submission => {
            subArr.push(submission.dataValues)
        })

        for (let j = 0; j < predictions.length; j++) {
            const prediction = await Prediction.findOne({
                where: {
                    id: predictions[j].dataValues.prediction_id
                },
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                }
            })
            predictionArr.push(prediction)
        }

        contests[i].dataValues.submissions = subArr
        contests[i].dataValues.predictions = predictionArr
    }



    res.json({Contests: contests})
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

        const predictions = await Contest_prediction.findAll({
            where: {
                contest_id: contests[i].dataValues.id
            }
        })
        let predictionsArr = []

        for (let j = 0; j < predictions.length; j++) {
            if (!predictions.length) {
                break
            }
            let predictionId = predictions[j].dataValues.prediction_id

            const prediction = await Prediction.findOne({
                where: {
                    id: predictionId
                },
                attributes:['id','type','content']
            })
            predictionsArr.push(prediction.dataValues)
        }
        contests[i].dataValues.predictions = predictionsArr
    }

    res.json({Contests: contests})
})

module.exports = router
