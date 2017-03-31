import React, { Component } from 'react';
import Helmet from 'react-helmet';

import { createContainer } from 'meteor/react-meteor-data';

import {List, ListItem} from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';
import TextField from 'material-ui/TextField';
import SvgIcon from 'material-ui/SvgIcon';

import DeleteIcon from 'material-ui/svg-icons/action/delete';
import DragHandleIcon from 'material-ui/svg-icons/editor/drag-handle';
import ArrowDownIcon from 'material-ui/svg-icons/hardware/keyboard-arrow-down';
import ArrowUpIcon from 'material-ui/svg-icons/hardware/keyboard-arrow-up';

import {SortableContainer, SortableElement, SortableHandle, arrayMove} from 'react-sortable-hoc';

import FeedItems from '/api/feedItems.js';

// const DragHandle = SortableHandle(() => (
// 	<DragHandleIcon />
// ));

const itemButtonStyle = {
	margin: '0 8px',
};
const FeedItem = SortableElement((props) => {
	console.log('FeedItem', props);
	return (
	<ListItem
		leftCheckbox={<Checkbox
			defaultChecked={props.enabled}
			onCheck={(e,c) => {
				console.log("Toggling checkbox:", e, e.target, c);
				Meteor.call('feed.setEnabled', props._id, c);
			}}
		/>}
	>
		<div style={{display: 'flex', flexDirection: 'row'}}>
			<span style={{flex: 1}}>{props.text}</span>
			<ArrowDownIcon
				style={itemButtonStyle}
				onClick={(e) => {
					Meteor.call('feed.moveDown', props._id);
					e.preventDefault();
					return false;
				}}
			/>
			<ArrowUpIcon
				style={itemButtonStyle}
				onClick={(e) => {
					Meteor.call('feed.moveUp', props._id);
					e.preventDefault();
					return false;
				}}
			/>
			<DeleteIcon
				style={itemButtonStyle}
				onClick={(e) => {
					Meteor.call('feed.remove', props._id);
					e.preventDefault();
					return false;
				}}
			/>
		</div>
	</ListItem>
)});

const SortableFeedList = SortableContainer(({items}) => (
	<List>
		{items.map((item) => (
			<FeedItem
				index={item.order}
				key={item._id}
				_id={item._id}
				text={item.text}
				enabled={item.enabled}
			/>
		))}
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
		console.log("Reorder:", props.oldIndex, props.newIndex, props);
		// let items = arrayMove(this.state.items, props.oldIndex, props.newIndex);
		// this.updateItems(items);
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
		let items = this.props.items;

		return (
			<div>
				<TextField
					style={{width: '100%'}}
					floatingLabelText="Add ticker item"
					onKeyPress={(e) => {
						if (e.key === 'Enter') {
							this.addItem(e.target.value);
							e.target.value = "";
						}
					}}
				/>
				{<SortableFeedList
					items={items}
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
