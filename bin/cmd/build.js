import { dirname } from 'path'
import fs from 'mz/fs'
import mkdirp from 'mkdirp'
import render from '../../lib/render' // eslint-disable-line import/no-unresolved

export const command = 'build [file]'

export const description = 'build markdown file to html'

export async function handler(argv) {
  try {
    const file = argv.file || 'README.md'
    const out = argv.out || 'index.html'
    const html = await render(file)
    const start = Date.now()
    console.log(`> Writing to ${out}`)
    mkdirp.sync(dirname(out))
    await fs.writeFile(out, html, 'utf8')
    console.log(`> Done`)
  } catch (err) {
    console.error(err)
    process.exit(1) // eslint-disable-line unicorn/no-process-exit
  }
}
