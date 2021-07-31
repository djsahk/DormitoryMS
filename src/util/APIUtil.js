// var serverBase = 'http://localhost:8088'
// var serverBase = 'http://192.168.10.100:8088'
var serverBase = 'http://39.108.189.156:8088'
var v1 = serverBase + '/api/'
export default {
  BASE_SERVER_URL: serverBase,
  API_URL_USER: v1 + 'user',
	API_URL_STUDENT: v1 + 'student',
	API_URL_BUILDING: v1 + 'building',
	API_URL_DORMITORY: v1 + 'dormitory',
	API_URL_REPAIR: v1 + 'repair'
 }
