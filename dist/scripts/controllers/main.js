/*jshint unused:false*/
'use strict';

angular.module('airplayABC')
  .controller('MainCtrl', function ($scope,$http,usSpinnerService,$location,sharedProperties) {

  	console.log("loaded?");

  	console.log("fetch");

  	$http.get("/api/seriesIndex").success(function(data, status, headers, config) {


  		console.log("response");

		// A: ID
		// B: Title
		// E: Categories
		// F: Array of Episodes
		//		A: ID
		//		F: Posted?
		//		G: Expires?
		console.log(data);
		$scope.shows = data;
	});

	$scope.viewSeries = function(id) {
		$http.get("/api/series/" + id).success(function(data, status, headers, config) {
			console.log(data);
			sharedProperties.setProperty("series",data);
			$location.path("series");
		});
	};

  });