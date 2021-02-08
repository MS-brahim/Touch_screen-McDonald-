$(function(){

    // GET DATA TABLES 
    $.ajax({
        type:'GET',
        url:'http://localhost:3000/table',
        success:function (getTables) {
            let table = $('#GetDataTableService');
            table.html('');

            getTables.forEach(tableRow => {
                var $tabSts=[];
                if (tableRow.status_table==true) {
                    $tabSts= '<span class="badge badge-success">Available</span>';
                } else if(tableRow.status_table==false){
                    $tabSts= '<span class="badge badge-danger">Unavailable</span>';
                }else{
                    $tabSts= '<span class="badge badge-secondary">Null</span>';
                }
                table.append(`
                    <tr>
                        <td>${tableRow.table}</td>
                        <td>${$tabSts}</td>
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


});

// ADD NEW SERVICE TABLE 
$('#addTable').on('click', function(){
    var $tableMatricul = $('#tableMatricul');
    var $tableStatus = $('#tableStatus');
    var $helpTable = $('#helpTableMatricul');

    if ($tableMatricul.val()=="") {
        $tableMatricul.addClass('is-invalid');
        $helpTable.html('This field is required!!')
    } else {
            
        $.ajax({
            method:'POST',
            url:'http://localhost:3000/table/add',
            data:{
                table       :$tableMatricul.val(),
                status_table:$tableStatus.val()
            },
            timeout: 1000,
            success:function() {
                Swal.fire({
                    icon:'success',
                    title: '<span style="color:#e0a800">Table has been added<span>',
                    showConfirmButton: false,
                    timer: 1500
                }).then(function() {
                    location.reload();
                });
            }
        });
    }
});

// DELETE TABLE 
function deleteTable(id) {
    $.ajax({
        method: 'DELETE',
        url: 'http://localhost:3000/table/delete/'+id,
        success:function() {
            Swal.fire({
                icon: 'success',
                title: '<span style="color:#e0a800">Table has been deleted<span>',
                showConfirmButton: false,
                timer: 1500
            }).then(function() {
                location.reload();
            });
        },
        timeout: 1000
    });
};

// EDIT TABLE STATUS 
function editTable(id) {
    fetch('http://localhost:3000/table/'+id)
    .then(response => response.json())
    .then(data => data.map(ok=>{
    
        Swal.fire({
        title: 'Enter your IP address',
        input: 'text',
        inputLabel: 'Your IP address',
        inputValue: ok.table,
        showCancelButton: true,
        }) 
    }).join(''))
      
    // $.ajax({
    //     method: 'PATCH',
    //     url: 'http://localhost:3000/table/update/'+id,
    //     success:function(response){
    //         $('#tableStatus').val(response);
    //         location.reload();
    //     },
    //     timeout: 1000
    // })
}

