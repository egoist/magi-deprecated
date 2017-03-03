import magi from '../src/lib'

test('main', async () => {
  const result = await magi('# hello \n ## h2!')
  expect(result.title).toBe('hello')
})
