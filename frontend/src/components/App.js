import React from 'react';
import Signup from './signup-component';
import { Container } from 'react-bootstrap';
function App() {
	return (
		<Container className='d-flex align-items-center justify-contet-center' style={{ minHeight: '100vh' }}>
			<div className='w-100 m-auto' style={{ maxWidth: '400px' }}>
				<Signup />
			</div>
		</Container>
	);
}

export default App;
