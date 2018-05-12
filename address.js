/*
  @Json(name="addressAppendix")
  private String addressAppendix;
  private String city;
  private String country;
  private String street;
  private String street2;
  private String zip;
*/

exports.addressAppendix = function(var _json) {
	return _json.addressAppendix;
}

exports.city = function(var _json) {
	return _json.city;
}

exports.country = function(var _json) {
	return _json.country;
}

exports.street = function(var _json) {
	return _json.street;
}

exports.street2 = function(var _json) {
	return _json.street2;
}

exports.zip = function(var _json) {
	return _json.zip;
}
