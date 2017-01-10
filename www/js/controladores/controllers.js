//#############################################################################################//
//###################################### proximasActividades ##################################//
//#############################################################################################//

arranque.controller('proximasActividades', function ($scope, $http, $filter, $window, $ionicLoading) {

  //ABRIR CARGADO

  $ionicLoading.show();

  //CARGA

  $http.get("http://www.ilazkitaldea.com/app/php/descripcion_actividades.php").then(function (response) {

    $scope.myData = response.data.records;

    console.log($scope.myData);

    //FUNCIONES

    $scope.comenzar = function (id_comenzar) {
      filtro_actividades = id_comenzar;
      localStorage.setItem("filtro_actividades", filtro_actividades);
      console.log("clicado: " + filtro_actividades);
      if (localStorage.getItem('user')) {
        $window.open("#/tab/actividadEspecificaregistrado", "_self");
      } else {
        $window.open("#/tab/actividadEspecifica", "_self");
      }
    };

    $scope.atras = function () {

      console.log("borrado");

      var user = localStorage.getItem('user');
      var actividad_apuntada = localStorage.getItem('actividad_apuntada');

      localStorage.clear();

      if (user) {
        localStorage.setItem('user', user)
      }
      if (actividad_apuntada) {
        localStorage.setItem('actividad_apuntada', actividad_apuntada)
      }

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

arranque.controller('actividadEspecifica', function ($scope, $http, $filter, $ionicLoading, $ionicPopup, $window) {

  //ABRIR CARGADO

  $ionicLoading.show();

  //CARGA

  $http.get("http://www.ilazkitaldea.com/app/php/descripcion_actividades.php").then(function (response) {

    if (localStorage.getItem("filtro_actividades") != null) {
      var filtro_actividades = localStorage.getItem("filtro_actividades");
    } else {
      filtro_actividades = "";
    }

    $scope.myData = response.data.records;
    $scope.especifico = $filter('filter')($scope.myData, {
      id: filtro_actividades
    });

    console.log(filtro_actividades);
    console.log($scope.especifico);

    $scope.atras = function () {

      console.log("borrado");

      var user = localStorage.getItem('user');
        var hermano = localStorage.getItem('hermano');
      var actividad_apuntada = localStorage.getItem('actividad_apuntada');

      localStorage.clear();

      if (user) {
        localStorage.setItem('user', user);
      }
      if (hermano) {
        localStorage.setItem('hermano', hermano);
      }
      if (actividad_apuntada) {
        localStorage.setItem('actividad_apuntada', actividad_apuntada)
      }

      $scope.link = "#/tab/home.html"

    };

    $scope.contador = $scope.especifico[0].gustar;
    $scope.id = $scope.especifico[0].id;

    var contador = $scope.contador;
    contador = parseInt(contador);

    var id = $scope.id;
    id = parseInt(id);

    //FUNCIONES 

    $scope.cargarcontador = function () {
      contador = contador + 1;
      console.log(contador);
      $scope.contador = contador;
    };

    $scope.sendData = function () {
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
        data: {
          'gustar': contador,
          'id': id
        },
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      };

      $http(req).
      success(function (data, status, headers, config) {
        console.log("ok");
      }).
      error(function (data, status, headers, config) {
        console.log("error");
      });
    };

    $scope.apuntar = function () {
      console.log("enviados");

      var user = localStorage.getItem("user");;
      var activity = filtro_actividades;

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
        data: {
          'usuario': user,
          'actividad': activity
        },
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      };

      $http(req).
      success(function (data, status, headers, config) {
        console.log("ok");
      }).
      error(function (data, status, headers, config) {
        console.log("error");
      });

      // Parse the JSON stored in allEntriesP
      var existingEntries = JSON.parse(localStorage.getItem("actividad_apuntada"));
      if (existingEntries == null) existingEntries = [];
      var entryTitle = activity;
      var entry = {
        "title": entryTitle
      };
      localStorage.setItem("entry", JSON.stringify(entry));
      // Save allEntries back to local storage
      existingEntries.push(entry);
      localStorage.setItem("actividad_apuntada", JSON.stringify(existingEntries));

      console.log("actividad: " + activity);
      console.log("usuario: " + user);

    };

    if (localStorage.getItem('user') && localStorage.getItem("actividad_apuntada")) {
      retrievedObject = localStorage.getItem('actividad_apuntada');
      actividades = JSON.parse(retrievedObject);

      var lognitud = actividades.length;
      console.log(actividades);


      console.log(actividades);

      for (i = 0; i < lognitud; i++) {
        console.log(actividades[i]['title'] + " = " + filtro_actividades);
        if (actividades[i]['title'] == filtro_actividades) {
          console.log("si");
          esconder = false;
          break;
        } else {
          esconder = true;
        }
      }

    } else {
      esconder = true;
    }

    $scope.apuntado = function () {
      return esconder;
    }

    $scope.showAlert = function () {
      var alertPopup = $ionicPopup.confirm({
        title: 'Condiciones de uso',
        template: '<textarea>DECLARO:1.Que todos los datos expresados en esta ficha son ciertos.2.Que autorizo al/ a la menor, a participar en el campamento organizado por ILAZKI AISIALDI TALDEA (CIF: G-95817144, calle vista alegre 11, 48903 BARAKALDO) y hago extensiva esta autorización en caso de máxima urgencia, con conocimiento y prescripción facultativa, a tomar decisiones medico quirúrgicas oportunas en caso de que mi localización haya sido imposible.3.torizo a ILAZKI AISIALDI TALDEA (CIF: G-95817144, calle vista alegre 11, 48903 BARAKALDO) la captación de imágenes, tanto en movimiento como estáticas, y sonido, ya su utilización tanto en su página web, blog como en publicaciones de la asociación o cualquierotro fin no lucrativo o de información.4.Autorizo a ILAZKI AISIALDI TALDEA (CIF: G-95817144, calle vista alegre 11, 48903 BARAKALDO) a fijar, reproducir, comunicar y a modificar por todo medio técnico las fotografías y vide os realizados en el marco de la presente autorización.5.Autorizo a ILAZKI AISIALDI TALDEA (CIF: G-95817144, calle vista alegre 11, 48903 BARAKALDO) a añadir mis datos personales o los de mi representado, como son el nombre y apellidos, dirección postal, dirección de correo electrónico y teléfonos a una base de datos cuyo fines el de informar sobre similares acciones futuras o el envío de una recopilación de imágenes.6.ILAZKI AISIALDI TALDEA prohíbe expresamente, una explotación de las fotografías susceptibles de afectar a la vida privada del/de lamenor, y una difusión en todo soporte de carácter pornográfico, xenófobo, violento o ilícito. De igual manera, la persona ins crita no estávinculada a ningún contrato exclusivo sobre la utilización de su imagen o su nombre.7.ILAZKI AISIALDI TALDEA destruirá los datos personales y los de mi representado legalmente una vez haya finalizado el campamentoo colonias para los que han sido re cogidos.</textarea><form>  <label><input type="checkbox" name="usuarios" value="usuarios"/>Usuarios</label><input type="checkbox" name="hermanos" value="hermanos"/>Hermanos</label></form>'
      });
      alertPopup.then(function (res) {
        if (res) {
         $window.location.reload();
        };
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

arranque.controller('HomeTabCtrl', function ($scope) {
  console.log('HomeTabCtrl');
})

arranque.controller('homelogedcontrll', function ($scope) {
  $scope.data = ({
    'user': localStorage.getItem("user"),
    'hermano': localStorage.getItem("hermano")
  });
})

//#############################################################################################//
//###################################### inicio ###############################################//
//#############################################################################################//

arranque.controller('LoginCtrl', function ($scope, $http, $window, $ionicPopup,$filter) {

  $scope.data = {};

  $scope.login = function () {
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
      data: {
        'usuario': $scope.data.username,
        'contrasena': $scope.data.password
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    };

    $http(req).
    success(function (data, status, headers, config) {
      $scope.respuesta = data.records; // assign  $scope.persons here as promise is resolved here 
      
      console.log($scope.respuesta);
      console.log($scope.respuesta[0].login.toString() === 'OK');
      console.log($scope.respuesta[0].login.toString() === 'NO');

      console.log($scope.respuesta[0].login);

      $login=$scope.respuesta[0].login;
      $hermano=$scope.respuesta[0].hermano;

      console.log($login);
      if ($login == 'OK') {
        localStorage.setItem("hermano", $hermano);
        $window.location.reload();
      } else {
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

arranque.controller('loged', function () {


})

//#############################################################################################//
//###################################### proximasActividades ##################################//
//#############################################################################################//

arranque.controller('misActividades', function ($scope, $http, $filter, $window, $ionicLoading) {

  //ABRIR CARGADO

  $ionicLoading.show();

  //CARGA

  usuario = localStorage.getItem("user");

  var req = {
    method: 'POST',
    url: "http://www.ilazkitaldea.com/app/php/actividades_inscritas.php",
    data: {
      'usuario': usuario
    },
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  };

  $http(req).
  success(function (data, status, headers, config) {
    $scope.respuesta = data; // assign  $scope.persons here as promise is resolved here 
    console.log($scope.respuesta);
  }).error(function (data, status, headers, config) {
    $scope.status = status;
    console.log($scope.persons);
  });

  $scope.atras = function () {

    console.log("borrado");

    var user = localStorage.getItem('user');
    var hermano = localStorage.getItem('hermano');
    var actividad_apuntada = localStorage.getItem('actividad_apuntada');

    localStorage.clear();

    if (user) {
      localStorage.setItem('user', user)
      localStorage.setItem('hermano', hermano);
    }
    if (actividad_apuntada) {
      localStorage.setItem('actividad_apuntada', actividad_apuntada)
    }

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
