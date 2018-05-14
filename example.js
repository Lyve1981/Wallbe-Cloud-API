var api = require('./api.js');

function errorHandler(_err) {
	console.log(_err);
}

api.forEachStation(function(_id, _station) {
	console.log("Station ID " + _id + ": " + JSON.stringify(_station));
}, errorHandler);

api.currentChargingProcess(function(_data) {
	console.log("RESULT: " + _data);
}, errorHandler);
