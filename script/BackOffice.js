import { Product, getData, updateData, postData } from '../ManageProduct.js'



//*Function to set the image field
function setImageField() {
  let root = document.getElementById('root');
  let imageUrl = document.getElementById('imageInput');
  let empty = document.getElementById('empty');

  root.innerHTML = '';

  let image = document.createElement('img');
  image.src = imageUrl.value;

  image.addEventListener('error', () => {
    root.innerHTML = '';
    empty.classList.remove('d-none');
    root.classList.add('d-none');
  });

  image.addEventListener('load', () => {
    empty.classList.add('d-none');
    root.classList.remove('d-none');
    root.appendChild(image);
  });

  if (imageUrl.value === '') {
    root.innerHTML = '';
    empty.classList.remove('d-none');
  }
  
  imageUrl.addEventListener('input', setImageField);
  imageUrl.addEventListener('keyup', setImageField);
}


//*Function get value from the form and POST data to the server using postData function and Product class in ManageProduct.js
function getFormValue() {
  event.preventDefault();

  let imageUrl = document.getElementById('imageInput');
  let form = document.getElementById('form');
  let button = form.querySelector('button');

  let name = document.getElementById('name').value;
  let description = document.getElementById('description').value;
  let price = document.getElementById('price').value;
  let brand = document.getElementById('brand').value;
  let image = imageUrl.value;

  //*Post data to the server function in ManageProduct.js also Product class
  let product = new Product(name, description, brand, image, price);
  postData(product);
  form.style.opacity = 0.7;
  button.innerHTML = ' <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span> Loading...'
  button.style.opacity = 1;

  setTimeout(() => {
    button.innerHTML = 'Add product!'
    form.style.opacity = 1;
    form.reset();
    renderTable();
    setImageField();
  }, 2000);
}





//*Funtion to edit the table this function call the four CRUD operation PUT GET POST DELETE and the Product class in the ManageProduct.js
function editShop() {
  let table = document.getElementById('table');//*Table to edit the shop
  let edit = document.getElementById('edit');//*Icon to edit the shop
  let submitButton = document.getElementById('submit');//*Button to submit the changes
  let close = document.getElementById('close');//*Icon to close the edit mode
  let load = document.getElementById('load');//*Icon to load the edit mode
  let search = document.getElementById('search');//*Icon to search the product



  //*Search the product in the table from every field
  search.addEventListener('input',async () => {
    await getData().then(data => {
      table.innerHTML = '';
      let searchValue = search.value.toLowerCase()
      data.forEach(product => {
        if (product.name.toLowerCase().includes(searchValue.toLowerCase()) || 
            product.description.toLowerCase().includes(searchValue.toLowerCase()) ||
            product.brand.toLowerCase().includes(searchValue.toLowerCase())
        ) {
          let newProduct = new Product(product.name, product.description, product.brand, product.imageUrl, product.price);
          table.appendChild(newProduct.getEditTable());
        }
      });
    });
  });


  //*Close the edit mode
  close.addEventListener('click', () => {
    close.classList.add('d-none');
    submitButton.classList.add('d-none');
    search.classList.add('d-none');
    edit.classList.remove('d-none');
    renderTable();
  });


  //*Submit the changes take the value of the input and update the data whir updateData function in ManageProduct.js
  submitButton.addEventListener('click',() => {
    table.style.opacity = 0.5;
    load.classList.remove('d-none');

    setTimeout(() => {
      table.style.opacity = 1;
      load.classList.add('d-none');
      const updatedProducts = [];
      const rows = table.getElementsByTagName('tr');
      console.log(rows);
      for (let i = 0; i < rows.length; i++) {
        const inputs = rows[i].getElementsByTagName('input');
        const id = rows[i].getAttribute('data-id');
        const name = inputs[0].value;
        const description = inputs[1].value;
        const brand = inputs[2].value;
        const price = inputs[3].value;
        const imageUrl = inputs[4].value;

        const product = new Product(name, description, brand, imageUrl, price);
        product.setId(id);
        updatedProducts.push(product);
      }
      updateData(updatedProducts);
      submitButton.classList.add('d-none');
      close.classList.add('d-none');
      search.classList.add('d-none');
      edit.classList.remove('d-none');
      renderTable();
    }, 2000);
  });

  //*Open the edit mode
  edit.addEventListener('click',() => {
    edit.classList.add('d-none');
    close.classList.remove('d-none');
    submitButton.classList.remove('d-none');
    search.classList.remove('d-none');
    table.innerHTML = '';
    rederEditTable();
  });
}


//*GET data for create editable table
async function rederEditTable() {
  await getData().then(data => {
    data.forEach(product => {
      let newProduct = new Product(product.name, product.description, product.brand, product.imageUrl, product.price);
      newProduct.setId(product._id); // Imposta l'ID del prodotto
      let editTable = newProduct.getEditTable();
      table.appendChild(editTable);
    });
  });
}


//*GET data for create table
function renderTable() {
  let table = document.getElementById('table');
  table.innerHTML = '';
  getData().then(data => {
    data.forEach(product => {
      let newProduct = new Product(product.name, product.description, product.brand, product.imageUrl, product.price);
      table.appendChild(newProduct.getTable());
    });
  });
}


//*Main function load for first
function main() {
  let form = document.getElementById('form');
  form.addEventListener('submit', getFormValue);
  setImageField();
  editShop();
  renderTable();
}


window.onload = main;