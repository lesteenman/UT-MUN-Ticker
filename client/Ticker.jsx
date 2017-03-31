import React, { Component } from 'react';
import Helmet from 'react-helmet';

import { createContainer } from 'meteor/react-meteor-data';

import FeedItems from '/api/feedItems.js';

import '/client/css/ticker.css';

const backgroundStyle = {
	backgroundImage: "url('/background.jpg')",
	backgroundRepeat: "no-repeat",
	backgroundSize: "contain",
	backgroundPosition: "50%",
};

const tickerBarHeight = 40;

class LoginPage extends Component {
	render() {
		let tickerItems = this.props.newsItems.map((item) => (
			<span key={item._id}>
				{item.text}
			</span>
		));
		return (
			<div>
				<div id='background' style={backgroundStyle} />
				<Helmet title="UT MUN news ticker" />
				<div id='ticker'>
					<div id='ticker-header'>
						Updates
					</div>
					<div id='ticker-scroller-wrapper'>
						<div className='ticker-scroller scroller-1'>
							{tickerItems}
						</div>
						<div className='ticker-scroller scroller-2'>
							{tickerItems}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default createContainer(() => {
	return {
		newsItems: FeedItems.find({enabled: true}).fetch(),
	};
}, LoginPage);
