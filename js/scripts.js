(function ($) {
	"use strict";

	// Page Loaded...
	$(document).ready(function () {

		/*==========  Tooltip  ==========*/
		$('.tool-tip').tooltip();
		
		/*==========  Progress Bars  ==========*/
		$('.progress-bar').on('inview', function (event, isInView) {
			if (isInView) {
				$(this).css('width',  function() {
					return ($(this).attr('aria-valuenow')+'%');
				});
			}
			return false;
		});

		/*==========  Alerts  ==========*/
		$('.alert').on('inview', function (event, isInView) {
			if (isInView) {
				$(this).addClass('in');
			}
			return false;
		});
		$(function() {
			$('[data-hide]').on('click', function() {
				$(this).closest('.' + $(this).attr('data-hide')).fadeOut();
			});
		});

		/*==========  Accordion  ==========*/
		$('.panel-heading a').on('click', function() {
			$('.panel-heading').removeClass('active');
			$(this).parents('.panel-heading').addClass('active');
		});

		/*==========  Responsive Navigation  ==========*/
		$('.responsive-nav').html($('.main-nav').children().clone());
		$('.responsive-menu-open').on('click', function(event) {
			event.preventDefault();
			$('body').addClass('no-scroll');
			$('.responsive-menu').addClass('open');
		});
		$('.responsive-menu-close').on('click', function(event) {
			event.preventDefault();
			$('body').removeClass('no-scroll');
			$('.responsive-menu').removeClass('open');
		});

		/*==========  Home Slider  ==========*/
		$('#homeslider').flexslider({
			selector: '.slides > div',
			animation: 'fade',
			controlNav: false,
			prevText: '',
			nextText: ''
		});

		/*==========  Nivo Lightbox  ==========*/
		if ($('.popup-link').length) {
			$('.popup-link').nivoLightbox();
		}

	});
	
	/*==========  Validate Email  ==========*/
	function validateEmail($validate_email) {
		var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
		if( !emailReg.test( $validate_email ) ) {
			return false;
		} else {
			return true;
		}
		return false;
	}
	
	/*==========  Contact Form  ==========*/
	$('#contact-form').submit(function() {
		$('#contact-error').fadeOut();
		$('#contact-success').fadeOut();
		$('#contact-loading').fadeOut();
		$('#contact-loading').fadeIn();
		if (validateEmail($('#contact-email').val()) && $('#contact-email').val().length !== 0 && $('#contact-name').val().length !== 0 && $('#contact-message').val().length !== 0) {
			var action = $(this).attr('action');
			$.ajax({
				type: "POST",
				url : action,
				data: {
					contact_name: $('#contact-name').val(),
					contact_email: $('#contact-email').val(),
					contact_subject: $('#contact-subject').val(),
					contact_message: $('#contact-message').val()
				},
				success: function() {
					$('#contact-error').fadeOut();
					$('#contact-success').fadeOut();
					$('#contact-loading').fadeOut();
					$('#contact-success .message').html('Success! Thanks for contacting us!');
					$('#contact-success').fadeIn();
				},
				error: function() {
					$('#contact-error').fadeOut();
					$('#contact-success').fadeOut();
					$('#contact-loading').fadeOut();
					$('#contact-error .message').html('Sorry, an error occurred.');
					$('#contact-error').fadeIn();
				}
			});
		} else if (!validateEmail($('#contact-email').val()) && $('#contact-email').val().length !== 0 && $('#contact-name').val().length !== 0 && $('#contact-message').val().length !== 0) {
			$('#contact-error').fadeOut();
			$('#contact-success').fadeOut();
			$('#contact-loading').fadeOut();
			$('#contact-error .message').html('Please enter a valid email.');
			$('#contact-error').fadeIn();
		} else {
			$('#contact-error').fadeOut();
			$('#contact-success').fadeOut();
			$('#contact-loading').fadeOut();
			$('#contact-error .message').html('Please fill out all the fields.');
			$('#contact-error').fadeIn();
		}
		return false;
	});

	/*==========  Newsletter Form  ==========*/
	var $form = $('#mc-embedded-subscribe-form');
	$form.submit(function() {
		$('#newsletter-error').fadeOut();
		$('#newsletter-success').fadeOut();
		$('#newsletter-loading').fadeOut();
		$('#newsletter-loading').fadeIn();
		if (validateEmail($('#mce-EMAIL').val()) && $('#mce-EMAIL').val().length !== 0) {
			$.ajax({
				type: $form.attr('method'),
				url: $form.attr('action'),
				data: $form.serialize(),
				cache: false,
				dataType: 'json',
				contentType: 'application/json; charset=utf-8',
				error: function(err) {
					$('#newsletter-error').fadeOut();
					$('#newsletter-success').fadeOut();
					$('#newsletter-loading').fadeOut();
					$('#newsletter-error .message').html(err.msg);
					$('#newsletter-error').fadeIn();
				},
				success: function(data) {
					if (data.result !== 'success') {
						$('#newsletter-error').fadeOut();
						$('#newsletter-success').fadeOut();
						$('#newsletter-loading').fadeOut();
						$('#newsletter-info .message').html(data.msg);
						$('#newsletter-info').fadeIn();
					} else {
						$('#newsletter-error').fadeOut();
						$('#newsletter-success').fadeOut();
						$('#newsletter-loading').fadeOut();
						$('#newsletter-success .message').html(data.msg);
						$('#newsletter-success').fadeIn();
					}
				}
			});
		} else {
			$('#newsletter-error').fadeOut();
			$('#newsletter-success').fadeOut();
			$('#newsletter-loading').fadeOut();
			$('#newsletter-error .message').html('Please enter a valid email.');
			$('#newsletter-error').fadeIn();
		}
		return false;
	});

	/*==========  Map  ==========*/
	var map;
	function initialize_full_width_map() {
		if ($('#full-width-map').length) {
			var myLatLng = new google.maps.LatLng(-37.814199, 144.961560);
			var mapOptions = {
				zoom: 15,
				center: myLatLng,
				scrollwheel: false,
				panControl: false,
				zoomControl: true,
				scaleControl: false,
				mapTypeControl: false,
				streetViewControl: false
			};
			map = new google.maps.Map(document.getElementById('full-width-map'), mapOptions);
			var marker = new google.maps.Marker({
				position: myLatLng,
				map: map,
				title: 'Envato',
				icon: './images/marker.png'
			});
		} else {
			return false;
		}
		return false;
	}
	google.maps.event.addDomListener(window, 'load', initialize_full_width_map);

})(jQuery);