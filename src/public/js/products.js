const postProductForm = document.getElementById('postProductForm')
const deleteProductForm = document.getElementById('deleteProductForm')
const updateProductForm = document.getElementById('updateProductForm')

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
      console.log(res.data, res.status)
      e.target.reset()
    })
    .catch((err) => {
      console.log(err)
    })
})

deleteProductForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const productID = document.getElementById('productID').value

  axios({
    method: 'delete',
    url: `/api/products/${productID}`,
  })
    .then((res) => {
      console.log(res.data, res.status)
      e.target.reset()
    })
    .catch((err) => {
      console.log(err)
    })
})

updateProductForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const productID = document.getElementById('productIDPut').value
  const title = document.getElementById('titlePut').value
  const description = document.getElementById('descriptionPut').value
  const price = document.getElementById('pricePut').value
  const stock = document.getElementById('stockPut').value
  const code = document.getElementById('codePut').value
  const category = document.getElementById('categoryPut').value
  const status = document.getElementById('statusPut').checked

  const data = {}

  data.productID = productID
  if (title) data.title = title
  if (description) data.description = description
  if (price) data.price = price
  if (stock) data.stock = stock
  if (code) data.code = code
  if (category) data.category = category
  if (status) data.status = status

  axios({
    method: 'put',
    url: `/api/products/${productID}`,
    data,
  })
    .then((res) => {
      console.log(res.data, res.status)
      e.target.reset()
    })
    .catch((err) => {
      console.log(err)
    })
})
