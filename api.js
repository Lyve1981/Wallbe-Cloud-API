var request = require('./request.js');

exports.forFirstStation = function(_station, _error) {
	request.get('charging-stations', function(_data) {
		try {
			var json = JSON.parse(_data);
			
			var numChargingStations = json.length;

			if(numChargingStations < 1) {
				_error("Unable to find a station in response " + _data);
			}
			else {
				var station = json[0];
				_station(station.id, station);
			}
		}
		catch(err) {
			_error(err);
		}
	}, function(_err) {
		_error(_err);
	});
}

exports.forEachStation = function(_station, _error) {
	request.get('charging-stations', function(_data) {
		try {
			var json = JSON.parse(_data);
			
			var numChargingStations = json.length;
			
			for(var s=0; s<numChargingStations; ++s) {
				var station = json[s];
				
				var id = station.id;

				_station(id, station);
			}			
		}
		catch(err) {
			_error(err);
		}
	}, function(_err) {
		_error(_err);
	});
}

exports.currentChargingProcess = function(_success, _error) {
	request.get('self/charging-process', function(_data) {
		try {
			var json = JSON.parse(_data);
			_success(json);
		}
		catch(err) {
			_error(err);
		}
	}, _error);
}


exports.startCharging = function(_id, _success, _error) {
	var path = '/charging-stations/' + _id + '/charging-process/start';
	request.put(path, function(_data) {
		_success(_id);
	}, _error);
}

exports.startChargingFirst(_success, _error) {
	forFirstStation(function(_id, _station) {
		startCharging(_id, _success, _error);
	}, _error);
}
