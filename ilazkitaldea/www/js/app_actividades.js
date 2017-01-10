
angular
.module('firstApp',['ionic'])
.controller('FirstController',function($scope,$http,$filter){
    $http.get("http://www.ilazkitaldea.com/app/php/descripcion_actividades.php").then(function (response) {
      $scope.myData = response.data.records;
      $scope.myData = $filter('filter')($scope.myData, "2");
  });
})
.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {

      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
.directive('onFinishRender', function ($timeout) {
  return {
    restrict: 'A',
    link: function(scope) {
      if (scope.$first === true) {
          console.log('First thing about to render');
      }
      if (scope.$last === true) {
        $timeout(function() {
          console.log('Last thing rendered!');
          $("#act1").click(comenzar);
        });
      }
    }
  };
});


function comenzar(){
  window.open("actividades.html", "_self");
};