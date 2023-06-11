import { Product, getData } from '../ManageProduct.js'


//*Function to render all the datas from the API using the Product class and the getData function in ManageProduct.js
function renderData() {
  let table = document.getElementById('root');
  table.innerHTML = '';
  getData().then(data => {
    data.forEach(product => {
      let newProduct = new Product(product.name, product.description, product.brand, product.imageUrl, product.price);
      newProduct.setId(product._id); // Imposta l'ID del prodotto
      table.appendChild(newProduct.getCard());
    });
  });
}

window.onload =renderData();
