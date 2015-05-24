//preload
$(window).on('load', function(){
	$('#preload').fadeOut(1500);
});


$(document).on('ready', function() {
	"use strict";
		
	var $header 		= $('#header'),
		$arrowHeader 	= $('#arrow'),
		$sections		= $('section'),
		chartAnimate	= false, //flag used to initialize animation from EastPieChart.js 
		chartPosition	= $('#skills').offset().top, //get the position of the chart section
		windowPosition 	= $(window).scrollTop(), //get the position of the window
		$form 			= $('#form form'),
		$arrow 			= $('#_arrow'),
		$menu 			= $('#menu'),
		windowHeight	= $(window).height();

	//Set $header height related the viewport height
	$header.height(windowHeight);

	//show and stick to top the menu only below the hero
	$(window).on('scroll', function(e) {

		e.preventDefault();
		if($(this).scrollTop() < windowHeight) {
			$menu.removeClass('util-hide-content').fadeOut(500);
		} else {
			$menu.addClass('util-hide-content').fadeIn(500);
		}
	});

	//arrow header event
	$arrowHeader.on('click', function(event) {
		event.preventDefault();

		$('html, body').animate({
			scrollTop: $header.height()
		}, 1500);
	});

	//init wow
	new WOW().init();

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

	//Initialize charts

	if(windowPosition + $(window).height() > chartPosition){
		if(!chartAnimate){
			//Initialize chart animation
			initGraphs();
		}
	}
	$(window).on('scroll',function(e){
		if($(this).scrollTop() > chartPosition){
			if(!chartAnimate){
				initGraphs();
			}
		}
	});

	function initGraphs() {
		$('.chart').easyPieChart({
			scaleColor: "#ecf0f1",
		    lineWidth: 20,
		    lineCap: 'butt',
		    barColor: '#3498db',
		    trackColor:	"#ecf0f1",
		    size: 110,
			animate: 2000
    	});

    	chartAnimate = true;
	}

	//Submit contact form
	$form.on('submit', function(event){
		var $_self = $(this);

		event.preventDefault();

		$.ajax({
			type: 'POST',
			url: $_self.attr('action'),
			data: $_self.serialize(),
			success: function(data) {
				console.log(data.ok);

				alert('Success');
			},
			error: function() {

				alert('Error');
			},
			complete: function() {
				$('#name').focus();

				alert('Complete');
			}
		});
	});

	//Back to top arrow button
	$arrow.on('click', function(event) {
		event.preventDefault();
		$('html, body').animate({scrollTop : 0},1000);
	});

	console.log('ready :)');	
});