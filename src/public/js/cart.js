const emtpyCartBtn = document.getElementById('emtpyCartBtn');
const removeProductBtns = document.querySelectorAll('.removeFromCartBtn');

document.addEventListener('DOMContentLoaded',() => {
  if (emtpyCartBtn) {
    emtpyCartBtn.addEventListener('click', () => {

      axios({
        method: 'GET',
        url: '/api/carts/getCartID'
      }).then((res) => {
        const cartID = res.data.cartID;
        console.log(cartID)
        axios({
            method: 'delete',
            url: `/api/carts/${cartID}`
        }).then((res) => {
          alert('Cart emptied!');
        })

      })
    })
  }

  if (removeProductBtns) {
    removeProductBtns.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const productID = e.target.id.substring(0, e.target.id.indexOf('-'));
        console.log(productID)
        axios({
          method: 'GET',
          url: '/api/carts/getCartID'
        }).then((res) => {
          const cartID = res.data.cartID;
          axios({
            method: 'delete',
            url: `/api/carts/${cartID}/product/${productID}`
          }).then((res) => {
            alert('Product removed from cart. TODO: botones + y - para modificar la cantidad.');
          })
        })
      })
    })
  }

})