const postProductForm = document.getElementById('postProductForm')
const deleteProductForm = document.getElementById('deleteProductForm')

postProductForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const title = document.getElementById('title').value
  const description = document.getElementById('description').value
  const price = document.getElementById('price').value
  const stock = document.getElementById('stock').value
  const code = document.getElementById('code').value
  const category = document.getElementById('category').value
  const status = document.getElementById('status').checked

  axios({
    method: 'post',
    url: '/api/products',
    data: {
      title,
      description,
      price,
      stock,
      code,
      category,
      status,
    },
  })
    .then((res) => {
      e.target.reset()
    })
    .catch((err) => {
      console.log(err)
    })
})

deleteProductForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const productID = document.getElementById('productIDDel').value

  axios({
    method: 'delete',
    url: `/api/products/${productID}`,
  })
    .then((res) => {
      e.target.reset()
    })
    .catch((err) => {
      console.log(err)
    })
})