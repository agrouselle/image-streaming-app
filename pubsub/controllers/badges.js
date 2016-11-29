var _ = require('underscore')
var model = require('../models/badges')

/**
 *	Send badges to model to be saved
 */
exports.save = function(req, res, next){
	// Returns a deep copy of the body object. It's preferable to do this in order to make sure that
	// the next middleware doesn't get a mutated object
	var badges = _.clone(req.body)

	model.save(badges, function(err){
		if(err) return res.status(503).json({ error: true })
		next()	// End the current middleware and call the next one
		model.trim()
	})
}

/**
 *	Send badges to pub/sub socket in model
 */
exports.send = function(req, res, next){
	var badges = _.clone(req.body)
	model.send(badges, function(err){
		if(err) return res.status(503).json({ error: true })
		res.status(200).json({error: null})
	})
}

/**
 * Get the latest 10 badges from model
 */
exports.get = function(req, res){
 	model.get(function(err, data){
		if(err) return res.status(503).json({ error: true })
		res.status(200).json(data)
 	})
}