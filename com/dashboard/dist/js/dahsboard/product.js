$(function () {

    // GET CATEGORIES SELECT OPTION
    var $selectSousCateg = $('#sousCategID');
    $.ajax({
        type: 'GET',
        url: 'http://localhost:3000/sous_categorie',
        success: function(getSCategory) {
            $.each(getSCategory, function(i, sCategoryRow) {
                $selectSousCateg.append(`<option value="${sCategoryRow._id}">${sCategoryRow.sous_categorie_name}</option>`)
            });
        },
    });

    $.ajax({
        type: 'GET',
        url: 'http://localhost:3000/product',
        success: function(products) {
            let getProd = $('#getProduct');
            getProd.html('');
            products.forEach(prodRow => {
                
                getProd.append(`
                <tr>
                    <td><img src="uploads/${prodRow.product_image}" alt="" width="100"></td>
                    <td>${prodRow.product_name}</td>
                    <td>${prodRow.price}</td>
                    <td>${prodRow.sous_categorie_id.sous_categorie_name}</td>
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

    // add new product        
    $('#add_product').on('click', function(){
        var $productName = $('#productName');
        var $productPrice = $('#productPrice');
        var $sousCategID = $('#sousCategID');
        var $productImage = $('#productImage');

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
    });
})

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