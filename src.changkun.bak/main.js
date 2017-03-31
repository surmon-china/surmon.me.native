import React, { Component } from 'react';
import {
	StyleSheet,
	View,
	Text,
	ListView,
	TabBarIOS,
	NavigatorIOS
} from 'react-native';

import Home from './components/home'
import Tags from './components/tags'
import Search from './components/search'
import About from './components/about'

import Dimensions from 'Dimensions';

let {width, height, scale} = Dimensions.get('window');

export default class Main extends Component {
	constructor() {
		super();
		this.state = {
			selectedTabBarItem: 'home'
		};
	}
	render() {
		return (
			<TabBarIOS
				tintColor='#FF6600'
			>
				<TabBarIOS.Item 
					title='主页'
					icon={require('../assets/tabbar/home.png')}
					selected={this.state.selectedTabBarItem === 'home'}
					onPress={()=>{this.setState({selectedTabBarItem: 'home'})}}
					renderAsOriginal={false}
				>
					<NavigatorIOS
						initialRoute={{
							component: Home,
							title: '欧长坤的博客',
						}}
						style={styles.container}
					/>
				</TabBarIOS.Item>
				<TabBarIOS.Item 
					title='标签'
					icon={require('../assets/tabbar/tags.png')}
					selected={this.state.selectedTabBarItem === 'tags'}
					onPress={()=>{this.setState({selectedTabBarItem: 'tags'})}}
					renderAsOriginal={false}
				>
					<NavigatorIOS
						initialRoute={{
							component: Tags,
							title: '标签',
						}}
						style={styles.container}
					/>
				</TabBarIOS.Item>
				<TabBarIOS.Item 
					title='搜索'
					icon={require('../assets/tabbar/search.png')}
					selected={this.state.selectedTabBarItem === 'search'}
					onPress={()=>{this.setState({selectedTabBarItem: 'search'})}}
					renderAsOriginal={false}
				>
					<NavigatorIOS
						initialRoute={{
							component: Search,
							title: '搜索',
						}}
						style={styles.container}
					/>
				</TabBarIOS.Item>
				<TabBarIOS.Item 
					title='关于'
					icon={require('../assets/tabbar/about.png')}
					selected={this.state.selectedTabBarItem === 'about'}
					onPress={()=>{this.setState({selectedTabBarItem: 'about'})}}
					renderAsOriginal={false}
				>
					<NavigatorIOS
						initialRoute={{
							component: About,
							title: '关于',
						}}
						style={styles.container}
					/>
				</TabBarIOS.Item>
			</TabBarIOS>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	}
})