var http = require("http");
var url = require('url');

var request = require('./request.js');

const g_serverListenPort = 8787;

function writeResult(_target, _json, _err)
{
	if(_err)
	{
		_target.writeHead(404, {'Content-Type': 'text/plain'});
		console.log("err: '" + _err + "'");
		_target.end(_err);
	}
	else
	{
		_target.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
		var json = JSON.stringify(_json);
		console.log("json: '" + json + "'");
		_target.end(json);
	}
}

function handleResult(_target, _data)
{
	if(_data == null || _data.length < 1)
		writeResult(_target, '{}', null);
	else
	{
		try
		{
			var json = JSON.parse(_data);
			writeResult(_target, json, null);
		}
		catch(err)
		{
			writeResult(_target, null, err);
		}
	}
}

function getRequest(_path, _result)
{
	request.get(_path, function(_data) 
	{
		handleResult(_result, _data);
	}, function(_err)
	{
		writeResult(_result, null, _err);
	});
}

function putRequest(_path, _result)
{
	request.put(_path, function(_data) 
	{
		handleResult(_result, _data);
	}, function(_err)
	{
		writeResult(_result, null, _err);
	});
}

http.createServer(function (req, res)
{
    var requestUrl = url.parse(req.url);
    var path = requestUrl.pathname;
    var search = requestUrl.search;

    path = path.substring(1);

    if(path === 'charging-start')
	{
		var id = search.substring(1);
		putRequest('charging-stations/' + id + '/charging-process/start', res);
	}
	else if(path === 'charging-stop')
	{
		putRequest('self/charging-process/stop', res);
	}
	else if(path === 'charging-stations')
	{
		getRequest('charging-stations', res);
	}
	else if(path === 'charging-current')
	{
		getRequest('self/charging-process', res);
	}
	else if(path === 'self')
	{
		getRequest('self', res);
	}
    else
    {
        writeResult(res, null, 'Invalid path ' + path);
    }
}).listen(g_serverListenPort);
