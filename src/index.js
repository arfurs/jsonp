const fn = () => {
  console.log('Hello, World')
}

const p = new Promise(resolve => {
  resolve('Success')
})

const asyncFn = async() => {
  const res = await p()
  return res
}

asyncFn().then(res => {
  console.log(res)
})