/* eslint-disable import/no-unassigned-import */
import visit from 'unist-util-visit'
import Prism from 'prismjs'

import 'prismjs/components/prism-bash'
import 'prismjs/components/prism-clike'
import 'prismjs/components/prism-markdown'
import 'prismjs/components/prism-yaml'
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-jsx'
import 'prismjs/components/prism-go'
import 'prismjs/components/prism-rust'
import 'prismjs/components/prism-python'
import 'prismjs/components/prism-swift'

export default function () {
  function transformer(ast) {
    visit(ast, 'code', node => {
      const lang = Prism.languages[node.lang]
      node.highlighted = Boolean(lang)
      node.value = lang ? Prism.highlight(node.value, lang) : node.value
    })
  }

  return transformer
}
