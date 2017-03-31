import React, { Component } from 'react';
import {
	StyleSheet,
	ListView,
	Text,
	View,
	Image,
	TouchableOpacity,
	AlertIOS,
	TabBarIOS,
	NavigatorIOS,
	RefreshControl,
	ActivityIndicator
} from 'react-native';

import API from '../network/api'
import Dimensions from 'Dimensions';
const {width, height, scale} = Dimensions.get('window');


const LoadingIndicator = ({loading}) => {
	return loading ? (
		<View style={styles.loading}>
			<ActivityIndicator animating = {true}
				style = {[styles.loading]}
				size = 'small'
			/>
		</View>
	) : null
}

export default class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			pagination: { 
				page: 1,
				loading: true
			},
			posts: [],
			dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
		};
	}
	componentDidMount() {
		this.fetchPosts(1)
	}
	fetchPosts(page) {
		const pagination = { ...this.state.pagination, loading: true }
    this._update(pagination, this.state.posts)
		return fetch(API.CKBLOG_POSTS_BY_PAGE(page))
			.then(row => row.json())
			.then((response) => this._fetchSuccess(response.data))
			.catch((error) => this._fetchFailure(error))
	}
	_fetchSuccess(results) {
		const pagination = { page: this.state.page, loading: false }
		const posts = pagination.page === 1 ? results : [ ...this.state.posts, ...results]
		this._update(pagination, posts)
		console.log('success', [ ...this.state.posts, ...posts])
	}
	_fetchFailure(error) {
		const pagination = { ...this.state.pagination, loading: false }
		this._update(this.state.pagination, this.state.posts)
		console.log('fail'+error);
	}
	_update(pagination, posts) {
		const loading = {
			type: 'loading',
			loading: pagination.loading
		};
		this.setState({
			pagination: pagination,
			posts: posts,
			dataSource: this.state.dataSource.cloneWithRows([ ...posts, loading])
		})
	}
	_onEndReached() {
		console.log('reach end')
	}


	render() {
		return (
			<ListView
				dataSource = {this.state.dataSource}
				renderRow = {this._renderRow}
				backgroundColor = '#F5F5F5'
				refreshControl = {
					<RefreshControl
						refreshing = {true}
					/>
				}
				onEndReached = {this._onEndReached}
				onEndReachedThreshold = {2}
			/>
		)
	}
	_renderRow(rowData, sectionID, rowID, highlightRow) {
		if (rowData.type === 'loading')
			return <LoadingIndicator loading = {rowData.loading} />

		// 否则为常规 cell

		// 解析简介，过滤 tag 和图片
		let excerpt = rowData.excerpt ? rowData.excerpt
									.replace(/\<(?!img|br).*?\>/g, "")
									.replace(/\r?\n|\r/g, '')
									.replace(/<img(.*)>/g, ' [图片] ')
									.substring(0, 100) : ''
		
		// 解析正文，提取文中图片
		let rex = /<img[^>]+src="?([^"\s]+)"(.*)>/g;
		let results = rex.exec(rowData.content);
		let imgURL = null;
		if (results !== null)
			imgURL = results[1];
		
		// 解析 tag list
		tag_list = '/ ';
		rowData.tags.forEach((tag) => {
			tag_list += tag.name + ' / '
		});

		return (
			<TouchableOpacity onPress={() => {AlertIOS.alert('点击了'+rowData.title)}}>
			<View style={styles.cell}>
				<View style={styles.contents}>
					<Text style={{fontSize: 15, fontWeight: 'bold', color: '#FF6600'}}>{rowData.title}</Text>
					{
						excerpt.length > 0 && 
						<Text style={{marginTop: 10, marginBottom: 10, color: '#666666'}} numberOfLines={3}>{excerpt}</Text>
					}
				</View>
				{imgURL && <Image source={{uri: 'https://changkun.us'+imgURL}} style={styles.cover}/>}
				<View style={styles.tag}>
					<Text style={{color: 'gray'}}>{'发布于 '+rowData.date.split('T')[0]}</Text>
					<Text style={{color: 'cornflowerblue'}}>{tag_list}</Text>
				</View>
			</View>
			</TouchableOpacity>
		);
	}
}

const styles = StyleSheet.create({
	cell: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'flex-start',
		marginTop: 10,
		backgroundColor: '#FFFFFE',
		paddingTop: 10,
		paddingBottom: 10,
		borderStyle: 'solid',
		borderTopWidth: 1,
		borderBottomWidth: 1,
		borderColor: '#EEEEEE',
	},
	cover: {
		width: width,
		height: 120
	},
	contents: {
		alignSelf: 'center',
		width: width*0.9,
		justifyContent: 'center',
	},
	tag: {
		paddingTop: 10,
		paddingLeft: (width*0.1)/2,
		paddingRight: (width*0.1)/2,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	loading: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		paddingVertical: 10
	}
})