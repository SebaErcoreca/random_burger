import express from 'express';
import ProductManager from "./src/ProductManager.js";

/* 
TODO: Desarrollar un servidor basado en express donde podamos hacer consultas a nuestro archivo de productos.
//Se instalarán las dependencias a partir del comando npm install
//Se echará a andar el servidor
//Se revisará que el archivo YA CUENTE CON AL MENOS DIEZ PRODUCTOS CREADOS al momento de su entrega, 
//es importante para que los tutores no tengan que crear los productos por sí mismos, 
//y así agilizar el proceso de tu evaluación.
//Se corroborará que el servidor esté corriendo en el puerto 8080.
//Se mandará a llamar desde el navegador a la url http://localhost:8080/products sin query, 
//eso debe devolver todos los 10 productos.
//Se mandará a llamar desde el navegador a la url http://localhost:8080/products?limit=5 , 
//eso debe devolver sólo los primeros 5 de los 10 productos.
//Se mandará a llamar desde el navegador a la url http://localhost:8080/products/2, 
//eso debe devolver sólo el producto con id=2.
//Se mandará a llamar desde el navegador a la url http://localhost:8080/products/34123123, 
//al no existir el id del producto, debe devolver un objeto con un error indicando que el producto no existe.
*/

const PORT = 8080;

const app = express();
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));

const productManager = new ProductManager();

// Root site
app.get('/', (req, res) => {
  res.send('<h1><a href="/products">Lista de Productos</a></h1>');
});

/* 
Returns a list of products set by the query parameters. 
Offset makes reference to the first index of the products list.
Limit makes reference to the max quantity of returned products. 
*/
app.get('/products', (req, res) => {
  const responseObject = {};

  const allProducts = productManager.getProducts();

  const { offset, limit } = req.query;

  const offsetNumber = Number(offset ?? 0);

  /* Check that offset value is a number. */
  if (isNaN(offsetNumber)) {
    responseObject.status = 'error';
    responseObject.error = `Error: '${offset}' is not a valid offset value.`;
    res.status(400).json(responseObject).end();
    return;
  }

  /* Check is offset is a negative number or not an integer. */
  if (offsetNumber < 0 || offsetNumber % 1 !== 0) {
    responseObject.status = 'error';
    responseObject.error = `Error: offset parameter must be a non-negative integer.`;
    res.status(400).json(responseObject).end();
    return;
  }

  const limitNumber = Number(limit ?? 0);

  /* Check if limit is a number. */
  if (isNaN(limitNumber)) {
    responseObject.status = 'error';
    responseObject.error = `Error: '${limit}' is not a valid limit value.`;
    res.status(400).json(responseObject).end();
    return;
  }

  /* Check if limit is a negative number or not an integer. */
  if (limitNumber < 0 || limitNumber % 1 !== 0) {
    responseObject.status = 'error';
    responseObject.error = 'Error: limit parameter must be a non-negative integer.';
    res.status(400).json(responseObject).end();
    return;
  }

  /* Checks if offsetNumber is less than the current collection of products. */
  if (offsetNumber < allProducts.length) {
    const lastIndex = limitNumber === 0 ? allProducts.length : Math.min(allProducts.length, (offsetNumber + limitNumber));
    const filteredProducts = allProducts.slice(offsetNumber, lastIndex);
    responseObject.status = 'success';
    responseObject.products = filteredProducts;
  } else {
    responseObject.status = 'error';
    responseObject.error = 'Error: offset value out of bounds.';
  }
  res.json(responseObject);
});

/* Returns a product searched by the productId */
app.get('/products/:id', (req, res) => {
  const responseObject = {};
  const productId = Number(req.params.id);

  /* Check if id is a number. */
  if (isNaN(productId)) {
    responseObject.status = 'error';
    responseObject.error = `Error: '${req.params.id}' is not a valid product id.`;
    res.status(400).json(responseObject).end();
    return;
  }

  try {
    const product = productManager.getProductById(productId);
    responseObject.status = 'success';
    responseObject.product = product;
  } catch (err) {
    responseObject.status = 'error';
    responseObject.error = `${err}`;
  }

  res.json(responseObject).end();
});

/* Adds a product to the productManager */
app.put('/products', (req, res) => {
  console.log('req.body', req.body);
  res.status(201).end();
});

app.listen(PORT, () => 
console.log(`[ listening on port ${PORT}: http://localhost:${PORT}/ ]👀 > `));