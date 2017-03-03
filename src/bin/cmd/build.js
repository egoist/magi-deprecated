import { dirname } from 'path'
import fs from 'mz/fs'
import mkdirp from 'mkdirp'
import render from '../../lib/render'

export const command = 'build [file]'

export const description = 'build markdown file to html'

export async function handler(argv) {
  try {
    const file = argv.file || 'README.md'
    const out = argv.out || 'index.html'
    const html = await render(file)

    console.log(`> Writing to ${out}`)
    mkdirp.sync(dirname(out))

    await fs.writeFile(out, html, 'utf8')
    console.log(`> Done`)
  } catch (err) {
    console.error(err)
    process.exit(1) // eslint-disable-line unicorn/no-process-exit
  }
}
