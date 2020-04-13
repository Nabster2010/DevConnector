import { combineReducers } from 'redux';
import alertReducer from '../reducers/alertReducer';
import authReducer from '../reducers/authReducer';
import profileReducer from '../reducers/profileReducer';
const rootReducer = combineReducers({
	alert: alertReducer,
	auth: authReducer,
	profile: profileReducer,
});

export default rootReducer;
