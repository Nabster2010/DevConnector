import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { useSelector, useDispatch } from 'react-redux';
import { addLike, removeLike, deletePost } from '../../actions/postActions';

const PostItem = ({ post, showActions }) => {
	const dispatch = useDispatch();
	const authState = useSelector((state) => state.auth);

	return (
		<div className='post bg-white p-1 my-1'>
			<div>
				<Link to={`/profile/${post.user}`}>
					<img className='round-img' src={post.avatar} alt='' />
					<h4>{post.name}</h4>
				</Link>
			</div>
			<div>
				<p className='my-1'>{post.text}</p>
				<p className='post-date'>
					Posted on <Moment format='DD/MM/YYYY'>{post.date}</Moment>
				</p>
				{showActions && (
					<Fragment>
						<button
							type='button'
							className='btn btn-light'
							onClick={() => {
								dispatch(addLike(post._id));
							}}
						>
							<i className='fas fa-thumbs-up'></i>
							{post.likes.length > 0 && <span> {post.likes.length}</span>}
						</button>
						<button type='button' className='btn btn-light'>
							<i
								className='fas fa-thumbs-down'
								onClick={() => {
									dispatch(removeLike(post._id));
								}}
							></i>
						</button>
						<Link to={`/post/${post._id}`} className='btn btn-primary'>
							Discussion{' '}
							{post.comments.length > 0 && (
								<span className='comment-count'> {post.comments.length}</span>
							)}
						</Link>
						{!authState.loading && authState.user._id === post.user && (
							<button
								type='button'
								className='btn btn-danger'
								onClick={() => dispatch(deletePost(post._id))}
							>
								<i className='fas fa-times'></i>
							</button>
						)}
					</Fragment>
				)}
			</div>
		</div>
	);
};
PostItem.defaultProps = {
	showActions: true,
};
PostItem.propTypes = {
	post: PropTypes.object.isRequired,
};

export default PostItem;
