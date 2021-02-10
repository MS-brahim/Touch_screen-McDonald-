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
                        <td>$</td>
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