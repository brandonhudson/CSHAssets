$(function () {
    var clipboard = new Clipboard('.btn-copy');

    clipboard.on('success', function(e) {


        e.clearSelection();
    });

    clipboard.on('error', function(e) {
        alert("Error copying asset!");
        console.error('Action:', e.action);
        console.error('Trigger:', e.trigger);
    });

});

function showSuccess(data){
    
    $("#uploadContainer").hide();
    $("#successUploadContainer").show();
    $("#uploadSubmit").hide();
    
    if(data.name.indexOf('.js') > -1){
            url =  "resources/images/js.png";
        }
        else if(data.name.indexOf('.css') > -1){
            url =  "resources/images/css.png";
        }
        else if(data.name.indexOf('.php') > -1){
            url =  "resources/images/js.php";
        }
        else if(data.name.indexOf('.html') > -1){
            url =  "resources/images/html.png";
        }
        else if(data.name.indexOf('.png') > -1 || data.name.indexOf('.jpg') > -1 || data.name.indexOf('.jpeg') > -1 || data.name.indexOf('.gif') > -1 || data.name.indexOf('.svg') > -1 || data.name.indexOf('.pdf') > -1){
            url =  "https://assets.csh.rit.edu/uploads/"+data.name;
        }
        else{
            url =  "resources/images/unknown.png";
        }
        hash = data.asset_hash;
    $("#successImage").attr("src",url);
    $("#successSHAClipboard").attr("data-clipboard-text",""+hash); //FIX THIS!
    $("#successURLClipboard").attr("data-clipboard-text","https://assets.csh.rit.edu/uploads/"+data.name);
    $("#successURL").val("https://assets.csh.rit.edu/uploads/"+data.name);
    $("#successSHA").val(data.asset_hash);
}

function showError(data){
    data = '<div class="alert alert-danger" role="alert">'+data+'</div>';
    $("#errorUploadContainer").html(data);
    $("#uploadContainer").hide();
    $("#errorUploadContainer").show();
    $("#uploadSubmit").hide();
    
}
    

/* Profile Form Submission */
$("#uploadForm").submit(function(event){
    event.preventDefault();
    var URL = '/upload';
    
    var formData = new FormData($(this)[0]);

    $.ajax({
        url: URL,
        type: 'POST',
        data: formData,
        async: false,
        success: function (data) {
            showSuccess(data);
            console.log(data);
        },
        error: function (data,status){
            
            if(data.status == 409){
                data = "Error - File Already Exists.";
            }
            else{
                data = "Error - Internal Server Error.";
            }
        
            showError(data);
        },
        cache: false,
        contentType: false,
        processData: false
    });

    return false;
    
});

$('#uploadModal').on('hidden.bs.modal', function (e) {
    $("#uploadContainer").show();
    $("#successUploadContainer").hide();
    $("#errorUploadContainer").html("");
    $("#errorUploadContainer").hide();
    $("#uploadSubmit").show();
    $("#successImage").attr("src","");
    $("#successSHAClipboard").attr("data-clipboard-text","")
    $("#successURLClipboard").attr("data-clipboard-text","")
    $("#successURL").val("");
    $("#successSHA").val("");
    $("#common_name").val("");
    $("#description").val("");
    $("#file").val("");
    
})