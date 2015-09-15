var http = require('http');

function geolocateIP(ip, callback) {
	var options = {
		host: 'ip-api.com',
		path: '/json/' + ip
	};

	http.get(options, function (response) {
		var body = '';

		response.on('data', function (d) {
			body += d;
		});

		response.on('end', function (err) {
			callback(JSON.parse(body));
		});
	});
}

exports.geolocateIP = geolocateIP;;