import { Product, getData } from '../ManageProduct.js';


//*Function to get the id from the URL and GET related data from the API 
if(window.location.search){
    let details = new URLSearchParams(window.location.search);
    let id = details.get('id');
    console.log(id);
    getData(id).then(data => {
        let product = new Product(data.name, data.description, data.brand, data.imageUrl, data.price);
        product.getDetails();
        let root = document.getElementById('root');
        root.appendChild(product.getDetails());
    });
}