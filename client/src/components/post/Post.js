import React, { useEffect, Fragment } from 'react';
import { useParams, Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import { useDispatch, useSelector } from 'react-redux';
import { getPostById } from '../../actions/postActions';
import PostItem from '../posts/PostItem';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';

const Post = () => {
	const dispatch = useDispatch();
	let { id } = useParams();
	const { post, loading } = useSelector((state) => state.post);
	useEffect(() => {
		dispatch(getPostById(id));
	}, [id, getPostById]);

	return (
		<Fragment>
			<Link to='/posts' className='btn'>
				Back To Posts
			</Link>{' '}
			{post === null || loading ? (
				<Spinner />
			) : (
				<Fragment>
					<PostItem showActions={false} post={post} />
					<CommentForm />
					<div className='comments'>
						{post.comments.length > 0 ? (
							post.comments.map((comment) => (
								<CommentItem
									key={comment._id}
									comment={comment}
									post_id={post._id}
								/>
							))
						) : (
							<h4>No Comments Yet..</h4>
						)}
					</div>
				</Fragment>
			)}
		</Fragment>
	);
};

export default Post;
