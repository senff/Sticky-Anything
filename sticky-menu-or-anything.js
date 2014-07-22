(function ($) {
 
    $.fn.stickOnTop = function() {

        // Create a clone of the menu, right next to original (in the DOM).
        $(this).addClass('original').clone().insertAfter(this).addClass('cloned').css('position','fixed').css('top','0').css('margin-top','0').removeClass('original').hide();

        stickWhat = document.querySelector('.original');   // stickWhat = document.querySelector(this.selector); is deprecated now??

        stickIt(stickWhat);
        $(window).resize(function() {stickIt(stickWhat);});
        $(window).scroll(function() {stickIt(stickWhat);});

        return this;
    };


    function stickIt(theElement) {
        
        var elementPos = theElement.offsetTop;
        stickyTop = 0;
      
       if (jQuery(window).scrollTop() >= (elementPos - stickyTop)) {
         // scrolled past the menu; only show the cloned, sticky menu.
         
         // Cloned element should always have same left position and width as original element.     
         orgElement = $('.original');
         coordsOrgElement = orgElement.offset();
         widthOrgElement = orgElement.width();
         posLeft = coordsOrgElement.left;     
       
         jQuery('.cloned').css('left',posLeft+'px').css('top',stickyTop+'px').css('width',widthOrgElement+'px').show();
         jQuery('.original').css('visibility','hidden');
       } else {
         // not scrolled past the menu; only show the original menu.
         jQuery('.cloned').hide();
         jQuery('.original').css('visibility','visible');
       }
    }

 
}(jQuery));
