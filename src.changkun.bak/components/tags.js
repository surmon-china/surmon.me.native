import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	View,
	ScrollView,
	TouchableOpacity,
	AlertIOS
} from 'react-native';

import API from '../network/api'
import Dimensions from 'Dimensions';
const {width, height, scale} = Dimensions.get('window');

export default class Tags extends Component {
	constructor(props) {
		super(props);
		this.state = {
			tags: null
		}
	}
	_fetchTags() {
		fetch(API.CKBLOG_TAGS())
		.then(row => row.json())
		.then((tags) => {
			let rows = []
			for(let i=0; i<tags.length; i++)
				rows.push(
					<TouchableOpacity focusedOpacity={10} onPress={() => this._tagOnPress(tags[i].name)}>
						<Text 
							key={i+1}
							style={[styles.tag, {fontSize: parseInt(tags[i].count)*3}]}
						>
							{tags[i].name}
						</Text>
					</TouchableOpacity>
				)
			this.setState({
				tags: rows
			})
		})
		.catch(error => {
			console.log(error)
		})
	}
	_tagOnPress(tagName) {
		AlertIOS.alert('点击了'+tagName);
	}
	render() {
		this._fetchTags()
		return (
			<View style={styles.view}>
			<View style={styles.container}>
				{this.state.tags}
			</View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	view: {
		flex:1,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
	container: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'flex-start',
		flexWrap: 'wrap',
		padding: 20
	},
	tag: {
		padding: 5,
		alignSelf: 'center', 
		color: '#FF6600',
	}
})