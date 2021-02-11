$(function () {
    $.ajax({
        type: 'GET',
        url: 'http://localhost:3000/product',
        success: function(products) {
            let getProd = $('#getProduct');
            getProd.html('');
            products.forEach(prodRow => {
                let scIsN = prodRow.sous_categorie_id;
                let prodCat="";
                if (scIsN.sous_categorie_name=="") {

                    prodCat = prodRow.sous_categorie_id.categorie_id.categorie_name;
                }
                if (scIsN.sous_categorie_name!="") {

                    prodCat = prodRow.sous_categorie_id.categorie_id.categorie_name +'('+prodRow.sous_categorie_id.sous_categorie_name+')';
                }
                
                getProd.append(`
                <tr>
                    <td><img src="uploads/${prodRow.product_image}" alt="" width="100"></td>
                    <td>${prodRow.product_name}</td>
                    <td>${prodRow.price} Dhs</td>
                    <td>${prodCat}</td>
                    <td class="text-center py-0 align-middle">
                        <div class="btn-group btn-group-sm">
                            <a href="#" class="btn btn-info"><i class="fas fa-edit"></i></a>
                            <a href="#" class="btn btn-danger text-white" onclick="deleteProd('${prodRow._id}')"><i class="fas fa-trash"></i></a>
                        </div>
                    </td>
                </tr>
                `)
            });
        }
    });
});

// GET CATEGORIES SELECT OPTION
var $selectSousCateg = $('#sousCategID');
$.ajax({
    type: 'GET',
    url: 'http://localhost:3000/sous_categorie',
    success: function(getSCategory) {
        $.each(getSCategory, function(i, sCategoryRow) {
            let selectSC;
            if (sCategoryRow.sous_categorie_name=="") {
                selectSC = sCategoryRow.categorie_id.categorie_name;
            } else {
                selectSC = sCategoryRow.sous_categorie_name;
            }
            $selectSousCateg.append(`<option value="${sCategoryRow._id}">${selectSC}</option>`)
        });
    },
});

// add new product        
$('#add_product').on('click', function(e){
    let $productName = $('#productName');
    let $productPrice = $('#productPrice');
    let $sousCategID = $('#sousCategID');
    let $productImage = $('#productImage');


    if ($productName.val()=="") {
        e.preventDefault();
        $productName.addClass('is-invalid');

    } else if ($productPrice.val()=="") {
        e.preventDefault();
        $productPrice.addClass('is-invalid');
    }
    else if ($sousCategID.val()=="") {
        e.preventDefault();
        $sousCategID.addClass('is-invalid');

    } else if ($productImage.val()=="") {
        e.preventDefault();
        $productImage.addClass('is-invalid');
    } else {
        
        $.post({
            method:'POST',
            url:'http://localhost:3000/product/add',
            processData: true,
            data: {
                product_name        :$productName.val(),
                price               :$productPrice.val(),
                sous_categorie_id   :$sousCategID.val(),
                product_image       :$productImage.val(),
            },
            success:function(){
                Swal.fire({
                    icon: 'success',
                    title: '<span style="color:#e0a800">Product has been saved<span>',
                    showConfirmButton: false,
                    timer: 1500
                }).then(function() {
                    location.reload();
                });
            },
        })   
    }
});

// DELETE PRODUCT
function deleteProd(id) {
    $.ajax({
        method: 'DELETE',
        url: 'http://localhost:3000/product/delete/'+id,
        success:function(){
            Swal.fire({
                icon: 'success',
                title: '<span style="color:#e0a800">Product has been deleted<span>',
                showConfirmButton: false,
                timer: 1500
            }).then(function() {
                location.reload();
            });
        }
    })
}

function uploadImg(im) {
    im.replace('C:\\fakepath\\','');
 }