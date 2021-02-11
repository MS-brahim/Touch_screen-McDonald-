$(function(){

    // GET DATA TABLES 
    $.ajax({
        type:'GET',
        url:'http://localhost:3000/code_promo',
        success:function (getTables) {
            let table = $('#getPromoData');
            table.html('');

            getTables.forEach(tableRow => {
                
                table.append(`
                    <tr>
                        <td id="tabl">${tableRow.code_promo}</td>
                        <td>${tableRow.product_id.product_name}</td>
                        <td class="text-center py-0 align-middle">
                            <div class="btn-group btn-group-sm">
                                <a href="#" class="btn btn-info text-white" onclick="editTable('${tableRow._id}')"><i class="fas fa-edit"></i></a>
                                <a href="#" class="btn btn-danger text-white" onclick="deleteTable('${tableRow._id}')"><i class="fas fa-trash"></i></a>
                            </div>
                        </td>
                    </tr>
                `)
            });
        }
    });

    // GET PRODUCTS SELECT OPTION
    $.ajax({
        type: 'GET',
        url: 'http://localhost:3000/product',
        success: function(getProdData) {
            $.each(getProdData, function(i, prodPromo) {
                var $selectProd = $('#selectProd');
                $selectProd.append(`<option value="${prodPromo._id}">${prodPromo.product_name}</option>`)
            });
        },
    });

});

// ADD NEW CODE PROMO 
$('#addCodePromo').on('click', function(){
    var $codePromo = $('#codePromo');
    var $selectProd = $('#selectProd');

    if ($codePromo.val()=="") {
        $codePromo.addClass('is-invalid');
        
    } else if ($selectProd.val()=="") {
        $selectProd.addClass('is-invalid');
    } else {
            
        $.ajax({
            method:'POST',
            url:'http://localhost:3000/code_promo/add',
            data:{
                code_promo       :$codePromo.val(),
                product_id       :$selectProd.val(),
            },
            timeout: 1000,
            success:function() {
                Swal.fire({
                    icon:'success',
                    title: '<span style="color:#e0a800">Code promo has been added<span>',
                    showConfirmButton: false,
                    timer: 1500
                }).then(function() {
                    location.reload();
                });
            }
        });
    }
});