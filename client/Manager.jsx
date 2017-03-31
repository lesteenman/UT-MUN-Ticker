import React, { Component } from 'react';
import Helmet from 'react-helmet';

import { createContainer } from 'meteor/react-meteor-data';

import {List, ListItem} from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';
import TextField from 'material-ui/TextField';
import SvgIcon from 'material-ui/SvgIcon';

import DeleteIcon from 'material-ui/svg-icons/action/delete';
import DragHandleIcon from 'material-ui/svg-icons/editor/drag-handle';

import {SortableContainer, SortableElement, SortableHandle, arrayMove} from 'react-sortable-hoc';

import FeedItems from '/api/feedItems.js';

const DragHandle = SortableHandle(() => (
	<DragHandleIcon />
));

const FeedItem = SortableElement(({key, text, enabled}) => {
	return (
		<ListItem
			leftCheckbox={<Checkbox
				defaultChecked={enabled}
				onChange={(e) => {
					console.log("Toggling checkbox:", e, e.target);
				}}
			/>}
			rightIcon={<DragHandleIcon className="draghandle" />}
			primaryText={text}
		/>
	);
});

const SortableFeedList = SortableContainer(({items}) => (
	<List>
		{items.forEach((item) => {
			console.log("Rendering item:", item);
			return (
				<FeedItem index={item.order} key={item._id} text={item.text} enabled={item.enabled} />
			);
		})}
	</List>
));

class ManagerPage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			items: [
				'Het event is gestart!',
				'We zijn nog bezig met voorbereidingen...',
				'Werk aan de IT-Mogelijkheden',
				'Commissie opgestart!',
			],
		};
	}

	onSortEnd(props) {
		let items = arrayMove(this.state.items, props.oldIndex, props.newIndex);
		this.updateItems(items);
	}

	shouldCancelStart(e) {
		let el = e.target;
		while (el) {
			let cls = el.className;
			if (cls.baseVal && cls.baseVal.indexOf('draghandle') >= 0) {
				e.preventDefault();
				return false;
			}
			el = el.parentElement;
		}
		return true;
	}

	updateItems(items) {
		// Send to server
		this.setState({
			items: items
		});
	}

	addItem(text) {
		Meteor.call('feed.insert', text);
		// let items = this.state.items;
		// items.unshift(text);
		// this.updateItems(items);
	}

	deleteItem(item) {
		console.log("Would delete item", item);
	}

	render() {
		return (
			<div>
				<TextField
					style={{width: '100%'}}
					floatingLabelText="Add ticker item"
					onKeyPress={(e) => {
						if (e.key === 'Enter') {
							console.log('Pressed enter on', e.target.value);
							this.addItem(e.target.value);
							e.target.value = "";
						}
						console.log("Key pressed:", e.key);
					}}
				/>
				{<SortableFeedList
					items={this.props.items}
					lockAxis='y'
					onSortEnd={(props) => { this.onSortEnd(props) }}
					shouldCancelStart={this.shouldCancelStart}
				/>}
			</div>
		);
	}
}

export default createContainer(() => {

	return {
		items: FeedItems.find({}, {sort: {order: 1}}).fetch(),
	};
}, ManagerPage);
