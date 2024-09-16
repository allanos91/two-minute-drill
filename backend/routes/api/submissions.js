const express = require('express');
const router = express.Router();
const { requireAuth } = require('../../utils/auth');
const {Submission, Contest, User} = require('../../db/models')



router.delete('/:submissionId', requireAuth, async(req, res, next) => {
    const submissionId = parseInt(req.params.submissionId)
    const userId = req.user.dataValues.id

    const submission = await Submission.findOne({
        where: {
            id: submissionId
        }
    })

    //checks if submission exists
    if (!submission) {
        let err = new Error("Submission could not be found")
        throw err
    }

    //checks if user is the owner
    if (submission.dataValues.user_id !== userId) {
        let err = new Error("You do not own this submission")
        throw err
    }

    await Submission.destroy({
        where: {
            id: submissionId
        }
    })

    res.json({
        message: "Your submission was successfully deleted."
    })
})

router.put('/:submissionId', requireAuth, async(req, res, next) => {
    const submissionId = parseInt(req.params.submissionId)
    //finds the submission
    const submission = await Submission.findOne({
        where: {
            id: submissionId
        }
    })

    await submission.update({
        content: req.body.content
    })

    res.json(submission.dataValues)
})

//creates a submission for a contest
router.post('/:contestId', requireAuth, async(req, res, next) => {
    const contestId = parseInt(req.params.contestId)
    const userId = req.user.dataValues.id


    //finds the contest
    const contest = await Contest.findOne({
        where: {
            id: contestId
        }
    })

    //checks if user has already made a submission
    const userSubmission = await Submission.findOne({
        where: {
            user_id: userId,
            contest_id: contestId
        }
    })

    if (userSubmission) {
        throw new Error("Can only make one submission per contest. You can edit your submission in 'My Contests' tab")

    }

    //compares price of entry to account

    let price = contest.dataValues.price
    let balance = req.user.dataValues.balance
    if (price > balance) {
        throw new Error("insufficient funds")
    } else {
        const user = await User.findOne({
            where: {
                id: req.user.dataValues.id
            }
        })
        await user.update({
            balance: balance - price
        })
    }
    const submission = await Submission.create({
        user_id: userId,
        contest_id: contestId,
        content: req.body.content
    })

    res.json(submission)
})



//gets all contest submissions from a contest id
router.get('/:contestId', async (req, res, next) => {
    const contestId = parseInt(req.params.contestId)
    const submissions = await Submission.findAll({
        where: {
            contest_id: contestId
        }
    })

    res.json({Submissions: [submissions]})
})



//gets all submissions that belong to the current user
router.get('/', requireAuth, async (req, res, next) => {
    const userId = req.user.dataValues.id
    const submissions = await Submission.findAll({
        where: {
            user_id: userId
        }
    })
    res.json(submissions)
})




module.exports = router
