import React, { Fragment } from 'react';
import './App.css';
import Navbar from './components/layout/Navbar';
import Alert from './components/layout/Alert';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Dashboard from './components/dashboard/Dashboard';
import CreateProfile from './components/profile-forms/CreateProfile';
import PrivateRoute from './components/routing/PrivateRoute';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../src/store';
import { useEffect } from 'react';
import { loadUser } from './actions/authActions';
import EditProfile from './components/profile-forms/EditProfile';
import AddExperience from './components/profile-forms/AddExperience';
import AddEducation from './components/profile-forms/AddEducation';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/Profile';
const App = () => {
	useEffect(() => {
		store.dispatch(loadUser());
	}, []);
	return (
		<Provider store={store}>
			<Router>
				<Fragment>
					<Navbar />
					<Route exact path='/' component={Landing} />
					<section className='container'>
						<Alert />
						<Switch>
							<Route exact path='/register' component={Register} />
							<Route exact path='/login' component={Login} />
							<Route exact path='/profiles' component={Profiles} />
							<Route exact path='/profile/:id' component={Profile} />
							<PrivateRoute exact path='/dashboard' component={Dashboard} />
							<PrivateRoute
								exact
								path='/create-profile'
								component={CreateProfile}
							/>
							<PrivateRoute
								exact
								path='/edit-profile'
								component={EditProfile}
							/>
							<PrivateRoute
								exact
								path='/add-experience'
								component={AddExperience}
							/>
							<PrivateRoute
								exact
								path='/add-education'
								component={AddEducation}
							/>
						</Switch>
					</section>
				</Fragment>
			</Router>
		</Provider>
	);
};
export default App;
