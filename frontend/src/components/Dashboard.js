import React, { useState } from 'react';
import { Card, Alert, Button } from 'react-bootstrap';
import { UseAuth } from '../contexts/AuthContext';

export default function Dashboard() {
	const [error, setError] = useState('');
	const { currentUser, logOut } = UseAuth();

	function handleLogout() {
		console.log('currentUser: handleLogout', currentUser);
		logOut(currentUser._id);
	}

	return (
		<div>
			<Card>
				<Card.Body>
					<h2 className='text-center mb-4'>Items</h2>
					{error && <Alert variant='danger'>{error}</Alert>}
					<strong>Email: </strong>
					{currentUser.email}
				</Card.Body>
			</Card>
			<div className='w-100 text-center mt-2'>
				<Button variant='link' onClick={handleLogout}>
					Log Out
				</Button>
			</div>
		</div>
	);
}
