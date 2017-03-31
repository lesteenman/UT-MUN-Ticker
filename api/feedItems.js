import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export default FeedItems = new Mongo.Collection('feed');

Meteor.methods({
	'feed.insert'(text) {
		check(text, String);
		// TODO: Check if logged in

		let maxOrder = FeedItems.find({}, {
			sort: {
				order: 1
			},
			fields: ['order'],
			limit: 1
		});
		if (maxOrder === undefined) maxOrder = 0;

		FeedItems.insert({
			text,
			order: maxOrder + 1,
			enabled: true,
		});
	},
	'feed.remove'(_id) {
		check(_id, Number);
		// TODO: Check if logged in

		FeedItems.remove(_id);
	},
	'feed.setEnabled'(_id,enabled) {
		check(_id, Number);
		check(enabled, Boolean);
		// TODO: Check if logged in

		FeedItems.update(_id, {
			$set: { enabled: enabled },
		});
	},
	'feed.swap'(_id1,_id2) {
		check(_id1, Number);
		check(_id2, Number);
		// TODO: Check if logged in

		// TODO
	},
});
