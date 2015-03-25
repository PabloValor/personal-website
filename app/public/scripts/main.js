//preload
$(window).on('load', function(){
	$('#preload').fadeOut(1500);
});

$(document).on('ready', function() {
	"use strict";
		
	var $header 		= $('#header'),
		$arrowHeader 	= $('#arrow'),
		$sections		= $('section'); 

	//Set $header height related the viewport height
	$header.height($(window).height());

	//arrow header event
	$arrowHeader.on('click', function(event) {
		event.preventDefault();

		$('html, body').animate({
			scrollTop: $header.height()
		}, 1500);
	});

	//Initialize video bg
	$('.player').mb_YTPlayer();

	//Initialize Tipr tooltip
	$('.tip').tipr({
		'mode': 'top'
	});

	//Initialize Owl Carousel
	$("#owl-example").owlCarousel({
		singleItem: true,
		itemsScaleUp: true,
		autoPlay: true,
		stopOnHover: true,
		paginationSpeed: 300,
		slideSpeed: 120
	});

	console.log('ready :)');	
});