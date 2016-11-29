var request = require('request');
var arrandom = require('arrandom');

var data = [
	{
		"course_id": 534,
		"badge_id": "apprentice-0f19184c0b7fc1eaa3e9c89e758c5d99.png"
	},
	{
		"course_id": 630,
		"badge_id": "angular-champion-3b2754f860d6b93abda8af4867f7d562.png"
	},
	{
		"course_id": 496,
		"badge_id": "tenderfoot-59d41c72e7dafb6adafe6802e288d636.png"
	},
	{
		"course_id": 495,
		"badge_id": "cadet-068d8b9938da926dce6ea4911d6adfc6.png"
	}
];

console.log('Producer launched')

var requestObj = {
	json: data,
	method: 'POST',
	url: 'http://localhost:8000'
};

(function _request () {
	requestObj.json = [arrandom(data)[0]];
	console.log('Sending new badge...')
	request(requestObj, function(err){
		if (err) console.log(err);
		setTimeout(_request, 2000);
	});
})();

