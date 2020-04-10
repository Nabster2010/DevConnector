import { SET_ALERT, REMOVE_ALERT } from '../actions/Types';

const alertReducer = (state = [], action) => {
	switch (action.type) {
		case SET_ALERT:
			return [...state, action.payload];

		case REMOVE_ALERT:
			return state.filter((item) => item.id !== action.payload.id);
		default:
			return state;
	}
};

export default alertReducer;
