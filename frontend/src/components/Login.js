import React, { useRef, useState } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { UseAuth } from '../contexts/AuthContext';

export default function Login() {
	const emailRef = useRef();
	const passwordRef = useRef();
	const { logIn } = UseAuth();
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const history = useHistory();

	async function handleSubmit(e) {
		e.preventDefault();

		try {
			setError('');
			setLoading(true);
			console.log('email', emailRef.current.value);
			console.log('password', passwordRef.current.value);
			await logIn(emailRef.current.value, passwordRef.current.value);
			history.push('/store');
		} catch (error) {
			console.log('error', error);
			setError('Failed to Log In');
		}

		setLoading(false);
	}

	return (
		<div className='container m-auto' style={{ maxWidth: '500px' }}>
			<Card className='mt-5'>
				<Card.Body>
					<h2 className='text-center mb-4'>Log In</h2>
					{error && <Alert variant='danger'>{error}</Alert>}
					<Form onSubmit={handleSubmit}>
						<Form.Group id='email'>
							<Form.Label>Email</Form.Label>
							<Form.Control type='email' ref={emailRef} required />
						</Form.Group>
						<Form.Group id='password'>
							<Form.Label>Password</Form.Label>
							<Form.Control type='password' ref={passwordRef} required />
						</Form.Group>
						<Button disabled={loading} className='w-100 mt-2' type='submit'>
							Log In
						</Button>
					</Form>
				</Card.Body>
			</Card>
			<div className='w-100 text-center mt-2'>
				Don't have an account?
				<Link to='/signup'> Sign Up</Link>
			</div>
		</div>
	);
}
