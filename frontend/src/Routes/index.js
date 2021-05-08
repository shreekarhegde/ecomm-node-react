import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Store from '../pages/store';
import Cart from '../pages/cart';
import Signup from '../components/Signup';
import Login from '../components/Login';
import AuthProvider from '../contexts/AuthContext';

const Routes = () => {
	return (
		<Router>
			<Switch>
				<AuthProvider>
					<Route exact path='/' component={Store} />
					<Route path='/cart' component={Cart} />
					<Route path='/signup' component={Signup} />
					<Route path='/login' component={Login} />
				</AuthProvider>
			</Switch>
		</Router>
	);
};

export default Routes;
