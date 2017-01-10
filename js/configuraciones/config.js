arranque

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider

    .state('tabs', {
      url: "/tab",
      abstract: true,
      templateUrl: "templates/tabs.html"
    })

    .state('tabs.proximasActividades', {
      cache: false,
      url: "/proximasActividades",
      views: {
        'home-tab': {
          templateUrl: "templates/proximasActividades.html"
        }
      }
    })

    .state('tabs.about', {
      url: "/about",
      views: {
        'about-tab': {
          templateUrl: "templates/about.html"
        }
      }
    })

    .state('tabs.contact', {
      url: "/contact",
      views: {
        'contact-tab': {
          templateUrl: "templates/contact.html"
        }
      }
    })

    .state('tabs.misActividades', {
      cache: false,
      url: "/misActividades",
      views: {
        'home-tab': {
          templateUrl: "templates/misActividades.html"
        }
      }
    });

  if(localStorage.getItem("user")) {

    $stateProvider

    .state('tabs.home', {
      url: "/homeregistrado",
      views: {
        'home-tab': {
          templateUrl: "templates/homeregistrado.html",
        }
      }
    })

    .state('tabs.actividadEspecifica', {
      cache: false,
      url: "/actividadEspecificaregistrado",
      views: {
        'home-tab': {
          templateUrl: "templates/actividadEspecificaregistrado.html"
        }
      }
    });
    
    $urlRouterProvider.otherwise("/tab/homeregistrado");

  }else{

    $stateProvider

    .state('tabs.home', {
      url: "/home",
      views: {
        'home-tab': {
          templateUrl: "templates/home.html",
          //controller: 'HomeTabCtrl'
        }
      }
    })

    .state('tabs.actividadEspecifica', {
      cache: false,
      url: "/actividadEspecifica",
      views: {
        'home-tab': {
          templateUrl: "templates/actividadEspecifica.html"
        }
      }
    });

    $urlRouterProvider.otherwise("/tab/home");
  }

})

.config(function($ionicConfigProvider) {
  $ionicConfigProvider.tabs.position('bottom');
})