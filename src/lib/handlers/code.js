import detab from 'detab'
import u from 'unist-builder'

/* Transform a code block. */
export default function code(h, node) {
  const value = node.value ? detab(node.value + '\n') : ''
  const lang = node.lang && node.lang.match(/^[^ \t]+(?=[ \t]|$)/)
  const props = {}

  if (lang) {
    props.className = ['language-' + lang]
  }

  return h(node.position, 'pre', [
    h(node, 'code', props, [u(node.highlighted ? 'raw' : 'text', value)])
  ])
}
