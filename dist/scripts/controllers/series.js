/*jshint unused:false*/
'use strict';

angular.module('airplayABC')
  .controller('SeriesCtrl', function ($scope,$http,usSpinnerService,sharedProperties) {

  	var seriesData = sharedProperties.getProperty("series");
  	console.log(seriesData);
	$scope.series = seriesData;

	$scope.play = function(str) {
		console.log(str);
		$http.get("/api/play/" + str);
	};

  });