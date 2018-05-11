var request = require('./request.js');

function errorHandler(_err) {
	console.log(_err);
}

function forEachStation(_station, _error) {
	request.get('charging-stations', function(_data) {

		var json = JSON.parse(_data);
		
		var numChargingStations = json.length;
		
		for(var s=0; s<numChargingStations; ++s) {
			var station = json[s];
			
			var id = station.id;

			_station(id, station);
		}

	}, function(_err) {
		_error(_err);
	});
}

function logStations(_success, _error) {
	forEachStation(function(_id, _station)
	{
		console.log("Station ID " + _id + ": " + JSON.stringify(_station));
	}, _error);
}

function logChargingProcess(_error) {
	request.get('self/charging-process', function(_data) {
		console.log("RESULT: " + _data);
	}, _error);
}

function startCharging(_id, _success, _error) {
	var path = '/charging-stations/' + _id + '/charging-process/start';
	console.log("Path: " + path);
	request.put(path, function(_data) {
		console.log("RESULT: " + _data);
		_success(_id);
	}, _error);
}

function startChargingAll(_success, _error) {
	forEachStation(function(_id, _station) {
		startCharging(_id, _success, _error);
	}, _error);
}

//logStations(errorHandler);
//logChargingProcess(errorHandler);

startChargingAll(function(_id) {
	console.log("Now Charging at station with ID " + _id);
}, errorHandler);
