import {
	GET_PROFILE,
	PROFILE_ERROR,
	UPDATE_PROFILE,
	CLEAR_PROFILE,
	ACCOUNT_DELETED,
	GET_PROFILES,
	GET_REPOS,
} from './Types';
import axios from 'axios';
import { setAlert } from './alertActions';

export const getCurrentProfile = () => async (dispatch) => {
	try {
		const config = {
			headers: {
				'x-auth-token': localStorage.getItem('token'),
			},
		};
		const res = await axios.get('/api/profile/me', config);
		dispatch({
			type: GET_PROFILE,
			payload: res.data,
		});
	} catch (err) {
		console.log(err.response);
		dispatch({
			type: CLEAR_PROFILE,
			payload: { msg: err.response.statusText, status: err.response.status },
		});
		dispatch({
			type: PROFILE_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		});
	}
};

export const getAllProfiles = () => async (dispatch) => {
	try {
		const res = await axios.get('/api/profile');
		dispatch({
			type: GET_PROFILES,
			payload: res.data,
		});
	} catch (err) {
		dispatch({
			type: PROFILE_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		});
	}
};

export const getProfileById = (user_id) => async (dispatch) => {
	try {
		const res = await axios.get(`/api/profile/user/${user_id}`);

		dispatch({
			type: GET_PROFILE,
			payload: res.data,
		});
	} catch (err) {
		console.log(err.response);
		dispatch({
			type: CLEAR_PROFILE,
			payload: { msg: err.response.statusText, status: err.response.status },
		});
		dispatch({
			type: PROFILE_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		});
	}
};

export const getRepos = (user) => async (dispatch) => {
	try {
		const res = await axios.get(`/api/profile/githup/${user}`);

		dispatch({
			type: GET_REPOS,
			payload: res.data,
		});
	} catch (err) {
		dispatch({
			type: PROFILE_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		});
	}
};

export const createProfile = (formData, history, edit = false) => async (
	dispatch
) => {
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
				'x-auth-token': localStorage.getItem('token'),
			},
		};

		const res = await axios.post('/api/profile', formData, config);
		dispatch({
			type: GET_PROFILE,
			payload: res.data,
		});
		dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success'));
		if (!edit) {
			history.push('/dashboard');
		}
	} catch (err) {
		const errors = err.response.data.errors;
		if (errors) {
			errors.forEach((error) => {
				dispatch(setAlert(error.msg, 'danger'));
			});
		}
		dispatch({
			type: PROFILE_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		});
	}
};

export const addExperience = (formData, history) => async (dispatch) => {
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
				'x-auth-token': localStorage.getItem('token'),
			},
		};

		const res = await axios.put('/api/profile/experience', formData, config);
		dispatch({
			type: UPDATE_PROFILE,
			payload: res.data,
		});
		dispatch(setAlert('Experience Added', 'success'));

		history.push('/dashboard');

		console.log(res.data);
	} catch (err) {
		console.log(err.response);
		const errors = err.response.data.errors;
		if (errors) {
			errors.forEach((error) => {
				dispatch(setAlert(error.msg, 'danger'));
			});
		}
		dispatch({
			type: PROFILE_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		});
	}
};

export const addEducation = (formData, history) => async (dispatch) => {
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
				'x-auth-token': localStorage.getItem('token'),
			},
		};

		const res = await axios.put('/api/profile/education', formData, config);
		dispatch({
			type: UPDATE_PROFILE,
			payload: res.data,
		});
		dispatch(setAlert('Education Added', 'success'));

		history.push('/dashboard');

		console.log(res.data);
	} catch (err) {
		console.log(err.response);
		const errors = err.response.data.errors;
		if (errors) {
			errors.forEach((error) => {
				dispatch(setAlert(error.msg, 'danger'));
			});
		}
		dispatch({
			type: PROFILE_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		});
	}
};
export const deleteExperience = (id) => async (dispatch) => {
	try {
		const config = {
			headers: {
				'x-auth-token': localStorage.getItem('token'),
			},
		};
		const res = await axios.delete(`/api/profile/experience/${id}`, config);
		dispatch(setAlert('Experience Deleted', 'success'));
		dispatch({
			type: UPDATE_PROFILE,
			payload: res.data,
		});
	} catch (err) {
		console.log(err.response);
		dispatch({
			type: PROFILE_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		});
	}
};
export const deleteEducation = (id) => async (dispatch) => {
	try {
		const config = {
			headers: {
				'x-auth-token': localStorage.getItem('token'),
			},
		};
		const res = await axios.delete(`/api/profile/education/${id}`, config);
		dispatch(setAlert('Education Deleted', 'success'));
		dispatch({
			type: UPDATE_PROFILE,
			payload: res.data,
		});
	} catch (err) {
		dispatch({
			type: PROFILE_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		});
	}
};

export const deleteProfile = () => async (dispatch) => {
	if (window.confirm('Are you sure ? This can Not be undone')) {
		try {
			const config = {
				headers: {
					'x-auth-token': localStorage.getItem('token'),
				},
			};
			await axios.delete('/api/profile', config);
			dispatch({ type: CLEAR_PROFILE });
			dispatch({
				type: ACCOUNT_DELETED,
			});
			dispatch(setAlert('Your account has been Permenantly deleted'));
		} catch (err) {
			dispatch({
				type: PROFILE_ERROR,
				payload: { msg: err.response.statusText, status: err.response.status },
			});
		}
	}
};
