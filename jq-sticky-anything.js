/**
* @preserve Sticky Anything 1.0.1 | @senff | GPL2 Licensed
*/

(function ($) {

  $.fn.stickThis = function(options) {

    var settings = $.extend({
      // Default
      top: 0
      }, options );

    var numElements = $(this).length;

    if (numElements < 1) {
      // There are no elements on the page with the called selector.
    } else if (numElements > 1) {
      // This is not going to work either. You can't make more than one element sticky. They will only get in eachother's way.
      // Make sure that you use an selector that applies to only ONE SINGLE element on the page.
      // Want to find out where all the elements are that you targeted? Uncomment the next line to debug.
      // $(this).css('border','solid 3px #00ff00');
    } else {
      // Create a clone of the menu, right next to original (in the DOM).
      $(this).addClass('original').clone().insertAfter(this).addClass('cloned').css('position','fixed').css('top',settings.top+'px').css('margin-top','0').css('margin-left','0').css('z-index','500').removeClass('original').hide();
      checkElement = setInterval(function(){stickIt(settings.top)},10);
    }

    return this;
  };


function stickIt(stickyTop) {

  var orgElementPos = $('.original').offset();
  orgElementTop = orgElementPos.top;               

  if ($(window).scrollTop() >= (orgElementTop - stickyTop)) {
    // scrolled past the original position; now only show the cloned, sticky element.

    // Cloned element should always have same left position and width as original element.     
    orgElement = $('.original');
    coordsOrgElement = orgElement.offset();
    leftOrgElement = coordsOrgElement.left;  
    widthOrgElement = orgElement.width();

    $('.cloned').css('left',leftOrgElement+'px').css('top',stickyTop+'px').css('width',widthOrgElement+'px').show();
    $('.original').css('visibility','hidden');
  } else {
    // not scrolled past the menu; only show the original menu.
    $('.cloned').hide();
    $('.original').css('visibility','visible');
  }
}

}(jQuery));
