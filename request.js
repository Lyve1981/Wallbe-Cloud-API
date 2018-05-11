var bcrypt = require('bcrypt');
var https = require("https");

const g_host = "wallb-e.cloud";
const g_path = "/services/api/";
const apiIdentifier = "wallbe_business_app_v1";
const apiKey = "69f1304b-2e39-4d82-9a80-43e20fa966a0";

var user = process.argv[2];
var pass = process.argv[3];

const saltRounds = 10;

var hashInput = user + "$" + apiKey + "$" + apiIdentifier;

var salt = bcrypt.genSaltSync(10, 'a');

var hash = bcrypt.hashSync(hashInput, salt);

var str = hash + user + "$" + apiIdentifier + ":" + pass;

var basic = "Basic " + Buffer.from(str, 'ascii').toString('base64');
/*
console.log("hashInput: " + hashInput);
console.log("Hash: " + hash);
console.log("str: " + str);
console.log("basic: " + basic);
*/

function doRequest(_method, _path, _callbackSuccess, _callbackError) {
	var options =
	{
		hostname: g_host,
		port: '443',
		path: g_path + _path,
		method: _method,
		headers: {
			'Authorization': basic
		}
	};

//	console.log("Calling " + JSON.stringify(options));

	const req = https.request(options, function(res)
	{
//		console.log('STATUS: ' + res.statusCode);
//		console.log('HEADERS: ' + JSON.stringify(res.headers));
		res.setEncoding('utf8');
		
		var data = "";
		
		res.on('data', function(chunk)
		{
			data += chunk;
		});

		res.on('end', function()
		{
//			console.log('BODY: ' + data);
//			console.log('FOR PATH: ' + g_path + _path);
			_callbackSuccess(data, res.headers);
		});
	});

	req.on('error', function(e)
	{
	  console.error('request error: ' + e.message);
	  _callbackError(e);
	});

//	if(_postData != null)
//		req.write(_postData);

	req.end();
}

exports.get = function(_path, _callbackSuccess, _callbackError) {
	doRequest('GET', _path, _callbackSuccess, _callbackError);
}

exports.put = function(_path, _callbackSuccess, _callbackError) {
	doRequest('PUT', _path, _callbackSuccess, _callbackError);
}
