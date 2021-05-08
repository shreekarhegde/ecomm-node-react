import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Store from '../pages/store';
import Cart from '../pages/cart';

const Routes = () => {
	return (
		<Router>
			<Switch>
				<Route exact path='/' component={Store} />
				<Route path='/cart' component={Cart} />
			</Switch>
		</Router>
	);
};

export default Routes;
