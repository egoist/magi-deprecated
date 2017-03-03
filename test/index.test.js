import magi from '../src'

test('main', async () => {
  const result = await magi('# hello \n !')
  console.log(result)
})
