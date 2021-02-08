$(function () {
    var $getCategory = $('#getCategory');

    $.ajax({
        type: 'GET',
        url: 'http://localhost:3000/categorie',
        success: function(getCategory) {
            $.each(getCategory, function(i, categoryRow) {
                $getCategory.append(`<tr>
                <td id="catName"> ${categoryRow.categorie_name}</td>
                <td class="text-center py-0 align-middle">
                    <div class="btn-group btn-group-sm">
                        <a type="button" onclick="updateCategory('${categoryRow._id}')" class="btn btn-info text-white">edit</a>
                        <a type="button" onclick="deleteCategory('${categoryRow._id}')" class="btn btn-danger text-white">del</a>
                    </div>
                </td></tr>`)
            });
        }
    });

    // add new category 
    $("#addCateg").click(function(){
        $("#formCateg").slideToggle("slow");
    });
       
    $('#add_categrie').on('click', function(){
        var $categoryName = $('#categorie_name');

        $.post({
            method:'POST',
            url:'http://localhost:3000/categorie/add',
            data: {
                categorie_name:$categoryName.val()
            },
            success:function(){
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Categorie has been saved',
                    showConfirmButton: false,
                    timer: 1500
                }).then(function() {
                    location.reload();
                });
            },
        })
    });
})

// delete category
function deleteCategory(categ_id) {
    $.ajax({
        method: 'DELETE',
        url: 'http://localhost:3000/categorie/delete/'+categ_id,
        success:function(){
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Categorie has been deleted',
                showConfirmButton: false,
                timer: 1500
            }).then(function() {
                location.reload();
            });
        }
    })
}

// update category 
function updateCategory(categ_id) {
    $.ajax({
        method: 'PATCH',
        url: 'http://localhost:3000/categorie/update/'+categ_id,
        success:function(data){
            $('#categorie_name').val(data.$categoryName);
            location.reload();
        }
    })
}

