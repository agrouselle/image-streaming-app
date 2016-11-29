$(function(){
	var socket = io.connect()
	
	socket.on('badge', function(badge){
		var $img = $('<img src="https://d1ffx7ull4987f.cloudfront.net/images/achievements/large_badge/' + badge.course_id + '/' + badge.badge_id + '" alt="Codeschool Badge" />')
		$('.badge-wrapper').prepend($img)

		setTimeout(function(){
      $img.addClass('on');
    }, 0);
	})
})