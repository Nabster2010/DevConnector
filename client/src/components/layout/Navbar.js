import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../actions/authActions';

const Navbar = () => {
	const dispatch = useDispatch();
	const auth = useSelector((state) => state.auth);
	if (auth.isAuthenticated && !auth.loading) {
		return (
			<nav className='navbar bg-dark'>
				<h1>
					<Link to='/'>
						<i className='fas fa-code'></i> DevConnector
					</Link>
				</h1>
				<ul>
					<li>
						<a href='#!'>Developers</a>
					</li>

					<li>
						<Link to='/dashboard'>Dashboard</Link>
					</li>
					<li>
						<Link to='/logout' onClick={() => dispatch(logout())}>
							<i className='fas fa-sign-out-alt'></i>
							<span className='hide-sm'> Logout</span>
						</Link>
					</li>
				</ul>
			</nav>
		);
	} else {
		return (
			<nav className='navbar bg-dark'>
				<h1>
					<Link to='/'>
						<i className='fas fa-code'></i> DevConnector
					</Link>
				</h1>
				<ul>
					<li>
						<a href='!#'>Developers</a>
					</li>

					<li>
						<Link to='/register'>Register</Link>
					</li>
					<li>
						<Link to='/login'>Login</Link>
					</li>
				</ul>
			</nav>
		);
	}
};

export default Navbar;
