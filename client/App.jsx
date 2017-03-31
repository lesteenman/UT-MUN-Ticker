import React, { Component } from 'react';
import Helmet from 'react-helmet';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { MuiThemeProvider } from 'material-ui/styles';
import Paper from 'material-ui/Paper';

const muiTheme = getMuiTheme({
	palette: {
		primary1Color: "#4D8FCC",
	},
});

export default class App extends Component {
	constructor(props, context) {
		super(props, context);
	}

	render() {
		return (
			<MuiThemeProvider muiTheme={muiTheme}>
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
