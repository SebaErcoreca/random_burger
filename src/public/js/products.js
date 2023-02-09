document.addEventListener('DOMContentLoaded', () => {
  const addToCartButtons = document.querySelectorAll('.addToCartBtn');
  addToCartButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {

      const productID = e.target.id;

      axios({
        method: 'GET',
        url: '/api/carts/getCartID'
      }).then((res) => {
        const cartID = res.data.cartID;

        axios({
          method: 'POST',
          url: `/api/carts/${cartID}/product/${productID}`,
          data: {
            productID,
            quantity: 1
          }
        }).then((res) => {
          alert('Product added to cart')
        })
      }).catch((err) => {
        console.log(err)
      })
    })
  })
})