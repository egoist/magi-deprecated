import remark from 'remark'
import visit from 'unist-util-visit'
import toHAST from 'mdast-util-to-hast'
import toHTML from 'hast-util-to-html'
import findAllBetween from 'unist-util-find-all-between'
import remove from 'unist-util-remove'
import html from 'remark-html'
import slug from 'remark-slug'
import htmlMatter from 'html-matter'
import highlight from './highlight'
import codeHandler from './handlers/code'

function nodeToHtml(node) {
  const hast = toHAST(node)
  return hast ? toHTML(hast) : ''
}

function childrenToHtml(children) {
  return children.map(c => nodeToHtml(c)).join('')
}

export default function (input) {
  const meta = {}

  return new Promise((resolve, reject) => {
    remark()
      .use(magi)
      .use(highlight)
      .use(slug)
      .use(html, {
        handlers: {
          code: codeHandler
        }
      })
      .process(input, (err, content) => {
        if (err) return reject(err)
        resolve({ ...meta, content: content.toString() })
      })
  })

  function magi() {
    function transformer(ast) {
      const headings = []

      visit(ast, 'heading', (n, i) => {
        headings.push({ node: n, index: i })
      })

      visit(ast, 'html', n => {
        try {
          const config = htmlMatter(n.value, { namespace: 'magi' })
          if (config) {
            Object.assign(meta, config)
          }
        } catch (err) {
          throw new Error(err.message)
        }
      })

      const heading1 = headings.filter(h => h.node.depth === 1)[0]
      const firstHeading2 = headings.filter(h => h.node.depth === 2)[0]

      if (!heading1 || !firstHeading2) return

      const inBetween = findAllBetween(ast, heading1.index + 1, firstHeading2.index)

      meta.title = childrenToHtml(heading1.node.children)

      let blockquoteNode
      const metaNodes = []
      inBetween.length && inBetween.forEach(n => {
        if (!blockquoteNode && n.type === 'blockquote') {
          blockquoteNode = n
        } else {
          metaNodes.push(n)
        }
      })

      if (blockquoteNode) {
        meta.description = childrenToHtml(blockquoteNode.children)
      }

      meta.meta = childrenToHtml(metaNodes)

      remove(ast, heading1.node)
      remove(ast, inBetween)
      return ast
    }

    return transformer
  }
}
