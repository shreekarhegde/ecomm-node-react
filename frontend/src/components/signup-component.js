import React, { useRef } from 'react';
import { Card, Form, Button } from 'react-bootstrap';

export default function Signup() {
	const emailRef = useRef();
	const passwordRef = useRef();
	const passwordConfirmRef = useRef();

	return (
		<div>
			<Card>
				<Card.Body>
					<h2 className='text-center mb-4'>Sign up</h2>
					<Form>
						<Form.Group id='email'>
							<Form.Label for='email'>Email</Form.Label>
							<Form.Control type='email' ref={emailRef} required></Form.Control>
						</Form.Group>
						<Form.Group id='password'>
							<Form.Label for='password'>Password</Form.Label>
							<Form.Control type='password' ref={passwordRef} required></Form.Control>
						</Form.Group>
						<Form.Group id='password-confirm'>
							<Form.Label for='password-confirm'>Password Confirmation</Form.Label>
							<Form.Control type='password' ref={passwordConfirmRef} required></Form.Control>
						</Form.Group>
						<Button className='w-100 mt-4' type='submit'>
							Sign Up
						</Button>
					</Form>
				</Card.Body>
			</Card>
			<div className='w-100 text-center mt-2'>Already have an account? Login</div>
		</div>
	);
}
