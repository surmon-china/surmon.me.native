/**
 * @file Markdown 解析器样式
 * @module components/common/markdown/styles
 * @author Surmon <https://github.com/surmon-china>
 */

import { observable } from 'mobx'
import colors from '@app/style/colors'
import sizes from '@app/style/sizes'
import fonts from '@app/style/fonts'

export const content = observable({
  get styles() {

    const $borderColor = colors.border
    const $borderWidth = sizes.borderWidth
    const $gapGoldenRatio = sizes.goldenRatioGap
    const $fontDINRegular = fonts.fontFamily

    const $primaryColor = colors.primary
    const $textColor = colors.textDefault
    const $titleColor = colors.textTitle
    const $textMuted = colors.textMuted

    return `
      * {
        outline: none;
        margin: 0;
        padding: 0;
        box-shadow: none;
        border: 0;
        border-radius: 0;
      }

      @font-face {
        font-family: System;
        src: local('System'), local('PingFang SC');
        unicode-range: U+02C2, U+02C3, U+003C, U+003E, U+3009;
      }
      
      @font-face {
        font-family: ${$fontDINRegular};
        src: url('https://surmon.me/fonts/DIN-Regular.ttf');
      }

      body {
        font-size: 14px;
        font-family: System, ${$fontDINRegular};
        color: ${$textColor};
        overflow: hidden;
      }

      hr {
        height: ${$borderWidth}px;
        background-color: ${$borderColor};
        margin-bottom: 1rem;
      }

      iframe {
        width: 100%;
        margin-bottom: 1rem;
        background-color: ${colors.inverse};
        max-height: ${sizes.screen.width * sizes.goldenRatio}px;
      }

      blockquote {
        margin: 1rem 0;
        border-left: .5rem solid ${$textMuted};
        padding: .5rem;
        padding-left: 1rem;
      }
      blockquote p:last-child {
        margin-bottom: 0;
      }

      a {
        color: ${$primaryColor};
        text-decoration: none;
        // border-bottom: ${$borderWidth}px solid ${$textColor};
        font-weight: bold;
        margin: 0 .1rem;
      }
      a.image-link {
        margin: 0;
      }

      img {
        width: 100%;
        position: relative;
        margin: 0 auto;
        display: block;
        text-align: center;
      }

      p {
        line-height: 2em;
        margin-bottom: 1em;
      }
      p.text-center {
        text-align: center;
      }
      p.text-right {
        text-align: right;
      }

      small {
        font-size: 0.85rem;
      }
      h1 {
        font-size: 1.5rem;
      }
      h2 {
        font-size: 1.25rem;
      }
      h3 {
        font-size: 1.1rem;
      }
      h4, h5 {
        font-size: 1rem;
      }

      h1, h2, h3, h4, h5, h6 {
        color: ${$titleColor};
        margin-bottom: 0.8em;
        line-height: 1.8em;
        font-weight: 700;
        text-indent: 0;
      }

      ul, ol {
        margin: 0;
        margin-bottom: 1rem;
        padding: 0;
        padding-left: 1.6rem;
      }
      ul {
        list-style-type: none;
      }
      ul > li,
      ol > li {
        line-height: 1.8em;
        margin-bottom: 1rem;
        position: relative;
      }
      ul > li:before {
        content: '';
        position: absolute;
        left: -1rem;
        top: 0.6rem;
        width: 0.3rem;
        height: 0.3rem;
        background-color: ${$textColor};
      }
      ul > li > p,
      ol > li > p {
        text-indent: 0;
      }
      ul > li > p + ul,
      ul > li > p + ol,
      ul > li > ul,
      ul > li > ol {
        margin-top: 1rem;
      }
      ul > li:last-child,
      ol > li:last-child,
      ul > li:last-child > p,
      ol > li:last-child > p,
      ul > li > ul:last-child,
      ul > li > ol:last-child,
      ol > li > ol:last-child,
      ol > li > ul:last-child {
        margin-bottom: 0;
      }

      code {
        color: #bd4147;
        margin: 0 .3rem;
        padding: .3rem;
        border-radius: 2px;
        background-color: ${$textMuted};
      }

      pre {
        margin: 0;
        padding: 0;
        width: 100%;
        max-height: ${sizes.screen.heightTwoThirds}px;
        display: block;
        position: relative;
        margin-bottom: 1rem;
        background-color: ${colors.inverse};
        font-family: monospace, monospace;
        white-space: pre;
        overflow: auto;
      }
      pre > code {
        margin: 0;
        padding: ${$gapGoldenRatio}px;
        display: block;
        font-size: ${fonts.base.fontSize}px!important;
        line-height: 1.6em;
        color: ${$textMuted};
        background-color: transparent;
        vertical-align: baseline;
      }

      table {
        width: 100%;
        border-collapse: collapse;
        border-spacing: 0;
        margin-bottom: ${$gapGoldenRatio}px;
      }
      caption {
        padding: ${$gapGoldenRatio}px;
      }
      thead th {
        background-color: $module-hover-bg;
        text-align: left;
      }
      tr {
        margin-bottom: ${$gapGoldenRatio}px;;
      }
      th,
      td {
        vertical-align: inherit;
        font-size: ${fonts.base.fontSize}px;
        border: 1px solid ${$textMuted};
        padding: .5rem;
        vertical-align: inherit;
      }
      tfoot tr {
        text-align: left;
      }
      tfoot td {
        font-style: italic;
        padding: ${$gapGoldenRatio}px;
      }

    `
  }
})

export const ocean = `
  /* Ocean Dark Theme */
  /* https://github.com/gavsiu */
  /* Original theme - https://github.com/chriskempson/base16 */

  /* Ocean Comment */
  .hljs-comment,
  .hljs-quote {
    color: #65737e;
  }

  /* Ocean Red */
  .hljs-variable,
  .hljs-template-variable,
  .hljs-tag,
  .hljs-name,
  .hljs-selector-id,
  .hljs-selector-class,
  .hljs-regexp,
  .hljs-deletion {
    color: #bf616a;
  }

  /* Ocean Orange */
  .hljs-number,
  .hljs-built_in,
  .hljs-builtin-name,
  .hljs-literal,
  .hljs-type,
  .hljs-params,
  .hljs-meta,
  .hljs-link {
    color: #d08770;
  }

  /* Ocean Yellow */
  .hljs-attribute {
    color: #ebcb8b;
  }

  /* Ocean Green */
  .hljs-string,
  .hljs-symbol,
  .hljs-bullet,
  .hljs-addition {
    color: #a3be8c;
  }

  /* Ocean Blue */
  .hljs-title,
  .hljs-section {
    color: #8fa1b3;
  }

  /* Ocean Purple */
  .hljs-keyword,
  .hljs-selector-tag {
    color: #b48ead;
  }

  .hljs {
    display: block;
    overflow-x: auto;
    background: #2b303b;
    color: #c0c5ce;
    padding: 0.5em;
  }

  .hljs-emphasis {
    font-style: italic;
  }

  .hljs-strong {
    font-weight: bold;
  }
`
