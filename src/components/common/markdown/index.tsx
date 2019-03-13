/**
 * @file Markdown 解析服务
 * @module components/common/markdown
 * @author Surmon <https://github.com/surmon-china>
 */

import React, { Component } from 'react'
import marked from 'marked'
import Hljs from 'highlight.js'
import { observer } from 'mobx-react/native'
import { StyleSheet, View, ViewStyle } from 'react-native'
import { observable, computed, action, reaction } from 'mobx'
import { boundMethod } from 'autobind-decorator'
import { ImageViewerModal } from '@app/components/common/image-viewer'
import { AutoActivityIndicator } from '@app/components/common/activity-indicator'
import { INavigationProps } from '@app/types/props'
import { EHomeRoutes } from '@app/routes'
import { IS_IOS } from '@app/config'
import * as markdownStyles from './styles'
const AutoHeightWebView = require('react-native-autoheight-webview').default

Hljs.registerLanguage('go', require('highlight.js/lib/languages/go'))
Hljs.registerLanguage('css', require('highlight.js/lib/languages/css'))
Hljs.registerLanguage('sql', require('highlight.js/lib/languages/sql'))
Hljs.registerLanguage('php', require('highlight.js/lib/languages/php'))
Hljs.registerLanguage('xml', require('highlight.js/lib/languages/xml'))
Hljs.registerLanguage('json', require('highlight.js/lib/languages/json'))
Hljs.registerLanguage('bash', require('highlight.js/lib/languages/bash'))
Hljs.registerLanguage('less', require('highlight.js/lib/languages/less'))
Hljs.registerLanguage('scss', require('highlight.js/lib/languages/scss'))
Hljs.registerLanguage('shell', require('highlight.js/lib/languages/shell'))
Hljs.registerLanguage('nginx', require('highlight.js/lib/languages/nginx'))
Hljs.registerLanguage('stylus', require('highlight.js/lib/languages/stylus'))
Hljs.registerLanguage('python', require('highlight.js/lib/languages/python'))
Hljs.registerLanguage('javascript', require('highlight.js/lib/languages/javascript'))
Hljs.registerLanguage('typescript', require('highlight.js/lib/languages/typescript'))

enum WebViewEventAction {
  Image = 'image',
  Url = 'url'
}

interface IMarkdownProps extends INavigationProps {
  markdown: string | null // 内容
  padding?: number // 边距
  sanitize?: boolean // 是否清洗 HTML
  indicator?: boolean // 是否使用渲染动画
  style?: ViewStyle // 内容区样式
}

@observer export class Markdown extends Component<IMarkdownProps> {

  private images: string[] = []
  private renderer: marked.Renderer = new marked.Renderer()

  constructor(props: IMarkdownProps) {
    super(props)
    this.initMarked()
    this.initRenderer()
    // reaction(
    //   () => [this.htmlContent, this.htmlStyle],
    //   ([htmlContent, htmlStyle]) => console.log('htmlContent', htmlContent, 'htmlStyle', htmlStyle),
    //   { fireImmediately: true }
    // )
  }

  @observable private htmlReadied: boolean = false
  @observable private imageModalVisible: boolean = false
  @observable private imageModalIndex: number = 0

  @action.bound updateHtmlReadied(readied: boolean) {
    this.htmlReadied = readied
  }

  @action.bound updateImageModalIndex(index: number) {
    this.imageModalIndex = index
  }

  @action.bound updateImageModalVisible(visible: boolean) {
    this.imageModalVisible = visible
  }

  @computed get isIndicatorEnabled(): boolean {
    const { indicator } = this.props
    return indicator == null ? true : indicator
  }

  @computed get htmlContent(): string {
    const { renderer, props } = this
    const { markdown } = props
    return markdown
      ? `<div id="content">${marked(markdown, { renderer })}</div>`
      : ''
  }

  @computed get htmlStyle(): string {
    const { padding } = this.props
    return markdownStyles.ocean +
      markdownStyles.content.styles +
      `#content { padding: 0 ${padding || 0}px }`
  }

  @boundMethod
  private handleWebViewEvent(event: any) {
    const json = event.nativeEvent.data
    const eventData = json ? JSON.parse(json) : null
    if (eventData) {
      // 图片弹窗
      if (eventData.action === WebViewEventAction.Image) {
        this.updateImageModalIndex(this.images.indexOf(eventData.data))
        this.updateImageModalVisible(true)
      }
      // 打开链接
      if (eventData.action === WebViewEventAction.Url) {
        const url: string = eventData.data
        const articleUrlPrefix = 'https://surmon.me/article/'
        const isArticleUrl = url.startsWith(articleUrlPrefix)
        if (isArticleUrl) {
          const articleId = url.replace(articleUrlPrefix, '')
          this.props.navigation.navigate({
            key: articleId,
            routeName: EHomeRoutes.ArticleDetail,
            params: { articleId }
          })
        } else {
          this.props.navigation.navigate(
            EHomeRoutes.ArticleWebview,
            { url }
          )
        }
      }
    }
  }

  private initMarked() {
    marked.setOptions({
      renderer: new marked.Renderer(),
      gfm: true,
      tables: true,
      breaks: false,
      pedantic: false,
      sanitize: this.props.sanitize == null ? true : this.props.sanitize,
      smartLists: true,
      smartypants: false,
      highlight(code: string) {
        return Hljs.highlightAuto(code).value
      }
    })
  }

  private initRenderer() {
    this.renderer.link = this.linkRender
    this.renderer.code = this.codeRender
    this.renderer.image = this.imageRender
    this.renderer.heading = this.headingRender
    this.renderer.paragraph = this.paragraphRender
  }

  private htmlScript: string = `window.dispatchMessage = function(action, data) {
    window.ReactNativeWebView.postMessage(JSON.stringify({ action, data }))
  };`

  // 段落
  private paragraphRender(text: string): string {
    return `<p>${text}</p>`
  }

  // 标题
  private headingRender(text: string, level: number, raw: string): string {
    const id = raw.toLowerCase().replace(/[^a-zA-Z0-9\u4e00-\u9fa5]+/g, '-')
    return `<h${level} id=${id}>${text}</h${level}>`
  }

  private linkRender(href: string, title: string, text: string): string {
    return `
      <a
        href="${href}"
        onclick="window.dispatchMessage('${WebViewEventAction.Url}', '${href}');return false;"
      >${text}</a>`
    }

  @boundMethod
  private imageRender(src: string, title: string, alt: string): string {
    src = src.replace(/^http:\/\//ig, '/proxy/')
    this.images.push(src)
    return  `
      <img
        src="${src}"
        onclick="window.dispatchMessage('${WebViewEventAction.Image}', '${src}')"
      />`
    }

  // 代码解析器
  private codeRender(code: string, lang: string, escaped: boolean): string {
    const { options } = this as any
    if (options.highlight) {
      const out = options.highlight(code, lang)
      if (out != null && out !== code) {
        escaped = true
        code = out
      }
    }
    return `<pre><code>${(escaped ? code : escape(code))}\n</code></pre>`
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        {!this.htmlReadied && this.isIndicatorEnabled && (
          <View style={[{ flex: 1, zIndex: 1 }, StyleSheet.absoluteFill]}>
            <AutoActivityIndicator style={{ flex: 1 }} text="渲染中..." />
          </View>
        )}
        <AutoHeightWebView
          style={{ flex: 1, ...this.props.style, opacity: this.htmlReadied ? 1 : 0 }}
          customScript={this.htmlScript}
          customStyle={this.htmlStyle}
          useWebKit={IS_IOS}
          scalesPageToFit={false}
          scrollEnabled={false}
          originWhitelist={['*']}
          source={{ html: this.htmlContent }}
          onMessage={this.handleWebViewEvent}
          onSizeUpdated={() => this.updateHtmlReadied(true)}
        />
        <ImageViewerModal
          images={this.images}
          index={this.imageModalIndex}
          visible={this.imageModalVisible}
          onClose={() => this.updateImageModalVisible(false)}
        />
      </View>
    )
  }
}
