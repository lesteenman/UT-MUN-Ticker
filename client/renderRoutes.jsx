import React from 'react';
import { Router, Route, browserHistory } from 'react-router';

import App from '/client/App.jsx';

import LoginPage from '/client/Login.jsx';
import ManagerPage from '/client/Manager.jsx';
import AuthenticatedContainer from '/client/containers/AuthenticatedContainer.jsx';

console.log("imported:", browserHistory);

export default renderRoutes = () => (
	<Router history={browserHistory}>
		<Route component={App}>
			<Route path="/login" component={LoginPage} />
			<Route component={AuthenticatedContainer}>
				<Route path="/" component={ManagerPage} />
			</Route>
		</Route>
	</Router>
);
