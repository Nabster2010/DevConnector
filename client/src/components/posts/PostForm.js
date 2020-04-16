import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addPost } from '../../actions/postActions';

const PostForm = () => {
	const dispatch = useDispatch();
	const [formData, setFormData] = useState('');

	const onSubmit = (e) => {
		e.preventDefault();
		dispatch(addPost(formData));
		setFormData({ text: '' });
	};
	return (
		<div className='post-form'>
			<div className='bg-primary p'>
				<h3>Say Something...</h3>
			</div>
			<form className='form my-1' onSubmit={onSubmit}>
				<textarea
					name='text'
					cols='30'
					rows='5'
					placeholder='Create a post'
					value={formData.text}
					onChange={(e) => setFormData({ text: e.target.value })}
				></textarea>
				<input type='submit' className='btn btn-dark my-1' value='Submit' />
			</form>
		</div>
	);
};

export default PostForm;
