import React, { useEffect, Fragment } from 'react';
import { getCurrentProfile, deleteProfile } from '../../actions/profileActions';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import DashboardActions from './DashboardActions';
import Experience from './Experience';
import Education from './Education';
const Dashboard = () => {
	const auth = useSelector((state) => state.auth);
	const profile = useSelector((state) => state.profile);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getCurrentProfile());
	}, [dispatch]);
	if (auth.loading) {
		return <Spinner />;
	}
	return (
		<Fragment>
			<h1 className='large text-primary'>Dashboard</h1>
			<p className='lead'>
				<i className='fas fa-user'></i>
				{'  '} Welcome {auth.user && auth.user.name}
			</p>
			{profile.profile !== null ? (
				<Fragment>
					<DashboardActions />
					<Experience />
					<Education />
					<div className='my-2'>
						<button
							className='btn btn-danger'
							onClick={() => dispatch(deleteProfile())}
						>
							<i className='fas fa-user-minus'></i>
							{'  '} Delete My Account
						</button>
					</div>
				</Fragment>
			) : (
				<Fragment>
					<p>You have not yet setup a profile please add some info.</p>
					<Link to='/create-profile' className='btn btn-primary my-1'>
						Create Profile
					</Link>
				</Fragment>
			)}
		</Fragment>
	);
};

export default Dashboard;
