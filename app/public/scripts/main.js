$(document).on('ready', function() {
	"use strict";
		
	var $header = $('#header');

	//Set $header height related the viewport height
	$header.height($(window).height());

	console.log('ready :)');	
});