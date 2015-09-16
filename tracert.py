import re
import subprocess

ipv4 = "\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}"

def tracert(ip):

	tracert = subprocess.Popen(
		"tracert.exe /d /w 100 " + ip,
		shell=True,
		stdout=subprocess.PIPE,
		stderr=subprocess.STDOUT)

	lines = tracert.stdout.readlines()
	result = ''.join(lines)

	return re.findall(ipv4, result)[1:]