/*
var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope,$http) {
   console.log("controller");


/*
$http.get('/contactlist').success(function(response){
	console.log("i got the data requested");
	$scope.contactlist=response;
});

*/
/*

$http.get('/contactlist').then(successCallback, errorCallback);

function successCallback(response){
    //success code
    console.log("i got the data requested");
	$scope.contactlist=response;
}
function errorCallback(error){
    //error code
    console.log("no the data requested");
}

//we will be taking data from server.first we will send http request from controller then it will go to server and app.js will send te request back to controller.

//routing is done here
//http request is sned in the url form /contactlist.....

});

*/

var app = angular.module('myApp', []);
app.controller('myCtrl', function ($scope, $http){
  var refresh=function(){
   $http({
      method: 'GET',
      url: '/contactlist'
   }).then(function (response){
   	// console.log("i got the data requested");

	   $scope.contactlist=response.data;
     $scope.contact={};
   },
   function (error){
   	console.log("no the data requested");
   });

};
refresh();

   $scope.addContact=function(){
    console.log($scope.contact);
    $http.post('/contactlist',$scope.contact).then(function(response){
      console.log(response);
      refresh();
    });
   };



   $scope.remove=function(id){
    console.log(id);
    $http.delete('contactlist/' + id).then(function (response){
     console.log("i got the data requested delete");
      refresh();
   },
   function (error){
    console.log("no the data requested delete");
   });
  //   $http.delete('/contactlist/' + id);
/*
    $http.delete('/contactlist?' + id)
            .then(function (id, status, headers) {
                console.log("send request to app.js");
            })
            .error(function (id, status, header, config) {
                $scope.ServerResponse = htmlDecode("Data: " + id +
                    "\n\n\n\nstatus: " + status +
                    "\n\n\n\nheaders: " + header +
                    "\n\n\n\nconfig: " + config);
            });

$http.delete(url, config)
   .then(
       function(response){
         // success callback
       }, 
       function(response){
         // failure call back
       }
    );
*/



 /* $http({
      method: 'delete',
      url: '/contactlist/'+id
   }).then(function (response){
     console.log("i got the data requested delete");
      refresh();
   },
   function (error){
    console.log("no the data requested delete");
   });

*/


   };



$scope.edit=function(id){
 // console.log(id);
  $http.get('contactlist/' + id).then(function(response){
   console.log(response.data);
// $scope.contact.name="ssksk";
//console.log(response.data.id.name);
 // $scope.console=response.data;
 //console.log(response.data["0"].name);
// console.log(response.data["0"].email);
// console.log(response.data["0"].number);


 $scope.contact=response.data["0"];
 //console.log($scope.contact.ID);

    // $scope.contact.name=response.data;
    //$scope.contact.email=response.data;
   //  $scope.contact.number=response.data[2];
    });
};


$scope.update=function(){
    console.log($scope.contact.ID);
    $http.put('/contactlist/' + $scope.contact.ID, $scope.contact).then(function(response){
      console.log("update result in controller");
      refresh();
    });
};


});