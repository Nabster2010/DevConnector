import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { useSelector, useDispatch } from 'react-redux';
import { deleteComment } from '../../actions/postActions';

const CommentItem = ({ comment, post_id }) => {
	const dispatch = useDispatch();
	const auth = useSelector((state) => state.auth);

	return (
		<div className='post bg-white p-1 my-1'>
			<div>
				<Link to={`/profile/${comment.user}`}>
					<img className='round-img' src={comment.avatar} alt='' />
					<h4>{comment.name}</h4>
				</Link>
			</div>
			<div>
				<p className='my-1'>{comment.text}</p>
				<p className='post-date'>
					Posted on<Moment formay='DD/MM/YYYY'>{comment.date}</Moment>
				</p>

				{auth.isAuthenticated && auth.user._id === comment.user && (
					<button
						type='button'
						className='btn btn-danger'
						onClick={(e) => {
							dispatch(deleteComment(post_id, comment._id));
						}}
					>
						<i className='fas fa-times'></i>
					</button>
				)}
			</div>
		</div>
	);
};

CommentItem.propTypes = {
	comment: PropTypes.object.isRequired,
	post_id: PropTypes.number.isRequired,
};

export default CommentItem;
