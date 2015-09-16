import urllib2
import json
import decimal

base_address = "http://www.ip-api.com/json/"

def locate(ip):

	req = urllib2.Request(base_address + ip)
	opener = urllib2.build_opener()

	f = opener.open(req)
	j = json.loads(f.read())

	if ('lon' in j and 'lat' in j):
		return [ j['lon'], j['lat'] ]
	else:
		return []