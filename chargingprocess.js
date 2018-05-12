/*	charging process response:

	String chargingStationId
	double currentPowerInKw;
	String id;
	double loadedKwh;
	private DateTime startedAt;
*/

exports.chargingStationId = function(var _json) {
	return _json.chargingStationId;
}

exports.currentPowerInKw = function(var _json) {
	return _json.currentPowerInKw;
}

exports.id = function(var _json) {
	return _json.id;
}

exports.loadedKwh = function(var _json) {
	return _json.loadedKwh;
}

exports.startedAt = function(var _json) {
	return _json.startedAt;
}
