$(function () {

    // GET CATEGORIES SELECT OPTION
    var $selectCateg = $('#selectCateg');
    $.ajax({
        type: 'GET',
        url: 'http://localhost:3000/categorie',
        success: function(getCategory) {
            $.each(getCategory, function(i, categoryRow) {
                $selectCateg.append(`<option value="${categoryRow._id}">${categoryRow.categorie_name}</option>`)
            });
        },
    });

    // GET SOUS CATEGORIES TABLE
    var $sousCateg = $('#getSousCategory');

    $.ajax({
        type: 'GET',
        url: 'http://localhost:3000/sous_categorie',
        success: function(sousCategory) {
            $.each(sousCategory, function(i, rowSC) {
                let categName;
                if (rowSC.categorie_id===undefined) {
                    categName="<b>-</b>";
                }else{
                    categName=rowSC.categorie_id.categorie_name
                }
                $sousCateg.append(`<tr>
                        <td>${rowSC.sous_categorie_name}</td>
                        <td>${categName}</td>
                        <td class="text-center py-0 align-middle">
                            <div class="btn-group btn-group-sm">
                                <a type="button" class="btn btn-info text-white"><i class="fas fa-edit"></i></a>
                                <a type="button" class="btn btn-danger text-white" onclick="deleteSousCategory('${rowSC._id}')"><i class="fas fa-trash"></i></a>
                            </div>
                        </td>
                    </tr>
                `)
            });
        },
    });

    // ADD NEW SOUS CATEGORIE        
    $('#add_sous_categ').on('click', function(){
        var $sCateg_name = $('#sCateg_name');
        var $selectCateg = $('#selectCateg');

        $.post({
            method:'POST',
            url:'http://localhost:3000/sous_categorie/add',
            data: {
                sous_categorie_name :$sCateg_name.val(),
                categorie_id   :$selectCateg.val()
            },
            success:function(){
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: '<span style="color:#138496">Sous categorie has been saved<span>',
                    showConfirmButton: false,
                    color: '#17a2b8',
                    timer: 1500
                }).then(function() {
                    location.reload();
                });
            },
        })
    });
})

// DELETE SOUS CATEGORIE
function deleteSousCategory(id) {
    $.ajax({
        method: 'DELETE',
        url: 'http://localhost:3000/sous_categorie/delete/'+id,
        success:function(){
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: '<span style="color:#138496">Sous categorie has been deleted<span>',
                showConfirmButton: false,
                timer: 1500
            }).then(function() {
                location.reload();
            });
        }
    })
}