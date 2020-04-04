const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

//@route   GET api/profile
//@Desc     Test Route
//@access   public

router.get('/', async (req, res) => res.send('Profile route'));

module.exports = router;
