/*jshint unused:false*/
'use strict';

/**
 * @ngdoc overview
 * @name airplayIviewApp
 * @description
 * # airplayIviewApp
 *
 * Main module of the application.
 */
angular
  .module('airplayABC', [
    'angularSpinner',
    'ngRoute'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/series', {
        templateUrl: 'views/series.html',
        controller: 'SeriesCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });