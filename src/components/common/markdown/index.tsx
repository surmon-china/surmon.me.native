/* eslint-disable react-native/no-inline-styles */
/**
 * @file Markdown 解析服务
 * @module components/common/markdown
 * @author Surmon <https://github.com/surmon-china>
 */

import marked from 'marked'
import Hljs from 'highlight.js'
import React, { Component } from 'react'
import { StyleSheet, View, ViewStyle } from 'react-native'
import { CommonActions } from '@react-navigation/native'
import { observable, computed, action } from 'mobx'
import { observer } from 'mobx-react'
import { boundMethod } from 'autobind-decorator'
import { webUrl } from '@app/config'
import { HomeRoutes } from '@app/constants/routes'
import { NavigationProps } from '@app/types/props'
import { LANGUAGE_KEYS } from '@app/constants/language'
import { ImageViewerModal } from '@app/components/common/image-viewer'
import { AutoActivityIndicator } from '@app/components/common/activity-indicator'
import i18n from '@app/services/i18n'
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

export interface IMarkdownProps extends NavigationProps {
  markdown: string | null // 内容
  padding?: number // 边距
  sanitize?: boolean // 是否清洗 HTML
  indicator?: boolean // 是否使用渲染动画
  style?: ViewStyle // 内容区样式
}

@observer
export class Markdown extends Component<IMarkdownProps> {

  constructor(props: IMarkdownProps) {
    super(props)
    this.initMarked()
    this.initRenderer()
  }

  private images: string[] = []
  private renderer: marked.Renderer = new marked.Renderer()

  @observable private htmlReadied: boolean = false
  @observable private imageModalVisible: boolean = false
  @observable private imageModalIndex: number = 0

  @action
  private updateHtmlReadied(readied: boolean) {
    this.htmlReadied = readied
  }

  @action
  private updateImageModalIndex(index: number) {
    this.imageModalIndex = index
  }

  @action
  private updateImageModalVisible(visible: boolean) {
    this.imageModalVisible = visible
  }

  @computed
  private get isIndicatorEnabled(): boolean {
    const { indicator } = this.props
    return indicator == null ? true : indicator
  }

  @computed
  private get htmlContent(): string {
    const { renderer, props } = this
    const { markdown } = props
    if (!markdown) {
      return ''
    }
    return `<div id="content">${marked(markdown, {renderer})}</div>`
  }

  @computed
  private get htmlStyle(): string {
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
        const articleUrlPrefix = `${webUrl}/article/`
        const isArticleUrl = url.startsWith(articleUrlPrefix)
        if (isArticleUrl) {
          const articleId = url.replace(articleUrlPrefix, '')
          this.props.navigation.dispatch(
            CommonActions.navigate({
              key: articleId,
              name: HomeRoutes.ArticleDetail,
              params: { articleId }
            })
          )
        } else {
          this.props.navigation.dispatch(
            CommonActions.navigate({
              name: HomeRoutes.ArticleWebview,
              params: { url }
            })
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

  private htmlScript: string = `
    ;window.dispatchMessage = function(action, data) {
      window.ReactNativeWebView.postMessage(JSON.stringify({ action, data }));
    };
  `

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
            <AutoActivityIndicator
              style={{ flex: 1 }}
              text={i18n.t(LANGUAGE_KEYS.RENDERING)}
            />
          </View>
        )}
        <AutoHeightWebView
          style={{
            flex: 1,
            ...this.props.style,
            opacity: this.htmlReadied ? 1 : 0
          }}
          customScript={this.htmlScript}
          customStyle={this.htmlStyle}
          useWebKit={false}
          // scalesPageToFit={false}
          scrollEnabled={false}
          originWhitelist={['*']}
          source={{ html: `<style>${this.htmlStyle}</style>` + this.htmlContent }}
          viewportContent={'width=device-width, user-scalable=no'}
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
