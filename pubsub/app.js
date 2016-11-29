var express = require('express')
var bodyParser = require('body-parser')
var app = express()
var badges = require('./controllers/badges')

// Middlewares
app.use(bodyParser.json())

app.post('/', badges.save, badges.send)

app.get('/badges', badges.get)

app.listen(8000, function(){
	console.log("PubSub: listening on port %d...", 8000)
})