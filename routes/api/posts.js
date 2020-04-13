const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const Post = require('../../models/Post');
const { check, validationResult } = require('express-validator');

//@route    POST api/posts
//@Desc     Create Post
//@access   Private

router.post(
	'/',
	[auth, [check('text', 'Text is required').not().isEmpty()]],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		try {
			const user = await User.findById(req.user.id).select('-password');
			const newpost = new Post({
				name: user.name,
				avatar: user.avatar,
				text: req.body.text,
				user: req.user.id,
			});
			await newpost.save();
			res.json(newpost);
		} catch (err) {
			console.error(err.message);
			return res.status(500).send('Server Error');
		}
	}
);

//@route    Get api/posts
//@Desc     get Posts
//@access   Private
router.get('/', auth, async (req, res) => {
	try {
		const posts = await Post.find().sort({ date: -1 });
		return res.json(posts);
	} catch (err) {
		console.error(err.message);
		return res.status(500).send('Server Error');
	}
});

//@route    Get api/posts/:post_id
//@Desc     get Posts
//@access   Private
router.get('/:post_id', auth, async (req, res) => {
	try {
		const post = await Post.findById(req.params.post_id);
		if (!post) {
			return res.status(404).json({ msg: 'Post not found' });
		}
		return res.json({ post: post });
	} catch (err) {
		console.error(err);
		return res.status(404).json({ msg: 'There is no Post' });
	}
});

//@route    DELETE api/posts/:post_id
//@Desc     delete Post
//@access   Private
router.delete('/:post_id', auth, async (req, res) => {
	try {
		const post = await Post.findById(req.params.post_id);
		if (!post) {
			return res.status(404).json({ msg: 'Post not found' });
		}

		if (post.user.toString() !== req.user.id) {
			return res.status(401).json({ msg: 'User Not Authorized' });
		}

		await post.remove();
		return res.send('Post Deleted Successfully');
	} catch (err) {
		console.error(err);
		return res.status(404).send('Post Not Found');
	}
});

//@route    PUT api/posts/like/:post_id
//@Desc     like a Post
//@access   Private
router.put('/like/:post_id', auth, async (req, res) => {
	try {
		const post = await Post.findById(req.params.post_id);
		if (!post) {
			return res.status(404).json({ msg: 'Post Not Found' });
		}

		if (
			post.likes.filter((like) => like.user.toString() === req.user.id).length >
			0
		) {
			return res.status(400).json({ msg: 'You already liked the Post' });
		}
		post.likes.unshift({ user: req.user.id });
		await post.save();

		return res.json(post.likes);
	} catch (err) {
		console.error(err);
		return res.status(404).send('Server Error');
	}
});

//@route    PUT api/posts/unlike/:post_id
//@Desc     like a Post
//@access   Private
router.put('/unlike/:post_id', auth, async (req, res) => {
	try {
		const post = await Post.findById(req.params.post_id);
		if (!post) {
			return res.status(404).json({ msg: 'Post Not Found' });
		}

		if (
			post.likes.filter((like) => like.user.toString() === req.user.id).length >
			0
		) {
			post.likes = post.likes.filter(
				(item) => item.user.toString() !== req.user.id
			);
			await post.save();
			return res.json(post.likes);
		}

		return res.status(400).json({ msg: 'Post has not yet been liked' });
	} catch (err) {
		console.error(err);
		return res.status(404).send('Server Error');
	}
});
//@route    POST api/posts/comment/:post_id
//@Desc     comment a post
//@access   Private
router.post(
	'/comment/:post_id',
	[auth, [check('text', 'Text is required').not().isEmpty()]],
	async (req, res) => {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return res.status(400).json({ errors: errors.array() });
			}
			const user = await await User.findById(req.user.id);
			const post = await Post.findById(req.params.post_id);
			if (!post) {
				return res.status(404).json({ msg: 'Post Not Found' });
			}
			const newcomment = {
				user: req.user.id,
				text: req.body.text,
				name: user.name,
				avatar: user.avatar,
			};

			post.comments.unshift(newcomment);
			await post.save();

			return res.json(post.comments);
		} catch (err) {
			console.error(err);
			return res.status(404).send('Server Error');
		}
	}
);

//@route    DELETE api/posts/comment/:post_id/:comment_id
//@Desc     delete a comment
//@access   Private

router.delete('/comment/:post_id/:comment_id', auth, async (req, res) => {
	try {
		const post = await Post.findById(req.params.post_id);

		const comment = post.comments.find(
			(comment) => comment.id === req.params.comment_id
		);
		if (!comment) {
			return res.status(404).json({ msg: 'Comment does not exist' });
		}
		if (comment.user.toString() !== req.user.id) {
			return res.status(401).json({ msg: 'User not authorized' });
		}
		const removeIndex = post.comments
			.map((comment) => comment.user)
			.indexOf(comment.user);
		post.comments.splice(removeIndex, 1);
		await post.save();
		return res.json(post.comments);
	} catch (err) {
		console.error(err);
		return res.status(404).send('Server Error');
	}
});

module.exports = router;
