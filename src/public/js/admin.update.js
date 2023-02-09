updateProductForm.addEventListener('submit', (e) => {
    e.preventDefault()
  
    const productID = document.getElementById('idPut').value
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
        location.href = `/admin`
      })
      .catch((err) => {
        console.log(err)
      })
  })