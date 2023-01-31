const socket = io()

socket.on('reloadList', (data) => {
  updateList(data)
})

socket.on('welcome', (data) => {
  console.log(data)
})

const listContainer = document.getElementById('listContainer')

const updateList = (list) => {
  listContainer.innerHTML = ''
  list.forEach((prod) => {
    const product = document.createElement('div');
    product.setAttribute('style', 'width: 18rem;');
		product.setAttribute('class', 'card');
    product.innerHTML = `
													<img src="https://shoptheoldemercantile.com/image/cache/catalog/placeholderproduct-500x500.png" class="card-img-top" alt="...">
													<div class="card-body justify-content-center d-flex flex-column">
														<h5 class="card-title">${prod.title}</h5>
														<p class="card-text">${prod.description}</p>
														<p class="card-text">Price: ${prod.price}</p>
														<p class="card-text">id: ${prod._id}</p>
														<p class="card-text">code :${prod.code}</p>
														<p class="card-text">Stock:${prod.stock}</p>
														<a href="#" class="btn btn-primary">Add to cart</a>
													</div>
												`
    listContainer.appendChild(product)
  })
}
