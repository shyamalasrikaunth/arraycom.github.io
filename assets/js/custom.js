(function ($) {
	
	"use strict";

	// Header Type = Fixed
  $(window).scroll(function() {
    var scroll = $(window).scrollTop();
    var box = $('.header-text').height();
    var header = $('header').height();

    if (scroll >= box - header) {
      $("header").addClass("background-header");
    } else {
      $("header").removeClass("background-header");
    }
  });


  // Acc
    $(document).on("click", ".naccs .menu div", function() {
      var numberIndex = $(this).index();

      if (!$(this).is("active")) {
          $(".naccs .menu div").removeClass("active");
          $(".naccs ul li").removeClass("active");

          $(this).addClass("active");
          $(".naccs ul").find("li:eq(" + numberIndex + ")").addClass("active");

          var listItemHeight = $(".naccs ul")
            .find("li:eq(" + numberIndex + ")")
            .innerHeight();
          $(".naccs ul").height(listItemHeight + "px");
        }
    });


	$('.owl-listing').owlCarousel({
		items:1,
		loop:true,
		dots: true,
		nav: false,
		autoplay: true,
		margin:30,
		  responsive:{
			  0:{
				  items:1
			  },
			  600:{
				  items:1
			  },
			  1000:{
				  items:1
			  },
			  1600:{
				  items:1
			  }
		  }
	})
	

	// Menu Dropdown Toggle
  if($('.menu-trigger').length){
    $(".menu-trigger").on('click', function() { 
      $(this).toggleClass('active');
      $('.header-area .nav').slideToggle(200);
    });
  }


	// Page loading animation
	 $(window).on('load', function() {

        $('#js-preloader').addClass('loaded');

    });

	

	




})(window.jQuery);

var slideCount = document.querySelectorAll(".slider").length - 1;
var slideIndex = 1;
var direction;
var sliderSpeed = 700;
var sliderAutoplayTime = 3000;
var sliderHeight = 600;
var sliderWidth = $(".slider-wrapper").width();

if ($(window).width() > 767) {
	desktopSlider();
} else {
	mobileSlider();
}

function desktopSlider() {
	direction = "left";

	$(".slider.first").css("left", 0);

	var timer = setInterval(() => {
		playAnimation("left", "left", ".slider", "right");
	}, sliderAutoplayTime);

	$(".slider").click(function () {
		let elem = $(this);
		let index = parseInt(elem.data("index"));
		let position;

		clearInterval(timer);

		slideIndex = index;

		if ($(`.slider:nth-of-type(${index + 2})`).hasClass("slide")) {
			if (index == 3) {
				return false;
			} else {
				$(".slider").each(function (pos, el) {
					if ($(`.slider:nth-of-type(${pos + 2})`).hasClass("slide") && pos >= index) {
						position = sliderWidth - (slideCount - (pos + 1)) * 50 + "px";
						$(`.slider:nth-of-type(${pos + 2})`)
							.stop()
							.animate({ left: position }, sliderSpeed);
						$(`.slider:nth-of-type(${pos + 2})`).toggleClass("active slide");
					}
				});
			}
		} else {
			if (index == 1) {
				position = index * 50 + "px";
				elem.stop().animate({ left: position }, 500);
				elem.toggleClass("slide");
			} else {
				$(".slider").each(function (pos, el) {
					if (pos != 0 && !$(el).hasClass("slide") && pos <= index) {
						position = pos * 50 + "px";
						$(el).stop().animate({ left: position }, sliderSpeed);
						$(el).toggleClass("slide");
					}
				});
			}
		}

		checkIndex("left", "right");
		timer = setInterval(() => {
			playAnimation("left", "left", ".slider", "right");
		}, sliderAutoplayTime);
	});
}

function mobileSlider() {
	direction = "top";

	$(".m-slider.first").css("top", 0);

	var timer = setInterval(() => {
		playAnimation("top", "top", ".m-slider", "bottom");
	}, sliderAutoplayTime);

	$(".m-slider").click(function () {
		let elem = $(this);
		let index = parseInt(elem.data("index"));
		let position;

		clearInterval(timer);

		slideIndex = index;

		if (index == 0) return false;

		if (elem.hasClass("slide")) {
			$(".m-slider").each(function (pos, el) {
				if ($(el).hasClass("slide") && pos >= index) {
					position = sliderHeight - (slideCount - pos + 1) * 50 + "px";
					$(el).stop().animate({ top: position }, sliderSpeed);
					$(el).toggleClass("slide");
				}
			});
		} else {
			$(".m-slider").each(function (pos, el) {
				if (pos != 0 && !$(el).hasClass("slide") && pos <= index) {
					position = pos * 50 + "px";
					$(el).stop().animate({ top: position }, sliderSpeed);
					$(el).toggleClass("slide");
				}
			});
		}

		checkIndex("top", "bottom");
		timer = setInterval(() => {
			playAnimation("top", "top", ".m-slider", "bottom");
		}, sliderAutoplayTime);
	});
}

/**
 * Play animation
 * @param {string} sliderDirection it is direction of slider (left-right, top-bottom)
 * @param {string} animateDirection it is a direction of animation (left, top)
 * @param {string} sliderClass the class of slider, in case of desktop ".slider" and mobile ".m-slider"
 * @param {string} secondaryDirection it is a second parameter of checkIndex function
 * @function
 * return void
 */
function playAnimation(sliderDirection, animateDirection, sliderClass, secondaryDirection) {
	var position;
	if (direction === sliderDirection) {
		position = slideIndex * 50 + "px";
		$(`${sliderClass}:nth(${slideIndex})`).addClass("slide");
	} else {
		if (sliderDirection == "left") {
			position = sliderWidth - (slideCount - slideIndex) * 50 + "px";
		} else {
			position = sliderHeight - (slideCount - (slideIndex - 1)) * 50 + "px";
		}
		$(`${sliderClass}:nth(${slideIndex})`).removeClass("slide");
	}

	let animationParams = {};
	animationParams[animateDirection] = position;

	$(`${sliderClass}:nth(${slideIndex})`)
		.stop()
		.animate(animationParams, sliderSpeed, function () {
			checkIndex(animateDirection, secondaryDirection);
		});
}

/**
 * It is check the slider direction and increase or decreases
 * the sliderIndex variable.
 * @param {string} direction1 primary slider direction
 * @param {string} direction2 secondary slider direction
 * @function
 * return void
 */
function checkIndex(direction1, direction2) {
	if (slideIndex == 1 && direction == direction2) {
		direction = direction1;
	} else if (slideIndex >= 1 && direction == direction1 && slideIndex < slideCount) {
		slideIndex++;
	} else if ((slideIndex == slideCount || slideIndex < slideCount) && direction == direction2) {
		slideIndex--;
	} else if (slideIndex == slideCount) {
		direction = direction2;
	}
}
