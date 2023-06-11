//*This file contains all the functions whit CRUD operations and classe for build a product

const authorization = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDdlM2MxNmI5YzBmNzAwMTQ0ODRlZDgiLCJpYXQiOjE2ODU5OTQ1MTgsImV4cCI6MTY4NzIwNDExOH0.LEPOkg4FRQJnMTOp6d2K81Gl3xMjSRS-XrPLrkXvq-I";


//*Function to get data from the API if the params is not null it will return the data of the product with the id passed as params else it will return all the data
export async function getData(params) {
    if (params) {
        let request = await fetch(`https://striveschool-api.herokuapp.com/api/product/${params}`, {
            method: 'GET',
            headers: { 'Authorization': authorization }
        });
        let data = await request.json();
        return data;
    } else {
        let request = await fetch('https://striveschool-api.herokuapp.com/api/product/', {
            method: 'GET',
            headers: { 'Authorization': authorization }
        });
        let data = await request.json();
        return data;
    }
}


//*Function to post data to the API
export async function postData(product) {
    let request = await fetch('https://striveschool-api.herokuapp.com/api/product/', { method: 'POST', headers: { 'Authorization': authorization, 'Content-Type': 'application/json' }, body: JSON.stringify(product) });
    return request;
}


//*Function to delete data from the API
export async function deleteData(id) {
    let request = await fetch(`https://striveschool-api.herokuapp.com/api/product/${id}`, { method: 'DELETE', headers: { 'Authorization': authorization } });
    return request;
}


//*Function to update data from the API
export async function updateData(updatedProducts) {
    updatedProducts.forEach(product => {
        let request = fetch(`https://striveschool-api.herokuapp.com/api/product/${product._id}`, {
            method: 'PUT',
            headers: {
                'Authorization': authorization,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product)
        });
        return request;
    })
}



//*Class Product
export class Product {
    constructor(name, description, brand, imageUrl, price) {
        this.name = name;
        this.description = description;
        this.imageUrl = imageUrl;
        this.price = price;
        this.brand = brand;
        this._id = null;
    }

    //*Set Id for run the function updateProduct and deleteProduct
    setId(id) {
        this._id = id;
    }

    //*Get a structure of a card Bootstrap
    getCard() {
        let card = document.createElement('div');
        card.classList.add('card', 'm-3', 'col-12', 'col-md-6', 'col-lg-3');
        let img = document.createElement('img');
        img.src = this.imageUrl;
        img.classList.add('card-img-top');
        img.alt = this.name;
        card.appendChild(img);
        let cardBody = document.createElement('div');
        cardBody.classList.add('card-body');
        let cardTitle = document.createElement('h5');
        cardTitle.classList.add('card-title');
        cardTitle.innerText = this.name;
        cardBody.appendChild(cardTitle);
        let cardText = document.createElement('p');
        cardText.classList.add('card-text');
        cardText.innerText = this.description;
        cardBody.appendChild(cardText);
        let cardFooter = document.createElement('div');
        cardFooter.classList.add('card-footer');
        let cardPrice = document.createElement('h2');
        cardPrice.classList.add('text-muted');
        cardPrice.innerText = this.price + '€';
        let details = document.createElement('a');
        details.innerHTML = '<i class="fa-solid fa-ellipsis"></i>';
        details.target = '_blank';
        details.href = 'detailsProduct.html?id=' + this._id;
        cardFooter.appendChild(details);
        cardFooter.appendChild(cardPrice);
        card.appendChild(cardBody);
        card.appendChild(cardFooter);
        return card
    }


    //*Get a structure of a table
    getTable() {
        let tr = document.createElement('tr');
        let tdName = document.createElement('td');
        tdName.innerText = this.name;
        tr.appendChild(tdName);
        let tdDescription = document.createElement('td');
        tdDescription.innerText = this.description;
        tr.appendChild(tdDescription);
        let tdBrand = document.createElement('td');
        tdBrand.innerText = this.brand;
        tr.appendChild(tdBrand);
        let tdPrice = document.createElement('td');
        tdPrice.innerText = this.price + '€';
        tr.appendChild(tdPrice);
        let tdImage = document.createElement('td');
        let p = document.createElement('p');
        p.innerText = this.imageUrl;
        p.classList.add('truncate-text');
        let divImage = document.createElement('div');
        divImage.id = 'imageUrlPreview';
        tdImage.appendChild(p);
        tdImage.addEventListener('mouseover', () => {
            let img = document.createElement('img');
            img.src = this.imageUrl;
            divImage.appendChild(img);
        });
        tdImage.addEventListener('mouseout', () => {
            divImage.innerHTML = '';
            divImage.appendChild(p);
        });
        tdImage.appendChild(divImage);
        tr.appendChild(tdImage);
        return tr;
    }


    //*Get a structure of a table for edit
    getEditTable() {
        let tr = document.createElement('tr');
        tr.classList.add('edit-tr');
        tr.setAttribute('data-id', this._id);//* Add data-id attribute to tr


        let tdName = document.createElement('td');
        let inputName = document.createElement('input');
        inputName.type = 'text';
        inputName.value = this.name;
        tdName.appendChild(inputName);
        tr.appendChild(tdName);
        let tdDescription = document.createElement('td');
        let inputDescription = document.createElement('input');
        inputDescription.type = 'text';
        inputDescription.value = this.description;
        tdDescription.appendChild(inputDescription);
        tr.appendChild(tdDescription);
        let tdBrand = document.createElement('td');
        let inputBrand = document.createElement('input');
        inputBrand.type = 'text';
        inputBrand.value = this.brand;
        tdBrand.appendChild(inputBrand);
        tr.appendChild(tdBrand);
        let tdPrice = document.createElement('td');
        let inputPrice = document.createElement('input');
        inputPrice.type = 'text';
        inputPrice.value = this.price;
        inputPrice.classList.add('input-price');
        inputPrice.type = 'number';
        tdPrice.appendChild(inputPrice);
        tr.appendChild(tdPrice);
        let tdImage = document.createElement('td');
        let inputImage = document.createElement('input');
        inputImage.type = 'text';
        inputImage.value = this.imageUrl;
        tdImage.appendChild(inputImage);
        tr.appendChild(tdImage);

        let trash = document.createElement('td');
        let trashIcon = document.createElement('i');
        trashIcon.classList.add('fa-solid', 'fa-trash');
        trashIcon.addEventListener('click', () => {
            deleteData(this._id);
            tr.remove();
        });

        trash.appendChild(trashIcon);
        tr.appendChild(trash);
        return tr;
    }

    getDetails(){
        let divCard = document.createElement('div');
        divCard.classList.add('card', 'col-10',);
        let cardBody = document.createElement('div');
        cardBody.classList.add('card-body');
        let h5 = document.createElement('h5');
        h5.classList.add('card-title');
        h5.innerText = this.name;
        cardBody.appendChild(h5);
        let p = document.createElement('p');
        p.classList.add('card-text');
        p.innerText = this.description;
        cardBody.appendChild(p);
        let pBrand = document.createElement('p');
        pBrand.classList.add('card-text');
        pBrand.innerText = this.brand;
        cardBody.appendChild(pBrand);
        let pPrice = document.createElement('p');
        pPrice.classList.add('card-text');
        pPrice.innerText = this.price + '€';
        cardBody.appendChild(pPrice);
        let img = document.createElement('img');
        img.src = this.imageUrl;
        img.classList.add('card-img-top');
        img.alt = this.name;
        divCard.appendChild(img);
        divCard.appendChild(cardBody);
        return divCard;
    }
}


