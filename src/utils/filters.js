/*
*
* Filters
*
*/

// 时间转换
const toYMD = date => {
  if (!date) return date
  date = new Date(date)
  return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()} ${date.getHours() > 11 ? '下午' : '上午'}`
}

// 描述限制
const descLimit = (description, limit = 80) => {
  return description.length < limit ? description : `${description.slice(0, limit)}...`
}

// 缩略图构造
const localThumb = require('@app/images/thumb-article.jpg')
const buildThumb = thumb => {
  return thumb ? {uri: thumb} : localThumb
}

export default {
	toYMD,
	descLimit,
	buildThumb
}