
//#############################################################################################//
//###################################### proximasActividades ##################################//
//#############################################################################################//

arranque.controller('proximasActividades',function($scope,$http,$filter,$window,$ionicLoading){
      
  //ABRIR CARGADO

  $ionicLoading.show();

  //CARGA

  $http.get("http://www.ilazkitaldea.com/app/php/descripcion_actividades.php").then(function (response) {

    $scope.myData = response.data.records;

    console.log($scope.myData);

    //FUNCIONES

    $scope.comenzar=function(id_comenzar){
      filtro_actividades=id_comenzar;
      localStorage.setItem("filtro_actividades", filtro_actividades);
      console.log("clicado: "+filtro_actividades);
      if(localStorage.getItem('user')){
        $window.open("#/tab/actividadEspecificaregistrado", "_self");
      }else{
        $window.open("#/tab/actividadEspecifica", "_self");
      }
    };

    $scope.atras=function(){

      console.log("borrado");

      var user = localStorage.getItem('user');
      var actividad_apuntada = localStorage.getItem('actividad_apuntada');

      localStorage.clear();

      if(user){localStorage.setItem('user',user)}
      if(actividad_apuntada){localStorage.setItem('actividad_apuntada',actividad_apuntada)}
      
      /*
      if(localStorage.getItem("user")) {
        console.log(localStorage.getItem('user'));
        $scope.link = "#/tab/homeregistrado.html";
      }else{
        console.log("nada")
        $scope.link = "#/tab/home.html"
      }
      */

      $scope.link = "#/tab/home.html"
    };

    //CERRAR CARGA

    $ionicLoading.hide();

  });
});

//#############################################################################################//
//###################################### actividadEspecifica ##################################//
//#############################################################################################//

arranque.controller('actividadEspecifica',function($scope,$http,$filter,$ionicLoading,$ionicPopup,$window){

  //ABRIR CARGADO

  $ionicLoading.show();

  //CARGA
    
  $http.get("http://www.ilazkitaldea.com/app/php/descripcion_actividades.php").then(function (response) {
    
    if(localStorage.getItem("filtro_actividades")!=null){
      var filtro_actividades = localStorage.getItem("filtro_actividades");
    }else{
      filtro_actividades="";
    }

    $scope.myData = response.data.records;
    $scope.especifico = $filter('filter')($scope.myData, {id:filtro_actividades});

    console.log(filtro_actividades);
    console.log($scope.especifico);

    $scope.atras=function(){

      console.log("borrado");

      var user = localStorage.getItem('user');
      var actividad_apuntada = localStorage.getItem('actividad_apuntada');

      localStorage.clear();
      
      if(user){localStorage.setItem('user',user)}
      if(actividad_apuntada){localStorage.setItem('actividad_apuntada',actividad_apuntada)}

      $scope.link = "#/tab/home.html"

    };

    $scope.contador=$scope.especifico[0].gustar;
    $scope.id=$scope.especifico[0].id;

    var contador=$scope.contador;
    contador=parseInt(contador);

    var id=$scope.id;
    id=parseInt(id);

    //FUNCIONES 

    $scope.cargarcontador=function(){
        contador=contador+1;
        console.log(contador);
        $scope.contador=contador;
    };

    $scope.sendData=function(){
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
            data: {'gustar':contador,'id':id},
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        };

        $http(req).
        success(function(data, status, headers, config) 
        {
          console.log("ok");
        }).
        error(function(data, status, headers, config) 
        {
          console.log("error");
        });
    };

    $scope.apuntar=function(){
      console.log("enviados");

      var user=localStorage.getItem("user");;
      var activity=filtro_actividades;

      Object.toparams = function ObjecttoParams(obj) {
        var p = [];
        for (var key in obj) {
            p.push(key + '=' + encodeURIComponent(obj[key]));
        }
        return p.join('&');
      };

      var req = {
          method: 'POST',
          url: "http://www.ilazkitaldea.com/app/php/guardar_inscripcion.php",
          data: {'usuario':user,'actividad':activity},
          headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      };

      $http(req).
      success(function(data, status, headers, config) 
      {
        console.log("ok");
      }).
      error(function(data, status, headers, config) 
      {
        console.log("error");
      });

      // Parse the JSON stored in allEntriesP
      var existingEntries = JSON.parse(localStorage.getItem("actividad_apuntada"));
      if(existingEntries == null) existingEntries = [];
      var entryTitle = activity;
      var entry = {
          "title": entryTitle
      };
      localStorage.setItem("entry", JSON.stringify(entry));
      // Save allEntries back to local storage
      existingEntries.push(entry);
      localStorage.setItem("actividad_apuntada", JSON.stringify(existingEntries));

      console.log("actividad: "+activity);
      console.log("usuario: "+user);

    };

    if(localStorage.getItem('user')&&localStorage.getItem("actividad_apuntada")){
    retrievedObject = localStorage.getItem('actividad_apuntada');
    actividades=JSON.parse(retrievedObject);

    var lognitud=actividades.length;
    console.log(actividades);

    
    console.log(actividades);
    
    for(i=0;i<lognitud;i++){
      console.log(actividades[i]['title']+" = "+filtro_actividades);
      if(actividades[i]['title']==filtro_actividades){
        console.log("si");
        esconder=false;
        break;
      }else{
        esconder=true;
      }
    }

    }else{
      esconder=true;
    }

    $scope.apuntado = function(){
      return esconder;
    }

    $scope.showAlert = function() {
      var alertPopup = $ionicPopup.confirm({
        title: 'Condiciones de uso',
        template: '<textarea></textarea>'
      });
        alertPopup.then(function(res) {
        $window.open("#/tab/home");
      });
    };

    //CERRAR CARGA

    $ionicLoading.hide();

  });
});

//#############################################################################################//
//###################################### cargaCorazon #########################################//
//#############################################################################################//

/*arranque.controller('cargaCorazon', function($scope,$http) {

      $scope.parseId=parseintcorazon;
      //$scope.cargarcontador=calcularcorazon;
      $scope.enviarcorazon=sendData;

});*/

//#############################################################################################//
//###################################### inicio ###############################################//
//#############################################################################################//

arranque.controller('HomeTabCtrl', function($scope) {
  console.log('HomeTabCtrl');
})

arranque.controller('homelogedcontrll', function($scope) {
  $scope.data=({'user':localStorage.getItem("user")});
})

//#############################################################################################//
//###################################### inicio ###############################################//
//#############################################################################################//

arranque.controller('LoginCtrl', function($scope,$http,$window,$ionicPopup) {
    
    $scope.data = {};
 
    $scope.login=function(){
        console.log("LOGIN user: " + $scope.data.username + " - PW: " + $scope.data.password);
       
        localStorage.setItem("user", $scope.data.username);
        localStorage.setItem("pw", $scope.data.password);

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
              url: "http://www.ilazkitaldea.com/app/php/comprobar_usuario.php",
              data: {'usuario':$scope.data.username,'contrasena':$scope.data.password},
              headers: {'Content-Type': 'application/x-www-form-urlencoded'}
          };

          $http(req).
          success(function (data, status, headers, config) {
              $scope.respuesta = data; // assign  $scope.persons here as promise is resolved here 
              console.log($scope.respuesta);
              console.log($scope.respuesta.toString()==='"OK"');
              console.log($scope.respuesta.toString()==='"NO"');
              if($scope.respuesta.toString()=='"OK"'){
                $window.location.reload();
              }else{
                localStorage.removeItem("user");
                var alertPopup = $ionicPopup.alert({
                  title: 'Login',
                  template: 'Usuario o contraseña incorrecta, si el error continua contacte con algun administrador. 622015862/info@ilazkitaldea.com'
                });
              }
          }).error(function (data, status, headers, config) {
              $scope.status = status;
              console.log($scope.persons);
          });


      };
})

//#############################################################################################//
//###################################### loged ################################################//
//#############################################################################################//

arranque.controller('loged', function() {

  
})

//#############################################################################################//
//###################################### proximasActividades ##################################//
//#############################################################################################//

arranque.controller('misActividades',function($scope,$http,$filter,$window,$ionicLoading){
      
  //ABRIR CARGADO

  $ionicLoading.show();

  //CARGA

  usuario=localStorage.getItem("user");

  var req = {
      method: 'POST',
      url: "http://www.ilazkitaldea.com/app/php/actividades_inscritas.php",
      data: {'usuario':usuario},
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
  };

  $http(req).
  success(function (data, status, headers, config) {
      $scope.respuesta = data; // assign  $scope.persons here as promise is resolved here 
      console.log($scope.respuesta);
  }).error(function (data, status, headers, config) {
      $scope.status = status;
      console.log($scope.persons);
  });

  $scope.atras=function(){

      console.log("borrado");

      var user = localStorage.getItem('user');
      var actividad_apuntada = localStorage.getItem('actividad_apuntada');

      localStorage.clear();

      if(user){localStorage.setItem('user',user)}
      if(actividad_apuntada){localStorage.setItem('actividad_apuntada',actividad_apuntada)}
      
      /*
      if(localStorage.getItem("user")) {
        console.log(localStorage.getItem('user'));
        $scope.link = "#/tab/homeregistrado.html";
      }else{
        console.log("nada")
        $scope.link = "#/tab/home.html"
      }
      */

      $scope.link = "#/tab/home.html"
  };
  //CERRAR CARGA

  $ionicLoading.hide();

});