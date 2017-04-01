/*
*
* marked service
*
*/


import marked from 'marked';

marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  // highlight(code) {
  //   return Hljs.highlightAuto(code).value
  // }
})

const renderer = new marked.Renderer()

// 对图片进行弹窗处理
renderer.image = (src, title, alt) => {
  src = src.replace(/^http:\/\//ig, "https://surmon.me/proxy/")
  return `<img src="${src}" title="${title || alt || 'surmon.me'}" alt="${alt || title || src}"/>`
}

export default content => marked(content, { renderer });
