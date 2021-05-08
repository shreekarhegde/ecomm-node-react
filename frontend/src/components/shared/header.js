import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UseAuth } from '../../contexts/AuthContext';
import { CartContext } from '../../contexts/CartContext';
import { CartIcon } from '../icons';
import styles from './header.module.scss';

const Header = () => {
	const { itemCount } = useContext(CartContext);
	const { currentUser, logOut } = UseAuth();

	function handleLogout() {
		console.log('currentUser: handleLogout', currentUser);
		logOut(currentUser._id);
	}

	return (
		<header className={styles.header}>
			<Link to='/store'>Store</Link>
			<Link to='/cart'>
				{' '}
				<CartIcon /> Cart ({itemCount})
			</Link>
			<Link to='/login' onClick={handleLogout}>
				Log Out
			</Link>
		</header>
	);
};

export default Header;
