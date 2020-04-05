const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const Profile = require('../../models/Profile');
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

//@route   GET api/profile/me
//@Desc     get users profile
//@access   private

router.get('/me', auth, async (req, res) => {
	try {
		const profile = await Profile.findOne({
			user: req.user.id,
		}).populate('user', ['name', 'avatar']);
		if (!profile) {
			return res.status(400).json({ msg: 'No profile for this user' });
		}
		res.json(profile);
	} catch (err) {
		console.error(err.message);
		return res.status(500).send('Server Error');
	}
});

//@route   POST api/profile
//@Desc     add or update user profile
//@access   private
router.post(
	'/',
	[
		auth,
		[
			check('status', 'Status is required').not().isEmpty(),
			check('skills', 'skills is required').not().isEmpty(),
		],
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.json({ errors: errors.array() });
		}
		const {
			company,
			website,
			location,
			status,
			skills,
			bio,
			githubusername,
			youtube,
			twitter,
			facebook,
			linkedin,
			instagram,
		} = req.body;
		// build profile fields object
		const profileFields = {};
		profileFields.user = req.user.id;
		if (company) profileFields.company = company;
		if (website) profileFields.website = website;
		if (location) profileFields.location = location;
		if (status) profileFields.status = status;
		if (bio) profileFields.bio = bio;
		if (githubusername) profileFields.githubusername = githubusername;
		if (skills)
			profileFields.skills = skills.split(',').map((skill) => skill.trim());
		profileFields.social = {};
		if (youtube) profileFields.social.youtube = youtube;
		if (twitter) profileFields.social.twitter = twitter;
		if (facebook) profileFields.social.facebook = facebook;
		if (linkedin) profileFields.social.linkedin = linkedin;
		if (instagram) profileFields.social.instagram = instagram;
		console.log(profileFields);
		try {
			let profile = await Profile.findOne({ user: req.user.id });
			if (profile) {
				//update existing profile
				profile = await Profile.findOneAndUpdate(
					{ user: req.user.id },
					profileFields,
					{ new: true }
				);
				return res.json(profile);
			}
			profile = new Profile(profileFields);
			await profile.save();
			return res.json(profile);
		} catch (err) {
			console.error(err.message);
			return res.status(500).send('server error');
		}
		res.send('data is ok');
	}
);

//@route   GET api/profile
//@Desc     get all profiles
//@access   public

router.get('/', async (req, res) => {
	try {
		const profiles = await Profile.find().populate('user', ['name', 'avatar']);
		return res.json(profiles);
	} catch (err) {
		console.error(err.message);
		return res.status(500).send('server error');
	}
});

//@route   GET api/profile/user/:user_id
//@Desc     get user profile by id
//@access   public

router.get('/user/:user_id', async (req, res) => {
	try {
		const profile = await Profile.findOne({
			user: req.params.user_id,
		}).populate('user', ['name', 'avatar']);
		if (!profile) res.status(400).json({ msg: 'Profile not found' });
		return res.json(profile);
	} catch (err) {
		console.error(err.message);
		return res.status(400).json({ msg: 'Profile not found' });
	}
});

module.exports = router;
