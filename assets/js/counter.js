 
// $('.counter-count').each(function () {
//     $(this).prop('Counter',0).animate({
//         Counter: $(this).text()
//     }, {
//         duration: 3000,
//         easing: 'swing',
//         step: function (now) {
//             $(this).text(Math.ceil(now));
//         }
//     });
// });
var section = document.querySelector('.counter');
var hasEntered = false;

window.addEventListener('scroll', (e) => {
    var shouldAnimate = (window.scrollY + window.innerHeight) >= section.offsetTop;

    if (shouldAnimate && !hasEntered) {
    hasEntered = true;

    $('.counter-count').each(function () {
        $(this).prop('Counter',0).animate({
        Counter: $(this).text()
        }, {
        duration: 4000,
        easing: 'swing',
        step: function (now) {
            $(this).text(Math.ceil(now));
        }
        });
    });

  }
});// -----------------------------
//  Count Up
// -----------------------------
function counter() {
  var oTop;
  if ($('.count').length !== 0) {
    oTop = $('.count').offset().top - window.innerHeight;
  }
  if ($(window).scrollTop() > oTop) {
    $('.count').each(function () {
      var $this = $(this),
        countTo = $this.attr('data-count');
      $({
        countNum: $this.text()
      }).animate({
        countNum: countTo
      }, {
        duration: 1000,
        easing: 'swing',
        step: function () {
          $this.text(Math.floor(this.countNum));
        },
        complete: function () {
          $this.text(this.countNum);
        }
      });
    });
  }
}
$(window).on('scroll', function () {
    
  counter();
});
