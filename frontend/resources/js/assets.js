$(document).ready(function(){
    
    $.material.init()
$('.btn-copy').tooltip()

$('.btn-copy').click(function(){
    newValue = "Copied!";
    oldValue = "Copy to Clipboard";
   $(this).tooltip('hide')
          .attr('data-original-title', newValue)
          .tooltip('fixTitle')
          .tooltip('show').attr('data-original-title', oldValue)
          .tooltip('fixTitle'); 
    
});


var clipboard = new Clipboard('.btn');

clipboard.on('success', function(e) {
    

    e.clearSelection();
});

clipboard.on('error', function(e) {
    alert("Error copying asset!");
    console.error('Action:', e.action);
    console.error('Trigger:', e.trigger);
});


var is_chrome = navigator.userAgent.indexOf('Chrome') > -1;
var is_explorer = navigator.userAgent.indexOf('MSIE') > -1;
var is_firefox = navigator.userAgent.indexOf('Firefox') > -1;
var is_safari = navigator.userAgent.indexOf("Safari") > -1;
var is_opera = navigator.userAgent.toLowerCase().indexOf("op") > -1;
if ((is_chrome)&&(is_safari)) {is_safari=false;}
if ((is_chrome)&&(is_opera)) {is_chrome=false;}

if (is_safari) $('.btn-copy').hide();
})




    

