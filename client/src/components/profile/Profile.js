import React, { useEffect, Fragment, useLayoutEffect } from 'react';
import { getProfileById } from '../../actions/profileActions';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import ProfileExperience from './ProfileExperience';
import ProfileEducation from './ProfileEducation';
import ProfileGithup from './ProfileGithup';
const Profile = () => {
	let url_id = useParams();
	const profileState = useSelector((state) => state.profile);
	const auth = useSelector((state) => state.auth);
	const { profile, loading } = profileState;
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getProfileById(url_id.id));
	}, [getProfileById, url_id]);
	return (
		<Fragment>
			{profile === null || loading ? (
				<Spinner />
			) : (
				<Fragment>
					<Link to='/profiles' className='btn btn-light'>
						Back To Profiles
					</Link>
					{auth.isAuthenticated && auth.user._id === profile.user._id && (
						<Link to='/edit-profile' className='btn btn-dark'>
							Edit Profile
						</Link>
					)}
					<div className='profile-grid my-1'>
						<ProfileTop profile={profile} />
						<ProfileAbout profile={profile} />
						<div className='profile-exp bg-white p-2'>
							<h2 className='text-primary'>Experience</h2>
							{profile.experience.length > 0 ? (
								<Fragment>
									{profile.experience.map((exp) => (
										<ProfileExperience key={exp._id} experience={exp} />
									))}
								</Fragment>
							) : (
								<h4> No Experiences</h4>
							)}
						</div>
						<div className='profile-edu bg-white p-2'>
							<h2 className='text-primary'>Education</h2>

							{profile.education.length > 0 ? (
								<Fragment>
									{profile.education.map((edu) => (
										<ProfileEducation key={edu._id} education={edu} />
									))}
								</Fragment>
							) : (
								<h4> No Educations</h4>
							)}
						</div>
					</div>
					<div className='profile-github'>
						<h2 className='text-primary my-1'>
							<i className='fab fa-github'></i> Github Repos
						</h2>
						{profile.githubusername ? (
							<ProfileGithup user={profile.githubusername} />
						) : (
							<h4> No Githup User </h4>
						)}
					</div>
				</Fragment>
			)}
		</Fragment>
	);
};

export default Profile;
