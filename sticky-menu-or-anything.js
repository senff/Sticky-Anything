/**
* @preserve Sticky Anything 0.91 | @senff | GPL2 Licensed
* NOT READY FOR RELEASE YET.
*/

(function ($) {
 
    $.fn.stickOnTop = function() {

        // Create a clone of the menu, right next to original (in the DOM).
        $(this).addClass('original').clone().insertAfter(this).addClass('cloned').css('position','fixed').css('top','0').css('margin-top','0').css('z-index','500').removeClass('original').hide();

        stickIt();
        $(window).resize(function() {stickIt();});
        $(window).scroll(function() {stickIt();});

        return this;
    };


    function stickIt() {
              
      var orgElementPos = $('.original').offset();
      orgElementTop = orgElementPos.top;               

      stickyTop = 0;
      
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
