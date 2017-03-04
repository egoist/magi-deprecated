import magi from '../src/lib'

test('main', async () => {
  const result = await magi(`
  # title

  > desc

<!-- @magi
github: egoist/magi
-->

  ## sec title

  `)
  expect(result.title).toBe('title')
})
