function createDocument(content) {
	return '<?xml version="1.0" encoding="UTF-8"?> \
	<kml xmlns="http://www.opengis.net/kml/2.2"> \
	<Document> \
	<name>Paths</name> \
	<description></description>'
	+ content + 
	'</Document> \
	</kml>';
}

// locations is in the form [long, lat]
function pathToString (locations) {
	var result = '';

	for (index in locations) {
		result += locations[index][0];
		result += ', ';
		result += locations[index][1];
		result += ', 0.';
		result += '\n';
	}

	return result;
}

function createPath(ip, locations) {
	return '<Placemark> \
	<name>' + ip + '</name> \
	<description></description> \
	<LineString> \
	<coordinates>'
	+ pathToString(locations) +
	'</coordinates> \
	</LineString> \
	<Style> \
	<LineStyle> \
	<color>#ff000ff</color> \
	</LineStyle> \
	</Style> \
	</Placemark>';
}

exports.createDocument = createDocument;
exports.createPath = createPath;