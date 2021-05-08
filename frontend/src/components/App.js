import React from 'react';
import Signup from './signup-component';
import { Container } from 'react-bootstrap';
import AuthProvider from '../contexts/AuthContext';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Dashboard from './Dashboard';
import Login from './Login';
import Routes from '../routes';
import { HelmetProvider } from 'react-helmet-async';
import ProductsContextProvider from '../contexts/ProductsContext';
import CartContextProvider from '../contexts/CartContext';
function App() {
	return (
		// <Container className='d-flex align-items-center justify-contet-center' style={{ minHeight: '100vh' }}>
		// 	<div className='w-100 m-auto' style={{ maxWidth: '400px' }}>
		// 		<Router>
		// 			<AuthProvider>
		// 				<Switch>
		// 					<Route exact path='/' component={Dashboard} />
		// 					<Route path='/signup' component={Signup} />
		// 					<Route path='/login' component={Login} />
		// 				</Switch>
		// 			</AuthProvider>
		// 		</Router>
		// 	</div>
		// </Container>
		<AuthProvider>
			<HelmetProvider>
				<ProductsContextProvider>
					<CartContextProvider>
						<Routes />
					</CartContextProvider>
				</ProductsContextProvider>
			</HelmetProvider>
		</AuthProvider>
	);
}

export default App;
