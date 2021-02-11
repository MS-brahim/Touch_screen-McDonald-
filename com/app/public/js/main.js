var prodMenu = document.getElementById('getProdMenu')

axios.get(`http://localhost:3000/product`)
.then(function (response) {
    response.data.forEach(element => {
        localStorage.setItem('prod',element.sous_categorie_id.sous_categorie_name);
        prodMenu.innerHTML += `<div class="col-sm-4 p-3">
            <div class="card text-left border-warning">
            <a href="order.html?product_name=${element.product_name}"><img class="card-img-top" src="../uploads/${element.product_image}" alt=""></a>
            <div class="card-body">
                <h4 class="card-title">${element.product_name}</h4>
                <p class="card-text">${element.price} Dhs</p>
                <p class="card-text">${element.sous_categorie_id.sous_categorie_name}</p>
            </div>
            </div>  
        </div>`  
    });
}).catch(function (err) {
    console.log(err);
});

// GET CATEGORIE AND SOUS CATEGORIE MENU 
var categories = document.getElementById('getCategMenu');
axios.get(`http://localhost:3000/sous_categorie`)
.then(function (response) {
    response.data.forEach(element => {
        localStorage.setItem('sous',element.sous_categorie_name);
        if (element.sous_categorie_name) {
            categories.innerHTML += `<a href="#" id="sideSousCate" onclick="filterProductBySousCategory()">${element.sous_categorie_name}</a>`;

        }
    });
}).catch(function (err) {
    console.log(err);
});

function filterProductBySousCategory() {
    
}
console.log(localStorage.getItem('sous'))
console.log(localStorage.getItem('prod'))
