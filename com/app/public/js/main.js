var prodMenu = document.getElementById('getProdMenu')

axios.get(`http://localhost:3000/product`)
.then(function (response) {
    response.data.forEach(element => {
        prodMenu.innerHTML += `<div class="col-sm-4 p-3">
            <div class="card text-left border-warning">
            <a href="#"><img class="card-img-top" src="../uploads/${element.product_image}" alt=""></a>
            <div class="card-body">
                <h4 class="card-title">${element.product_name}</h4>
                <p class="card-text">${element.price} Dhs</p>
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
        categories.innerHTML += `<a href="#">${element.categorie_id.categorie_name}</a>`  
    });
}).catch(function (err) {
    console.log(err);
});