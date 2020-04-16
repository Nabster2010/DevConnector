import {
	GET_POSTS,
	POST_ERROR,
	GET_POST,
	ADD_POST,
	UPDATE_LIKES,
	DELETE_POST,
	ADD_COMMENT,
	DELETE_COMMENT,
} from './Types';
import axios from 'axios';
import { setAlert } from './alertActions';

export const getPosts = () => async (dispatch) => {
	try {
		const config = {
			headers: {
				'x-auth-token': localStorage.getItem('token'),
			},
		};

		const res = await axios.get('/api/posts', config);
		dispatch({
			type: GET_POSTS,
			payload: res.data,
		});
	} catch (err) {
		dispatch({
			type: POST_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		});
	}
};

export const getPostById = (post_id) => async (dispatch) => {
	try {
		const config = {
			headers: {
				'x-auth-token': localStorage.getItem('token'),
			},
		};

		const res = await axios.get(`/api/posts/${post_id}`, config);
		dispatch({
			type: GET_POST,
			payload: res.data,
		});
	} catch (err) {
		dispatch({
			type: POST_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		});
	}
};

export const addLike = (id) => async (dispatch) => {
	try {
		axios.defaults.headers.common['x-auth-token'] = localStorage.getItem(
			'token'
		);

		const res = await axios.put(`/api/posts/like/${id}`);
		dispatch({
			type: UPDATE_LIKES,
			payload: { id, likes: res.data },
		});
	} catch (err) {
		dispatch({
			type: POST_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		});
	}
};

export const removeLike = (id) => async (dispatch) => {
	try {
		axios.defaults.headers.common['x-auth-token'] = localStorage.getItem(
			'token'
		);

		const res = await axios.put(`/api/posts/unlike/${id}`);
		dispatch({
			type: UPDATE_LIKES,
			payload: {
				id,
				likes: res.data,
			},
		});
	} catch (err) {
		dispatch({
			type: POST_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		});
	}
};

export const deletePost = (id) => async (dispatch) => {
	if (window.confirm('Are You Sure You want to Delete this Post?')) {
		try {
			axios.defaults.headers.common['x-auth-token'] = localStorage.getItem(
				'token'
			);

			await axios.delete(`/api/posts/${id}`);
			dispatch(setAlert('Post Deleted', 'success'));
			dispatch({
				type: DELETE_POST,
				payload: {
					id,
				},
			});
		} catch (err) {
			dispatch({
				type: POST_ERROR,
				payload: { msg: err.response.statusText, status: err.response.status },
			});
		}
	}
};

export const addPost = (formData) => async (dispatch) => {
	try {
		const config = {
			headers: {
				'x-auth-token': localStorage.getItem('token'),
				'Content-Type': 'application/json',
			},
		};

		const res = await axios.post('/api/posts', formData, config);
		dispatch(setAlert('Post Created', 'success'));
		dispatch({
			type: ADD_POST,
			payload: res.data,
		});
	} catch (err) {
		const errors = err.response.data.errors;
		if (errors.length > 0) {
			errors.map((error) => {
				dispatch(setAlert(error.msg, 'danger'));
			});
		}
		dispatch({
			type: POST_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		});
	}
};

export const addComment = (formData, post_id) => async (dispatch) => {
	try {
		const config = {
			headers: {
				'x-auth-token': localStorage.getItem('token'),
				'Content-Type': 'application/json',
			},
		};

		const res = await axios.post(
			`/api/posts/comment/${post_id}`,
			formData,
			config
		);
		console.log('(success)');

		dispatch(setAlert('Comment Created', 'success'));
		dispatch({
			type: ADD_COMMENT,
			payload: res.data,
		});
	} catch (err) {
		const errors = err.response.data.errors;
		if (errors.length > 0) {
			errors.map((error) => {
				dispatch(setAlert(error.msg, 'danger'));
			});
		}
		dispatch({
			type: POST_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		});
	}
};

export const deleteComment = (post_id, comment_id) => async (dispatch) => {
	if (window.confirm('Are You Sure You want to Delete this Comment?')) {
		try {
			axios.defaults.headers.common['x-auth-token'] = localStorage.getItem(
				'token'
			);

			await axios.delete(`/api/posts/comment/${post_id}/${comment_id}`);
			dispatch(setAlert('Comment Deleted', 'success'));
			dispatch({
				type: DELETE_COMMENT,
				payload: {
					post_id,
					comment_id,
				},
			});
		} catch (err) {
			dispatch({
				type: POST_ERROR,
				payload: { msg: err.response.statusText, status: err.response.status },
			});
		}
	}
};
