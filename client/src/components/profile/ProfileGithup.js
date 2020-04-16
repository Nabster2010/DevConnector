import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { getRepos } from '../../actions/profileActions';
const ProfileGithup = ({ user }) => {
	const profileState = useSelector((state) => state.profile);
	const { repos } = profileState;
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getRepos(user));
	}, [user, getRepos]);

	return (
		<Fragment>
			{repos.length > 0 ? (
				<Fragment>
					{repos.map((repo) => (
						<div className='repo bg-white p-1 my-1' key={repo.id}>
							<div>
								<h4>
									<a
										href={repo.html_url}
										target='_blank'
										rel='noopener noreferrer'
									>
										{repo.name}
									</a>
								</h4>
								<p>{repo.description}</p>
							</div>
							<div>
								<ul>
									<li className='badge badge-primary'>
										Stars: {repo.stargazers_count}
									</li>
									<li className='badge badge-dark'>
										Watchers: {repo.watchers_count}
									</li>
									<li className='badge badge-light'>
										Forks: {repo.forks_count}
									</li>
								</ul>
							</div>
						</div>
					))}
				</Fragment>
			) : (
				<h4>No Githup Repos</h4>
			)}
		</Fragment>
	);
};

ProfileGithup.propTypes = {
	githup_user: PropTypes.string,
};

export default ProfileGithup;
