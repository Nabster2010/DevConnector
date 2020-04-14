import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
const ProfileEducation = ({
	education: { school, from, to, degree, fieldofstudy, description },
}) => (
	<div>
		<h3 className='text-dark'>{school}</h3>
		<p>
			<Moment format='DD/MM/YYYY'>{from}</Moment> -
			{to ? <Moment format='DD/MM/YYYY'> {to}</Moment> : ' NOW'}
		</p>
		<p>
			<strong>Position: </strong>
			{degree}
		</p>
		<p>
			<strong>Field Of Study: </strong> {fieldofstudy}
		</p>
		<p>
			<strong>Description: </strong> {description}
		</p>
	</div>
);
ProfileEducation.propTypes = {
	education: PropTypes.object.isRequired,
};
export default ProfileEducation;
