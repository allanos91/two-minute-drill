const express = require('express')
const bcrypt = require('bcryptjs');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const validateSignup = [
    check('email')
      .exists({ checkFalsy: true })
      .isEmail()
      .withMessage('Please provide a valid email.'),
    check('username')
      .exists({ checkFalsy: true })
      .isLength({ min: 4 })
      .withMessage('Please provide a username with at least 4 characters.'),
    check('username')
      .not()
      .isEmail()
      .withMessage('Username cannot be an email.'),
    check('password')
      .exists({ checkFalsy: true })
      .isLength({ min: 6 })
      .withMessage('Password must be 6 characters or more.'),
    handleValidationErrors
  ];


const router = express.Router();

// Sign up
router.post(
    '',
    validateSignup,
    async (req, res) => {
      let { email, password, username, firstName, lastName, balance } = req.body;

      if (!balance) {
        balance = 0
      }
      const hashedPassword = bcrypt.hashSync(password);
      const user = await User.create({ email, username, hashedPassword, firstName, lastName, balance });

      const safeUser = {
        id: user.id,
        email: user.email,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        balance: user.balance
      };

      await setTokenCookie(res, safeUser);

      return res.json({
        user: safeUser
      });
    }
  );


//gets all the users
router.get('/', async (req, res) => {
  const users = await User.findAll({
    attributes: {
      exclude: ['firstName', 'lastName', 'balance']
    }
  })
  let userArr = []

  users.forEach(user => {
    userArr.push(user.dataValues)
  })

  res.json({Users: userArr})
})

module.exports = router;
