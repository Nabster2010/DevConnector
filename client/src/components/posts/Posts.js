import React, { useEffect, Fragment, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../../actions/postActions';
import Spinner from '../layout/Spinner';
import PostItem from './PostItem';
import PostForm from './PostForm';
const Posts = () => {
	const dispatch = useDispatch();

	const postState = useSelector((state) => state.post);
	const { posts, loading } = postState;
	useEffect(() => {
		dispatch(getPosts());
	}, []);

	return (
		<Fragment>
			{' '}
			<h1 className='large text-primary'>Posts</h1>
			<p className='lead'>
				<i className='fas fa-user'></i> Welcome to the community!
			</p>
			<PostForm />
			<div className='posts'>
				{loading ? (
					<Spinner />
				) : (
					<Fragment>
						{posts.map((post) => (
							<PostItem key={post._id} post={post} />
						))}
					</Fragment>
				)}
			</div>
		</Fragment>
	);
};

export default Posts;
