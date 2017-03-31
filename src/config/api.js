/*
*
* Api service
*
*/

import showToast from '@utils/toast';

// api
const baseApi = 'https://api.surmon.me';
const restful = url => {
  return fetch(url)
  .then(response => {
    // console.log(response);
    return response.json();
  })
  .then(json => {
    // console.log(json);
    showToast(json.message);
    if (Object.is(json.code, 0)) {
      // showToast(json.message);
    }
    return json;
  })
  .catch(error => {
    showToast('网络错误');
    console.warn(error);
  });
};

// apis
export default class Api {

  // 获取文章列表
  static getArticleList() {
    return restful(`${baseApi}/article`)
  }

  // 获取文章详情
  static getArticleDetail(article_id) {
    return restful(`${baseApi}/article/${article_id}`)
  }
}
