arranque.directive('onFinishRender', function ($timeout) {
  return {
    restrict: 'A',
    link: function(scope) {
      if (scope.$first === true) {
          console.log('First thing about to render');
      }
      if (scope.$last === true) {
        $timeout(function() {
          console.log('Last thing rendered!');
          //$(".actividades").click(comenzar);
          //$("#home").click(atras);
          //$("#atras").click(atras);
        });
      }
    }
  };
});