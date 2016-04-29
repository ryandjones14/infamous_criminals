(function() {
  var app = angular.module('InfamousCriminals', ['ui.router']);

  // Configure different application states
  app.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: '/templates/_homeView.html'
      }).state('new', {
        url: '/new',
        templateUrl: '/templates/_newView.html'
      }).state('about', {
        url: '/about',
        templateUrl: '/templates/_aboutView.html',
      }).state('edit', {
        url: '/edit',
        templateUrl: '/templates/_editView.html',
      });
  });

})();
