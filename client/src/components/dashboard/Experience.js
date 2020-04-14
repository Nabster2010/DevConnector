import React, { Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Moment from 'react-moment';
import { deleteExperience } from '../../actions/profileActions';
const Experience = () => {
	const dispatch = useDispatch();
	const profileState = useSelector((state) => state.profile);
	const { profile } = profileState;

	return (
		<Fragment>
			<h2 className='my-2'>Experiences Credintials</h2>
			<table className='table'>
				<thead>
					<tr>
						<th>Company</th>
						<th className='hide-sm'>Title</th>
						<th className='hide-sm'>Years</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{profile.experience.map((exp) => (
						<tr key={exp._id}>
							<td>{exp.company}</td>
							<td className='hide-sm'>{exp.title}</td>
							<td className='hide-sm'>
								<Moment format='DD/MM/YYYY'>{exp.from}</Moment> -
								{exp.to === null ? (
									'NOW'
								) : (
									<Moment format='DD/MM/YYYY'>{exp.to}</Moment>
								)}
							</td>
							<td>
								<button
									className='btn btn-danger'
									onClick={() => dispatch(deleteExperience(exp._id))}
								>
									Delete
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</Fragment>
	);
};

export default Experience;
