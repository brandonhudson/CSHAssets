var app = angular.module('CSHAssets', []);

app.controller('assetController', function ($scope, $http) {
    $http.get('/list_files')
    .success(function(data, status, headers, config) {
        console.log(data); //debug
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
    
    


});

app.controller('navController', function ($scope, $http) {
    $http.get('../resources/api/?submission')
    .success(function(data, status, headers, config) {
        console.log(data) //debug
        $scope.submissions = data.data[0].config_value;
        
  })
  .error(function(data, status, headers, config) {   
        notify("error","Cannot get submission status.") //debug
    // called asynchronously if an error occurs
    // or server returns response with an error status.
  });
    
  $scope.toggleSubmission = function(val){
     toggleSubmission(val, function(success){
        if(val == "F"){
            if(success){
                $scope.submissions = "F";
            }
          
        }
         else{
             if(success){
                $scope.submissions = "T";
            }
          
        }  
         
     });
      
  }


});