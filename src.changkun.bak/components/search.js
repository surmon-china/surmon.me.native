import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	View,
} from 'react-native';

export default class Search extends Component {
	render() {
		return (
			<View style={styles.container}>
				<Text>搜索</Text>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	}
})