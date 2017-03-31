import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export default FeedItems = new Mongo.Collection('feed');

Meteor.methods({
	'feed.insert'(text) {
		if (!text) return;

		check(text, String);
		// TODO: Check if logged in

		let items = FeedItems.find({});
		let maxOrder = 0;
		let maxItem = FeedItems.findOne({}, {
			sort: {
				order: 1
			},
			limit: 1
		});
		if (maxItem) maxOrder = maxItem.order;

		console.log("Max Order found:", maxOrder);

		FeedItems.insert({
			text,
			order: maxOrder + 1,
			enabled: true,
		});
	},
	'feed.remove'(_id) {
		check(_id, String);
		// TODO: Check if logged in

		FeedItems.remove(_id);
	},
	'feed.setEnabled'(_id,enabled) {
		check(_id, String);
		check(enabled, Boolean);
		// TODO: Check if logged in

		FeedItems.update(_id, {
			$set: { enabled: enabled },
		});
	},
	'feed.moveUp'(_id) {
		check(_id, String);
		// TODO: Check if logged in

		let currentOrder = FeedItems.findOne(_id).order;
		let swapWith = FeedItems.findOne({
			order: {$lt: currentOrder}
		}, {
			sort: {
				order: 1
			},
			limit: 1
		});

		console.log('Swapping:', _id, currentOrder, 'with', swapWith);
		if (swapWith) {
			FeedItems.update(_id, {
				$set: { order: swapWith.order }
			});
			FeedItems.update(swapWith._id, {
				$set: { order: currentOrder }
			});
		}
	},
	'feed.moveDown'(_id) {
		check(_id, String);
		// TODO: Check if logged in

		let currentOrder = FeedItems.findOne(_id).order;
		let swapWith = FeedItems.findOne({
			order: {$gt: currentOrder}
		}, {
			sort: {
				order: -1
			},
			limit: 1
		});

		console.log('Swapping:', _id, currentOrder, 'with', swapWith);
		if (swapWith) {
			FeedItems.update(_id, {
				$set: { order: swapWith.order }
			});
			FeedItems.update(swapWith._id, {
				$set: { order: currentOrder }
			});
		}
	},
});
