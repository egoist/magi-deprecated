import { join } from 'path'
import fs from 'mz/fs'
import pug from 'pug'
import fetch from 'nofetch'
import magi from './'

export default async function render(file) {
  if (!file) {
    throw new Error('file is required!')
  }

  const str = /^https?:\/\//.test(file) ?
    await fetch(file).then(res => res.text()) :
    await fs.readFile(file, 'utf8')

  return await renderString(str)
}

export async function renderString(str) {
  const compile = pug.compileFile(join(__dirname, '../template/index.pug'))

  const pageData = await magi(str)

  return compile({ page: pageData })
}
