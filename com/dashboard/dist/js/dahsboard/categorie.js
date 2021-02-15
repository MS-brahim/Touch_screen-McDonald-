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

})

// add new category 
$("#addCateg").click(function(){
    $("#formCateg").slideToggle("slow");
});  
var $categoryName = $('#categorie_name');
$('#add_categrie').on('click', function(e){
    
    if ($categoryName.val()=="") {
        $categoryName.addClass('is-invalid');
        e.preventDefault();
    } else {
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
            timeout: 1000
        })
    }
});

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
        },
        timeout: 1000
    })
}

// update category 
function updateCategory(categ_id) {
    console.log(categ_id)
    
    $("#formCateg").show("slow");
    $('#add_categrie').replaceWith('<input type="submit" id="edit_categrie" class="form-control btn btn-dark w-50 mt-3" value="Save Change">')
    $.ajax({
        method: 'GET',
        url: 'http://localhost:3000/categorie/'+categ_id,
        success:function(data){
            $categoryName.val(data.categorie_name);
            $('#edit_categrie').on('click', function(){
    
                $.ajax({
                    method:'PATCH',
                    url:'http://localhost:3000/categorie/update/'+categ_id,
                    data: {
                        categorie_name:$categoryName.val()
                    },
                    success:function(){
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'Categorie has been Updated',
                            showConfirmButton: false,
                            timer: 1500
                        }).then(function() {
                            location.reload();
                        });
                    },
                    timeout: 1000
                })
                
            });
        }
    })

}

