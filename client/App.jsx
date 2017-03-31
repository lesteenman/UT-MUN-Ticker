import React, { Component } from 'react';
import Helmet from 'react-helmet';

import { MuiThemeProvider } from 'material-ui/styles';
import Paper from 'material-ui/Paper';

export default class App extends Component {
	constructor(props, context) {
		super(props, context);
	}

	render() {
		return (
			<MuiThemeProvider>
				<Paper
					className='app'
					zDepth={2}
					style={{padding: '40px'}}
				>
					<Helmet title='Xibo Feed manager' />
					{this.props.children}
				</Paper>
			</MuiThemeProvider>
		);
	}
};
