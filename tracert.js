var spawn = require('child_process').spawn;
var exec = require('child_process').exec;

var kml = require('./kml.js');
var geolocateIP = require('./geolocate.js').geolocateIP;

// http://www.alexa.com/topsites/countries
var sites = [
	"Alwasatnews.com ",
	"Barbadostoday.bb ",
	"Facebook.com ",
	"Gazetaexpress.com ",
	"Google.com",
	"Heise.de",
	"Hln.be ",
	"Kalerkantho.com ",
	"Lostiempos.com ",
	"Mercadolibre.com.ar ",
	"Musavat.com ",
	"Olx.ba ",
	"Olx.bg ",
	"Orf.at ",
	"Smh.com.au ",
	"Tut.by ",
	"Uol.com.br ",
	"Vk.com "
];

// Hold kml content
var content = '';

// Match all ipv4 addresses in a string
var ipv4 = /(([1-9]?\d|1\d\d|25[0-5]|2[0-4]\d)\.){3}([1-9]?\d|1\d\d|25[0-5]|2[0-4]\d)/g

// Semaphore to control the callbacks
var sitesLeft = sites.length;

for (var j = 0; j <= sites.length - 1; j++) {
	(function(j) {

		// http://stackoverflow.com/questions/5574205/tracert-on-windows-returns-slower-than-on-linux
		exec('tracert.exe -d -w 100 ' + sites[j], function (err, stdout, stderr) {

			// tracert gives origin and destination ip first
			var addresses = stdout.match(ipv4).slice(2);
			var currentPath = [];

			for (var i = 0; i <= addresses.length - 1; i++) {
				var addressesLeft = addresses.length;

				(function (i) {
					geolocateIP(addresses[i], function (result) {
						addressesLeft--;

						currentPath[i] = [result.lon, result.lat];

						if (addressesLeft == 0) {
							content += kml.createPath(sites[j], currentPath);
							sitesLeft--;

							if (sitesLeft == 0) {
								console.log(kml.createDocument(content));
							}
						}
					});
				})(i);
			}
		});

	})(j);
}