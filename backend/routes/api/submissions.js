const express = require('express');
const router = express.Router();
const { requireAuth } = require('../../utils/auth');
const {Submission} = require('../../db/models')



//creates a submission for a contest
router.post('/:contestId', requireAuth, async(req, res, next) => {
    const contestId = parseInt(req.params.contestId)
    const userId = req.user.dataValues.id
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





module.exports = router
