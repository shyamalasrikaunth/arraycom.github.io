jQuery(document).ready(function ($) {
    $('.hero').slick({
      dots: true,
      infinite: true,
      speed: 500,
      fade: !0,
      cssEase: 'linear',
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2000,
      draggable: false,
      arrows: false,
      responsive: [
      {
      breakpoint: 1024,
      settings: {
      slidesToShow: 1,
      slidesToScroll: 1,
      infinite: true
                }
      },
      {
      breakpoint: 768,
      settings: {
      draggable: true,
                }
      },
      {
      breakpoint: 600,
      settings: {
      slidesToShow: 1,
      draggable: true,
      slidesToScroll: 1
                }
      },
      {
      breakpoint: 480,
      settings: {
      slidesToShow: 1,
      draggable: true,
      slidesToScroll: 1
                }
      }
  
                ]
                });
      });		