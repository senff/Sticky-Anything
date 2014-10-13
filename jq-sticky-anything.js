/**
* @preserve Sticky Anything 1.1.3 | @senff | GPL2 Licensed
*/

(function ($) {

  $.fn.stickThis = function(options) {

    var settings = $.extend({
      // Default
      top: 0,
      minscreenwidth: 0, 
      maxscreenwidth: 99999,       
      zindex: 1,
      debugmode: false
      }, options );

    var numElements = $(this).length;

    if (numElements < 1) {
      // There are no elements on the page with the called selector.
      if(settings.debugmode == true) {
        console.error('STICKY ANYTHING DEBUG: There are no elements with the class/ID you selected.');
      }
    } else if (numElements > 1) {
      // This is not going to work either. You can't make more than one element sticky. They will only get in eachother's way.
      // Make sure that you use an selector that applies to only ONE SINGLE element on the page.
      // Want to find out quickly where all the elements are that you targeted? Uncomment the next line to debug.
      // $(this).css('border','solid 3px #00ff00');
      if(settings.debugmode == true) {
        console.error('STICKY ANYTHING DEBUG: There is more than one element with the class/ID you selected. You can only make ONE element sticky.');
      }
    } else {
      // Create a clone of the menu, right next to original (in the DOM).
      $(this).addClass('original').clone().insertAfter(this).addClass('cloned').css('position','fixed').css('top',settings.top+'px').css('margin-top','0').css('margin-left','0').css('z-index',settings.zindex).removeClass('original').hide();
      checkElement = setInterval(function(){stickIt(settings.top,settings.minscreenwidth,settings.maxscreenwidth)},10);
    }

    return this;
  };


function stickIt(stickyTop,minwidth,maxwidth) {

  var orgElementPos = $('.original').offset();
  orgElementTop = orgElementPos.top;

  // Calculating actual viewport width
  var e = window, a = 'inner';
  if (!('innerWidth' in window )) {
    a = 'client';
    e = document.documentElement || document.body;
  }
  viewport = e[ a+'Width' ];

  if (($(window).scrollTop() >= (orgElementTop - stickyTop)) && (viewport >= minwidth) && (viewport <= maxwidth)) {

    // scrolled past the original position; now only show the cloned, sticky element.

    // Cloned element should always have same left position and width as original element.
    orgElement = $('.original');
    coordsOrgElement = orgElement.offset();
    leftOrgElement = coordsOrgElement.left;
    widthOrgElement = orgElement.css('width');

    $('.cloned').css('left',leftOrgElement+'px').css('top',stickyTop+'px').css('width',widthOrgElement).show();
    $('.original').css('visibility','hidden');
  } else {
    // not scrolled past the menu; only show the original menu.
    $('.cloned').hide();
    $('.original').css('visibility','visible');
  }
}

}(jQuery));
