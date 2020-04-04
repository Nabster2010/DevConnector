const express = require('express');
const jwt = require('jsonwebtoken');
const config = require('config');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const User = require('../../models/User');

//@route   POST api/users
//@Desc     register user
//@access   public

router.post(
	'/',
	[
		check('email', 'Please enter a valid Email ').isEmail(),
		check(
			'password',
			'Enter a password with 6 or more  Characters long'
		).isLength({ min: 6 }),
		check('name', 'Name is required').not().isEmpty(),
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		const { name, email, password } = req.body;

		try {
			let user = await User.findOne({ email });

			if (user) {
				return res
					.status(400)
					.json({ errors: [{ msg: 'User already exists' }] });
			}

			const avatar = gravatar.url(email, {
				s: '200',
				r: 'pg',
				d: 'mm',
			});

			user = new User({
				name,
				email,
				password,
				avatar,
			});
			const salt = await bcrypt.genSalt(10);
			user.password = await bcrypt.hash(password, salt);
			await user.save();
			const payload = {
				user: {
					id: user.id,
				},
			};
			jwt.sign(
				payload,
				config.get('jwtSecret'),
				{ expiresIn: 360000 },
				(err, Token) => {
					if (err) throw err;
					res.json({ Token });
				}
			);
		} catch (err) {
			console.error(err.message);
			res.status(500).send('Server error');
		}
	}
);

module.exports = router;
