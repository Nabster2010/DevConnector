import React, { useEffect, Fragment, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProfiles } from '../../actions/profileActions';
import Spinner from '../layout/Spinner';
import ProfileItem from './ProfileItem';
const Profiles = () => {
	const dispatch = useDispatch();
	const profileState = useSelector((state) => state.profile);
	const { profiles, loading } = profileState;
	useEffect(() => {
		dispatch(getAllProfiles());
	}, []);
	return (
		<Fragment>
			{loading ? (
				<Spinner />
			) : (
				<Fragment>
					<h1 className='large text-primary'>Developers</h1>
					<p className='lead'>
						<i className='fab fa-connectdevelop'></i> Browse and connect with
						Developers
					</p>
					<div className='profiles'>
						{profiles.length === 0 && !loading ? (
							<h4>There is No developers profiles</h4>
						) : (
							profiles.map((profile) => (
								<ProfileItem key={profile._id} profile={profile} />
							))
						)}
					</div>
				</Fragment>
			)}
		</Fragment>
	);
};

export default Profiles;
