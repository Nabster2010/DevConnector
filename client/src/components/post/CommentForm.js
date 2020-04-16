import React, { useState } from 'react';
import { addComment } from '../../actions/postActions';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
const CommentForm = () => {
	let { id } = useParams();
	const dispatch = useDispatch();
	const [text, settext] = useState('');
	return (
		<div className='post-form'>
			<div className='bg-primary p'>
				<h3>Leave A Comment</h3>
			</div>
			<form
				className='form my-1'
				onSubmit={(e) => {
					e.preventDefault();
					dispatch(addComment({ text }, id));
					settext('');
				}}
			>
				<textarea
					name='text'
					cols='30'
					rows='5'
					placeholder='Comment on this post'
					value={text}
					onChange={(e) => {
						settext(e.target.value);
					}}
				></textarea>
				<input type='submit' className='btn btn-dark my-1' value='Submit' />
			</form>
		</div>
	);
};

export default CommentForm;
