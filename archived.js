// appears to be a list of shows
// http://tviview.abc.net.au/api2/?seriesIndex

// sub stream
// http://tviview.abc.net.au/api2/?series=1514813
// http://tviview.abc.net.au/api2/?series=0512007

// cached link
// rtmp://cp81899.live.edgefcs.net/live/news24-med@28772
// http://iviewmetered-vh.akamaihd.net/z/
// http://cdn.iview.abc.net.au/thumbs/i/388/CO1200V001S0054852c61d06b08.45808175_1280.jpg
// itsadate_01_01.mp4
// http://iviewmetered-vh.akamaihd.net/z/SMIL/classification/M.smil/manifest.f4m
// http://iviewum-vh.akamaihd.net/z/SMIL/hansomcab_xx_xx_hi.smil/manifest.f4m
// http://iviewum-vh.akamaihd.net/z/SMIL/hansomcab_xx_xx_hi.smil/manifest.f4m?hdcore=true&hdnea={TOKEN-HD}
// http://iviewum-vh.akamaihd.net/z/SMIL/hansomcab_xx_xx_hi.smil/manifest.f4m?hdcore=true&hdnea=st=1420271375~exp=1420281374~acl=/*~hmac=a445d6a4e5dcc0eca31f4e255e5c4a6e0c5d18dcc18bdfb94d813359b18f813a
// ?hdcore=true&hdnea=

// var rtmpLink = "rtmp://cp81899.live.edgefcs.net/live/news24-med@28772";
var rtmpLink = "http://download.blender.org/peach/bigbuckbunny_movies/BigBuckBunny_640x360.m4v";
var akamaiManifestLink = "http://iviewum-vh.akamaihd.net/z/SMIL/hansomcab_xx_xx_hi.smil/manifest.f4m?hdcore=true&hdnea=";
var mediaLink = "https://abcsecurehttp-a.akamaihd.net/playback/_definst_/midsomer_12_01.mp4?d=samsung&a=86c7d4882284bacb82ab944e7723a586";
var mediaLinkTokenised = "https://abcsecurehttp-a.akamaihd.net/playback/_definst_/{filename}?d=samsung&a=86c7d4882284bacb82ab944e7723a586";

var parseString = require('xml2js').parseString;
var request = require('request');
var colors = require('colors');
var config = {
	// auth: "http://tviview.abc.net.au/iview/auth/?v2", // possibly legacy
	auth: "http://iview.abc.net.au/auth/flash/?",
	token: null,
	tokenhd: null
};



// var browser = require('airplay').createBrowser();
// browser.on('deviceOnline', function(device) {
// 	device.play(rtmpLink, 0);
// 	// device.play('http://host/somevideo.mp4', 0);
// });
// browser.start();



var doAuth = function() {


	console.log("authenticating...".orange);

	request(config.auth, function (error, response, body) {
	  if (!error && response.statusCode == 200) {
	    parseString(body, function (err, result) {
		    config.token = result.iview.token[0];
		    config.tokenhd = result.iview.tokenhd[0];
		    console.log("authenticated!".green);
		    playLink();
		});
	  }
	});

};

var playLink = function() {

	console.log("attempting to play link...".orange);

	var url = mediaLink;

	console.log(url);

	var browser = require('airplay').createBrowser();
	browser.on('deviceOnline', function(device) {
	    console.log("connected".green);
		device.play(url , 0);
	});
	browser.start();

};

// var playLink = function() {

// 	console.log("attempting to play link...".orange);

// 	var url = akamaiLink + config.tokenhd;

// 	console.log(url);

// 	var browser = require('airplay').createBrowser();
// 	browser.on('deviceOnline', function(device) {
// 	    console.log("connected".green);
// 		device.play(url , 0);
// 	});
// 	browser.start();

// };

doAuth();