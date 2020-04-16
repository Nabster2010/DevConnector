const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const Post = require('../../models/Post');
const Profile = require('../../models/Profile');
const auth = require('../../middleware/auth');
const config = require('config');
const axios = require('axios');
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
			return res.status(400).json({ errors: errors.array() });
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
		res.status(400).json({ msg: 'Profile not found' });
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
		return res.status(400).json({ msg: 'Profile not found' });
	}
});

//@route   DELETE api/profile
//@Desc     delete profile , user
//@access   private

router.delete('/', auth, async (req, res) => {
	try {
		await Post.deleteMany({ user: req.user.id });
		await Profile.findOneAndDelete({ user: req.user.id });
		await User.findOneAndDelete({ _id: req.user.id });
		return res.json({ msg: 'User Deleted' });
	} catch (err) {
		console.error(err.message);
		return res.status(500).send('server error');
	}
});

//@route    PUT api/profile/experience
//@Desc     update profile's experience
//@access   private
router.put(
	'/experience',
	[
		auth,
		[
			check('title', 'title is required').not().isEmpty(),
			check('company', 'company is required').not().isEmpty(),
			check('from', 'from is required').not().isEmpty(),
		],
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		const {
			title,
			company,
			location,
			from,
			to,
			current,
			description,
		} = req.body;

		// build profile fields object
		const newExp = { title, company, location, from, to, current, description };

		try {
			const profile = await Profile.findOne({ user: req.user.id });
			if (profile) {
				profile.experience.unshift(newExp);
				await profile.save();
				return res.json(profile);
			}

			return res.status(400).json({ msg: 'no profile' });
		} catch (err) {
			console.error(err.message);
			return res.status(500).send('server error');
		}
	}
);

//@route    DELETE api/profile/experience/:experience_id
//@Desc     delete experience
//@access   private

router.delete('/experience/:experience_id', auth, async (req, res) => {
	try {
		const profile = await Profile.findOne({ user: req.user.id });
		const filtered = profile.experience.filter(
			(experience) => experience._id != req.params.experience_id
		);
		profile.experience = filtered;
		await profile.save();
		res.json(profile);
	} catch (err) {
		console.error(err.message);
		return res.status(500).send('server error');
	}
});

//@route    PUT api/profile/education
//@Desc     update profile's education
//@access   private
router.put(
	'/education',
	[
		auth,
		[
			check('school', 'school is required').not().isEmpty(),
			check('degree', 'degree is required').not().isEmpty(),
			check('fieldofstudy', 'fieldofstudy is required').not().isEmpty(),
			check('from', 'from is required').not().isEmpty(),
		],
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		const {
			school,
			degree,
			fieldofstudy,
			from,
			to,
			current,
			description,
		} = req.body;

		// build profile fields object
		const newEd = {
			school,
			degree,
			fieldofstudy,
			from,
			to,
			current,
			description,
		};

		try {
			const profile = await Profile.findOne({ user: req.user.id });
			if (profile) {
				profile.education.unshift(newEd);
				await profile.save();
				return res.json(profile);
			}

			return res.status(400).json({ msg: 'no profile' });
		} catch (err) {
			console.error(err.message);
			return res.status(500).send('server error');
		}
	}
);

//@route    DELETE api/profile/education/:education_id
//@Desc     delete education
//@access   private

router.delete('/education/:education_id', auth, async (req, res) => {
	try {
		const profile = await Profile.findOne({ user: req.user.id });
		const filtered = profile.education.filter(
			(education) => education._id != req.params.education_id
		);
		profile.education = filtered;
		await profile.save();
		res.json(profile);
	} catch (err) {
		console.error(err.message);
		return res.status(500).send('server error');
	}
});

//@route    GET api/profile/githup/:githup_user
//@Desc     get users repos
//@access   public

router.get('/githup/:githup_user', async (req, res) => {
	try {
		const uri = encodeURI(
			`https://api.github.com/users/${req.params.githup_user}/repos?per_page=5&sort=created:asc`
		);
		const headers = {
			'user-agent': 'node.js',
			Authorization: `token ${config.get('githubToken')}`,
		};

		const gitHubResponse = await axios.get(uri, { headers });
		return res.json(gitHubResponse.data);
	} catch (err) {
		console.error(err.message);
		return res.status(500).send('No githup profile found');
	}
});

module.exports = router;
