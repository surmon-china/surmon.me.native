export default class API {
	constructor() {
		this.CKBLOG_POSTS = this.CKBLOG_API + 'posts.json';
	}
	static CKBLOG_API() {
		return 'https://changkun.us/api/'
	}
	static CKBLOG_TAGS() {
		return API.CKBLOG_API() + 'tags.json';
	}
	static CKBLOG_SITE() {
		return API.CKBLOG_API() + 'site.json';
	}
	static CKBLOG_API_BY_PATH(path) {
		return API.CKBLOG_API() + path;
	}
	static CKBLOG_POSTS_BY_PAGE(page) {
		return API.CKBLOG_API() + 'posts/' + page + '.json';
	}
	static CKBLOG_POSTS_BY_TAG(tag) {
		return API.CKBLOG_API() + 'tags/' + tag + '.json';
	}
	static CKBLOG_POSTS_BY_SLUG = (slug) => {
		return API.CKBLOG_API() + 'articles/' + slug + '.json';
	}
}
