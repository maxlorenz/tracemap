from tracert import tracert
from geolocateip import locate
from kml import placemark, template

with open("addresses.txt") as addresses:

	content = ""

	for address in addresses.readlines():
		longlats = [ locate(x) for x in tracert(address) if locate(x) ]
		content += placemark(longlats)

	print template(content)