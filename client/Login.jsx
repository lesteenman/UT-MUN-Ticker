import React, { Component } from 'react';
import Helmet from 'react-helmet';

import { createContainer } from 'meteor/react-meteor-data';

class LoginPage extends Component {
	render() {
		return (
			<div>
				<Helmet title="Login" />
				Render a login form
			</div>
		);
	}
}

export default createContainer(() => {
	return {
	};
}, LoginPage);
