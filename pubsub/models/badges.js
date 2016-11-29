var redis = require('../lib/redis')
var broadcast = require('../lib/broadcast')
/**
 *	Save badges to database
 *	@param	{Array}	badges
 *	@param	{Function}	callback
 */
exports.save = function(badges, callback){
	if(!badges.length) return callback(null, null)

	var badge = badges.pop()
	redis.lpush('badges', JSON.stringify(badge), function(err){
		if(err)	return callback(err, null)
		exports.save(badges, callback)
	})
}

/**
 *	Trim down the list of badges
 */

exports.trim = function(){
	redis.ltrim('badges', 0, 9)
}

/**
 *	Send out badges to the broadcaster
 *	@param	{Array}	badges
 *	@param	{Function}	callback
 */
exports.send = function(badges, callback){
	// Alternative
	// badges.forEach(function(badge){
	// 	broadcast.send(badge)
	// })
	badges.forEach(broadcast.send)
	callback(null, null)
}

/**
 * Get 10 badges from the database
 * @param	{Function}	callback
 */
exports.get = function(callback){
	redis.lrange('badges', 0, -1, function(err, data){
		if(err) return callback(err, null)	// Propagate the error back to the controller
		data = data.map(JSON.parse)
		// Alternative
		// data = data.map(function(badge){
		// 	return JSON.parse(badge)
		// })
		callback(null, data)
	})
}

