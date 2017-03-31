import { Meteor } from 'meteor/meteor';
import { RssFeed } from 'meteor/raix:rssfeed';

import FeedItems from '/api/feedItems.js';

// TODO: Add a proper config

Meteor.startup(() => {
	RssFeed.publish('feed', function(query) {
		this.setValue('title', 'Xibo feed');
		this.setValue('description', this.cdata('This is a live feed'));
		this.setValue('link', Meteor.absoluteUrl());
		this.setValue('lastBuildDate', new Date());
		this.setValue('pubDate', new Date());
		this.setValue('ttl', 1);

		FeedItems.find({enabled: true}, {sort: {order: -1}}).forEach((item) => {
			this.addItem({
				title: item.text,
				description: item.text,
				link: Meteor.absoluteUrl(),
				pubDate: new Date(),
			});
		});
	});
});
