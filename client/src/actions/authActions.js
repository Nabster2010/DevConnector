import {
	REGISTERATION_SUCCESS,
	REGISTERATION_FAIL,
	USER_LOADED,
	AUTH_ERROR,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOGOUT,
	CLEAR_PROFILE,
} from './Types';
import axios from 'axios';
import { setAlert } from './alertActions';

//LOAD USER
export const loadUser = () => async (dispatch) => {
	if (localStorage.getItem('token')) {
		const config = {
			headers: {
				'x-auth-token': localStorage.getItem('token'),
			},
		};
		try {
			const res = await axios.get('/api/auth', config);
			console.log(res.data);
			dispatch({
				type: USER_LOADED,
				payload: res.data,
			});
		} catch (err) {
			console.log(err.response);
			//login fail
			dispatch({
				type: AUTH_ERROR,
			});
		}
	} else {
		//login fail
		dispatch({
			type: AUTH_ERROR,
		});
	}
};

export const registerUser = (name, email, password) => async (dispatch) => {
	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	};
	const body = JSON.stringify({
		name,
		email,
		password,
	});

	try {
		const res = await axios.post('/api/users', body, config);
		dispatch({
			type: REGISTERATION_SUCCESS,
			payload: res.data,
		});
		dispatch(loadUser());
	} catch (err) {
		const errors = err.response.data.errors;
		console.log(errors);

		errors.forEach((error) => {
			dispatch(setAlert(error.msg, 'danger'));

			dispatch({ type: REGISTERATION_FAIL });
		});
	}
};

export const login = (email, password) => async (dispatch) => {
	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	};
	const body = JSON.stringify({
		email,
		password,
	});

	try {
		const res = await axios.post('/api/auth', body, config);
		dispatch({
			type: LOGIN_SUCCESS,
			payload: res.data,
		});
		dispatch(loadUser());
	} catch (err) {
		const errors = err.response.data.errors;
		console.log(errors);

		errors.forEach((error) => {
			dispatch(setAlert(error.msg, 'danger'));

			dispatch({ type: LOGIN_FAIL });
		});
	}
};

// logout
export const logout = () => (dispatch) => {
	dispatch({
		type: CLEAR_PROFILE,
	});
	dispatch({
		type: LOGOUT,
	});
};
