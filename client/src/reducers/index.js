import { combineReducers } from 'redux';
import alertReducer from '../reducers/alertReducer';
import authReducer from '../reducers/authReducer';
import profileReducer from '../reducers/profileReducer';
import postReducer from './postReducer';
const rootReducer = combineReducers({
	alert: alertReducer,
	auth: authReducer,
	profile: profileReducer,
	post: postReducer,
});

export default rootReducer;
