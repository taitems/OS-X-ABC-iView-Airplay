// https://tviview.abc.net.au/iview/feed/samsung/
// 
// FETCHING SHOWS EXAMPLES
// url = config.feed_url + '?keyword=' + keyword
// feed = fetch_protected_url(url)
// shows = parse.parse_programme_from_feed(feed)
//
// FETCHING WITH AUTH
// headers = {'Authorization': 'Basic ZmVlZHRlc3Q6YWJjMTIz'}
// return fetch_url(url, headers)
// 
// SERIES DETAILS
// http://tviview.abc.net.au/api2/?series={id}
//
// TOKENISED SAMSUNG URLS
// https://abcsecurehttp-a.akamaihd.net/playback/_definst_/{filename}?d=samsung&a=86c7d4882284bacb82ab944e7723a586



var parseString = require('xml2js').parseString;
var request = require('request');
var colors = require('colors');
var airplay = require('airplay');
var express = require('express');
var app = express();

app.use(express.static(__dirname + '/dist'));
app.use("/bower_components", express.static(__dirname + '/bower_components'));

var server = app.listen(3001, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('Example app listening at http://%s:%s', host, port)

});

var config = {
	feed_url: "https://feedtest:abc123@tviview.abc.net.au/iview/feed/samsung/",
	keyword_url: "https://feedtest:abc123@tviview.abc.net.au/iview/feed/samsung/?keyword=",
};


app.get('/api/seriesIndex', function(req, res) {
	console.log("called: ".bold + "/api/seriesIndex");
	console.log("calling: ".bold + "http://tviview.abc.net.au/api2/?seriesIndex");
	request("http://tviview.abc.net.au/api2/?seriesIndex",  function(error, response, body) {
		// A: ID
		// B: Title
		// E: Categories
		// F: Array of Episodes
		//		A: ID
		//		F: Posted?
		//		G: Expires?
		if (!error) {
			res.send(body);
		} else {
			res.send(error);
		}
	});
});

app.get('/api/series/:id', function (req, res) {
	console.log("called: ".bold + "/api/series/" + req.params.id);
	console.log("calling: ".bold + "http://tviview.abc.net.au/api2/?series=" + req.params.id);
	request("http://tviview.abc.net.au/api2/?series=" + req.params.id, function(error, response, body) {
		if (!error) {
			res.send(body);
		} else {
			res.send(error);
		}
	});
});


app.get('/api/play/:filename', function (req, res) {

	console.log("called: ".bold + "/api/play/" + req.params.filename);

	// var url = "https://abcsecurehttp-a.akamaihd.net/playback/_definst_/{filename}?d=samsung&a={a}";
	var url = "https://abcsecurehttp-a.akamaihd.net/playback/_definst_/{filename}?d=samsung";
	url = url.replace("{filename}",req.params.filename);
	url += "&st=1420367474~exp=1420377473~acl=/*~hmac=75e1898436a34748e57ae2db9be2a379333b66057452c7cbb4fbd1283d585616";
	// url = url.replace("{a}","86c7d4882284bacb82ab944e7723a586");

	console.log("airplay url: ".bold + url);

	var browser = airplay.createBrowser();
	browser.on('deviceOnline', function(device) {
		device.play(url , 0);
	});
	browser.start();

});

request(config.keyword_url + "murder", function(error, response, body) {

	console.log('response received');
	if (!error && response.statusCode == 200) {
		console.log('success!');
		console.dir(body);
		return;
    }
    console.log('error');
    console.log(error);
    console.log("");
    console.log("");
    console.log("");
    console.log(response);
    console.log("");
    console.log("");
    console.log("");
    console.log(body);
});



// var doAuth = function() {

// 	console.log("authenticating...".orange);

// 	request(config.auth, function (error, response, body) {
// 	  if (!error && response.statusCode == 200) {
// 	    parseString(body, function (err, result) {
// 		    config.token = result.iview.token[0];
// 		    config.tokenhd = result.iview.tokenhd[0];
// 		    console.log("authenticated!".green);
// 		});
// 	  }
// 	});

// };