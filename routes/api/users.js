const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const User = require('../../models/User');

/****************************
  @route   POST api/users
  @desc    Register User
  @access  Public
 ****************************/
router.post('/', [
  // using express-validator to validate request
  check('name', 'Name is required')
    .not()
    .isEmpty(),
  check('email', 'Please include a valid email')
    .isEmail(),
  check('password', 'Please enter a password with 6 or more characters')
    .isLength({min: 6})
], async (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const { name, email, password } = req.body;
  try {
    let user = await User.findOne({ email});

    if(user) {
      return res.status(400).json({errors: [{ msg: 'User already exists'}]});
    }

    // get user's gravatar using email
    const avatar = gravatar.url(email, {
      s: '200',
      r: 'pg',
      d: 'mm'
    });

    user = new User({
      name,
      email,
      avatar,
      password
    });

    // encrypt password using bcrypt
    const salt = await bcrypt.genSalt(10);
    // creates hash to put into password
    user.password = await bcrypt.hash(password, salt);

    // save hash into password
    await user.save();

    const payload = {
      user: {
        id: user.id
      }
    };

    // Create JWT & pass back to client
    jwt.sign(payload,
      config.get('JWT_SECRET'),
      { expiresIn: 360000 },
      (err, token) => {
      if (err) throw err;
      res.json({ token });
      }
    );

  } catch(err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;