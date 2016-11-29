var request = require('request')

/**
 * Get badges from our server
 * @param	{Function}	callback
 */

exports.get = function(callback){
	request('http://localhost:8000/badges', function(err, response, body){
		callback(err, JSON.parse(body))
	})
}