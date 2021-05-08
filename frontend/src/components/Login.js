import React, { useRef, useState } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { UseAuth } from '../contexts/AuthContext';

export default function Signup() {
	const emailRef = useRef();
	const passwordRef = useRef();
	const { signUp } = UseAuth();
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);

	async function handleSubmit(e) {
		e.preventDefault();

		try {
			setError('');
			setLoading(true);
			console.log('email', emailRef.current.value);
			console.log('password', passwordRef.current.value);
			await signUp(emailRef.current.value, passwordRef.current.value);
		} catch (error) {
			console.log('error', error);
			setError('Failed to create an account');
		}

		setLoading(false);
	}

	return (
		<div>
			<Card>
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
				<Link to='/signup'>Sign Up</Link>
			</div>
		</div>
	);
}
