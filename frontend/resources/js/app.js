



var app = angular.module('CSHAssets', []);

app.controller('assetController', function ($scope, $http) {
    $http.get('/list_files')
    .success(function(data, status, headers, config) {
        console.log(data.files); //debug
        $scope.data = data.files;
        
  })
  .error(function(data, status, headers, config) {   
        alert("Cannot get assets.") //debug
    // called asynchronously if an error occurs
    // or server returns response with an error status.
  });
    $scope.setSrc  = function(asset){
        if(asset.indexOf('.js') > -1){
            return "resources/images/js.png";
        }
        else if(asset.indexOf('.css') > -1){
            return "resources/images/css.png";
        }
        else if(asset.indexOf('.php') > -1){
            return "resources/images/js.php";
        }
        else if(asset.indexOf('.html') > -1){
            return "resources/images/html.png";
        }
        else if(asset.indexOf('.png') > -1 || asset.indexOf('.jpg') > -1 || asset.indexOf('.jpeg') > -1 || asset.indexOf('.gif') > -1 || asset.indexOf('.svg') > -1 || asset.indexOf('.pdf') > -1){
            return "https://assets.csh.rit.edu/uploads/"+asset;
        }
        else{
            return "resources/images/unknown.png";
        }
    }
    $scope.copyAsset = function(element){
        newValue = "Copied!";
        oldValue = "Copy to Clipboard";
        $(element).tooltip('hide')
          .attr('data-original-title', newValue)
          .tooltip('fixTitle')
          .tooltip('show').attr('data-original-title', oldValue)
          .tooltip('fixTitle'); 
        
    }
    $scope.userAgent = function(){
        var is_chrome = navigator.userAgent.indexOf('Chrome') > -1;
                var is_explorer = navigator.userAgent.indexOf('MSIE') > -1;
                var is_firefox = navigator.userAgent.indexOf('Firefox') > -1;
                var is_safari = navigator.userAgent.indexOf("Safari") > -1;
                var is_opera = navigator.userAgent.toLowerCase().indexOf("op") > -1;
                if ((is_chrome)&&(is_safari)) {is_safari=false;}
                if ((is_chrome)&&(is_opera)) {is_chrome=false;}

                if (is_safari) return true;
        
    }
    


});

app.directive('tooltip', function(){
    return {
        restrict: 'A',
        link: function(scope, element, attrs){
            $(element).hover(function(){
                // on mouseenter
                $(element).tooltip('show');
            }, function(){
                // on mouseleave
                $(element).tooltip('hide');
            }),
            $(element).click(function(){
                 newValue = "Copied!";
    oldValue = "Copy to Clipboard";
   $(this).tooltip('hide')
          .attr('data-original-title', newValue)
          .tooltip('fixTitle')
          .tooltip('show').attr('data-original-title', oldValue)
          .tooltip('fixTitle'); 
            });
        }
    };
});

