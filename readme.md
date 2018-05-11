<h1>wallbe Cloud Connector</h1>

This is a small node.js program that allows to send commands to wallbe charging stations / "wall boxes"

 It requires a valid access to the wall.be cloud at https://wallb-e.cloud
 
 It supports:
 * Listing available charging stations
 * Querying the current charging process like current KWh, current charging power
 * Starting / stopping a charge

__Prerequisites__

* Install node.js

* Install bcrypt for node.js:
`npm install bcrypt`
