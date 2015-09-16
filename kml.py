
def template(content): 
	return """
	<?xml version="1.0" encoding="UTF-8"?>
	<kml xmlns="http://www.opengis.net/kml/2.2">
	  <Document>
	    <name>Paths</name>
	    %s
	  </Document>
	</kml>
	""" % content

def longlat(values):
	result = ""

	for x in values:
		result += "%f, %f, %f" % (x[0], x[1], .0)
		result += "\n"

	return result

def placemark(longlats):
	return """
	<Placemark>
		<name>Absolute Extruded</name>
	    <LineString>
	    	<coordinates> 
	        	%s
	        </coordinates>
	    </LineString>
	</Placemark>
	""" % longlat(longlats)
