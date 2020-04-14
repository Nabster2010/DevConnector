import React, { Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Moment from 'react-moment';
import { deleteEducation } from '../../actions/profileActions';
const Education = () => {
	const dispatch = useDispatch();
	const profileState = useSelector((state) => state.profile);
	const { profile } = profileState;

	return (
		<Fragment>
			<h2 className='my-2'>Education Credintials</h2>
			<table className='table'>
				<thead>
					<tr>
						<th>School</th>
						<th className='hide-sm'>Degree</th>
						<th className='hide-sm'>Years</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{profile.education.map((edu) => (
						<tr key={edu._id}>
							<td>{edu.school}</td>
							<td className='hide-sm'>{edu.degree}</td>
							<td className='hide-sm'>
								<Moment format='DD/MM/YYYY'>{edu.from}</Moment> -
								{edu.to === null ? (
									'NOW'
								) : (
									<Moment format='DD/MM/YYYY'>{edu.to}</Moment>
								)}
							</td>
							<td>
								<button
									className='btn btn-danger'
									onClick={() => dispatch(deleteEducation(edu._id))}
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

export default Education;
