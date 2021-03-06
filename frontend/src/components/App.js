import React from 'react';
import Signup from './signup-component';
import { Container } from 'react-bootstrap';
import AuthProvider from '../contexts/AuthContext';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Dashboard from './Dashboard';
import Login from './Login';

function App() {
	return (
		<Container className='d-flex align-items-center justify-contet-center' style={{ minHeight: '100vh' }}>
			<div className='w-100 m-auto' style={{ maxWidth: '400px' }}>
				<Router>
					<AuthProvider>
						<Switch>
							<Route exact path='/' component={Dashboard} />
							<Route path='/signup' component={Signup} />
							<Route path='/login' component={Login} />
						</Switch>
					</AuthProvider>
				</Router>
			</div>
		</Container>
	);
}

export default App;
