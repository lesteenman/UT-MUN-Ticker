import React, { Component } from 'react';
import Helmet from 'react-helmet';

import { createContainer } from 'meteor/react-meteor-data';

class AuthenticatedContainer extends Component {
	render() {
		return (
			<div>
				{this.props.children}
			</div>
		);
	}
}

export default createContainer((props) => {
	return {
		children: props.children,
	};
}, AuthenticatedContainer);
