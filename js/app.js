function a($scope, $ionicSideMenuDelegate) {
  $scope.toggleLeftSideMenu = function() {
    $ionicSideMenuDelegate.toggleLeft();
  };
}

function parseintcorazon(numero){
  console.log(numero);
  gustar=parseInt(numero);
  console.log(gustar);
  return gustar;
}

/*
function calcularcorazon(contador){
  contador=contador+1;
  console.log(contador);
  contadorgustar=contador;
  return contador;
}
*/

/*
function sendData($http) {
  console.log("enviados");

  Object.toparams = function ObjecttoParams(obj) {
      var p = [];
      for (var key in obj) {
          p.push(key + '=' + encodeURIComponent(obj[key]));
      }
      return p.join('&');
  };

var req = {
      method: 'POST',
      url: "http://www.ilazkitaldea.com/app/php/guardar_corazon.php",
      data: {'one':contadorgustar},
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
  };

  $http(req).
  success(function(data, status, headers, config) 
  {
    console.log("aaaa");
  }).
  error(function(data, status, headers, config) 
  {
      console.log("bbbb");
  });


}
*/

function escribir(){
  console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaa");
}