$(document).on('ready', function() {
	"use strict";
		
	var $header 		= $('#header'),
		$arrowHeader 	= $('#arrow'),
		headerHeight; 

	//Set $header height related the viewport height
	$header.height($(window).height());
	headerHeight = $header.height();

	//arrow header event
	$arrowHeader.on('click', function(event) {
		event.preventDefault();

		$('html, body').animate({
			scrollTop: headerHeight
		}, 1500);
	});

	console.log('ready :)');	
});