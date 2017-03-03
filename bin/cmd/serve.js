import express from 'express'
import render from '../../lib/render' // eslint-disable-line import/no-unresolved

export const command = ['serve [file]', '* [file]']

export const describe = 'Serve markdown file'

export const builder = {
  port: {
    default: 4000,
    alias: 'p'
  }
}

export function handler(argv) {
  const file = argv.file || 'README.md'
  console.log(`> Transforming ${file}`)

  const port = argv.port

  const app = express()

  app.get('/', async (req, res) => {
    res.type('html')

    try {
      const html = await render(file)
      res.send(html)
    } catch (err) {
      res.status(500)
      res.end(err.stack)
    }
  })

  app.listen(port)

  console.log(`> Open http://localhost:${port}`)
}
