
// 时间转换
export const toYMD = (dateStr: string): string => {
  if (!dateStr) {
    return dateStr
  }
  const date = new Date(dateStr)
  return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()} ${date.getHours() > 11 ? '下午' : '上午'}`
}

// 描述限制
export const descLimit = (description: string, limit: number = 80) => {
  return description.length < limit ? description : `${description.slice(0, limit)}...`
}

// 缩略图构造
const localThumb = require('@app/images/thumb-article.jpg')
export const buildThumb = (thumb: string) => {
  return thumb ? { uri: thumb } : localThumb
}
