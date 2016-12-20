/**
* @preserve Sticky Anything 2.0.1 | @senff | GPL2 Licensed
*/

(function ($) {

  $.fn.stickThis = function(options) {

    var settings = $.extend({
      // Default
      top: 0,
      minscreenwidth: 0, 
      maxscreenwidth: 99999, 
      zindex: 1, 
      debugmode: false,
      pushup: ''
      }, options );

    var numElements = $(this).length;
    var numPushElements = $(settings.pushup).length;

    if (numPushElements < 1) {
      // There are no elements on the page with the called selector for the Push-up Element.
      if((settings.debugmode == true) && (settings.pushup)) {
        console.error('STICKY ANYTHING DEBUG: There are no elements with the selector/class/ID you selected for the Push-up element ("'+settings.pushup+'").');
      }
      // Resetting it to NOTHING.
      settings.pushup = '';
    } else if (numPushElements > 1) {
      // You can't use more than one element to push up the sticky element.
      // Make sure that you use a selector that applies to only ONE SINGLE element on the page.
      // Want to find out quickly where all the elements are that you targeted? Uncomment the next line to debug.
      // $(settings.pushup).css('border','solid 3px #ff0000');
      if(settings.debugmode == true) {
        console.error('STICKY ANYTHING DEBUG: There are '+numPushElements+' elements on the page with the selector/class/ID you selected for the push-up element ("'+settings.pushup+'"). You can select only ONE element to push the sticky element up.');
      }  
      // Resetting it to NOTHING.
      settings.pushup = '';
    } 

    if (numElements < 1) {
      // There are no elements on the page with the called selector.
      if(settings.debugmode == true) {
        console.error('STICKY ANYTHING DEBUG: There are no elements with the selector/class/ID you selected for the sticky element ("'+this.selector+'").');
      }
    } else if (numElements > 1) {
      // This is not going to work either. You can't make more than one element sticky. They will only get in eachother's way.
      // Make sure that you use a selector that applies to only ONE SINGLE element on the page.
      // Want to find out quickly where all the elements are that you targeted? Uncomment the next line to debug.
      // $(this).css('border','solid 3px #00ff00');
      if(settings.debugmode == true) {
        console.error('STICKY ANYTHING DEBUG: There There are '+numPushElements+' elements with the selector/class/ID you selected for the sticky element ("'+this.selector+'"). You can only make ONE element sticky.');
      }  
    } else {

      // CALLING THE MAIN FUNCTION
      $(this).addClass('sticky-element-original').addClass('sticky-element-not-sticky');
      orgAssignedStyles = cssStyles($(this)); // All original element styles, assigned by CSS.
      orgInlineStyles = $('.sticky-element-original').attr('style');
      if (orgInlineStyles == null) {
          orgInlineStyles = '';
      }

      createPlaceholder();
      checkElement = setInterval(function(){stickIt(settings.top,settings.minscreenwidth,settings.maxscreenwidth,settings.zindex,settings.pushup,orgAssignedStyles,orgInlineStyles)},10);

    }

    return this;
  };


  function stickIt(stickyTop,minwidth,maxwidth,stickyZindex,pushup,originalAssignedStyles,originalInlineStyles) {

    // We need to check the position of the ACTIVE element to determine if we've scrolled enough.
    // This is the original one when it's not sticky, but when it's sticky, it's the placeholder.
    $listenerElement = $('.sticky-element-active');

    var orgElementPos = $listenerElement.offset();
    orgElementTop = orgElementPos.top;

    if(pushup) {
      var pushElementPos = $(pushup).offset();
      pushElementTop = pushElementPos.top;    
    } 

    // Calculating actual viewport width
    var e = window, a = 'inner';
    if (!('innerWidth' in window )) {
      a = 'client';
      e = document.documentElement || document.body;
    }
    viewport = e[ a+'Width' ];

    if (($(window).scrollTop() >= (orgElementTop - stickyTop)) && (viewport >= minwidth) && (viewport <= maxwidth)) {

      // We've scrolled PAST the original position; this is where we need to make the element sticky.

      // Placeholder element should always have same left position as original element (see comment below).     
      // The sticky element will NOT have a TOP or the LEFT margin. This is because the left/top reference point of the original
      // element does not consider the margin. So, we're checking the left/top point of the actual original element and then 
      // use that position for the sticky element.

      // LEFT POSITION
          coordsOrgElement = $listenerElement.offset();
          leftOrgElement = coordsOrgElement.left;  // This is the position REGARDLESS of the margin.

      // WIDTH/HEIGHT
      // The placeholder needs to have the width and height of the original element, WITHOUT the margins but WITH the padding and borders
      // Whatever margins the original has, the placeholder needs to have that too.

          widthPlaceholder = $listenerElement[0].getBoundingClientRect().width;
          if (!widthPlaceholder) {
            widthPlaceholder = $listenerElement.css('width');  // FALLBACK for subpixels
          }
          heightPlaceholder = $listenerElement[0].getBoundingClientRect().height;
          if (!heightPlaceholder) {
            heightPlaceholder = $listenerElement.css('height');  // FALLBACK for subpixels
          }

      // WIDTH/HEIGHT OF STICKY ELEMENT
      // The original element though, needs to have the inner width and height of the original (non-sticky) element
      // No padding, no borders, because that will be applied later anyway, regardless of box-sizing
          widthSticky = $('.sticky-element-original').css('width');
          if(widthSticky == '0px') {
            widthSticky = ($('.sticky-element-original')[0].getBoundingClientRect().width);
          }
          heightSticky = $('.sticky-element-original').height();

      // PADDING
      // If padding is percentages, convert to pixels when it becomes sticky
      // Just a leftover from the old method. We will not use padding for the placeholder
          paddingOrgElement = [$('.sticky-element-original').css('padding-top'), $('.sticky-element-original').css('padding-right'), $('.sticky-element-original').css('padding-bottom'),$('.sticky-element-original').css('padding-left')];
          paddingSticky = paddingOrgElement[0] + ' ' + paddingOrgElement[1] + ' ' + paddingOrgElement[2] + ' ' + paddingOrgElement[3];

      // MARGIN
          marginOrgElement = [$listenerElement.css('margin-top'), $listenerElement.css('margin-right'), $listenerElement.css('margin-bottom'),$listenerElement.css('margin-left')];
          marginPlaceholder = marginOrgElement[0] + ' ' + marginOrgElement[1] + ' ' + marginOrgElement[2] + ' ' + marginOrgElement[3];

      // OTHER ELEMENTS
      // if original has float, display, etc., we need to assign that to the placeholder
      // Though not as important as the width/height/margin/padding

          assignedStyles = '';
          for (var importantStyle in originalAssignedStyles) {
            if (originalAssignedStyles[importantStyle] == 'inline') {
              assignedStyles += importantStyle+':inline-block; '; 
            } else {
              assignedStyles += importantStyle+':'+originalAssignedStyles[importantStyle]+'; '; 
            }
          }

      // Fixes bug where height of original element returns zero
      // Is this still needed for the post-2.0 mode??
      elementHeight = 0;
      if (heightPlaceholder < 1) {
        elementHeight = $('.sticky-element-cloned').outerHeight();
      } else {
        elementHeight = $('.sticky-element-original').outerHeight();
      }

      // If scrolled position = pushup-element (top coordinate) - space between top and element - element height
      // In other words, if the pushup element hits the bottom of the sticky element
      if (pushup && ($(window).scrollTop() > (pushElementTop-stickyTop-elementHeight))) {
        stickyTopMargin = (pushElementTop-stickyTop-elementHeight-$(window).scrollTop());
      } else {
        stickyTopMargin = 0;
      }
      
      assignedStyles += 'width:'+widthPlaceholder+'px; height:'+heightPlaceholder+'px; margin:'+marginPlaceholder+';';

      $('.sticky-element-original').removeClass('sticky-element-not-sticky').addClass('sticky-element-sticky').removeClass('sticky-element-active').css('position','fixed').css('left',leftOrgElement+'px').css('top',stickyTop+'px').css('width',widthSticky).css('margin-left',0).css('padding',paddingSticky).css('margin-top',stickyTopMargin).css('z-index',stickyZindex);
      if(!$('.sticky-element-placeholder').hasClass('sticky-element-active')) {
        $('.sticky-element-placeholder').addClass('sticky-element-active').attr('style',assignedStyles);
      }

    } else {
      // not scrolled past the menu; only show the original element.
      $('.sticky-element-original').addClass('sticky-element-not-sticky').removeClass('sticky-element-sticky').addClass('sticky-element-active').attr('style',originalInlineStyles);
      if($('.sticky-element-placeholder').hasClass('sticky-element-active')) {
        $('.sticky-element-placeholder').removeClass('sticky-element-active').removeAttr('style').css('width','0').css('height','0').css('margin','0').css('padding','0');
      }
    }

  }


  function createPlaceholder() {
    $('.sticky-element-original').addClass('sticky-element-active').before('<div class="sticky-element-placeholder" style="width:0; height:0; margin:0; padding:0; visibility:hidden;"></div>');
  }


  // Helper function: get the important CSS rules from an element
  function cssStyles(el) {
    o = {};
    
    o['display'] = el.css('display');
    o['float'] = el.css('float');
    o['flex'] = el.css('flex');
    o['box-sizing'] = el.css('box-sizing');
    o['clear'] = el.css('clear');
    o['overflow'] = el.css('overflow');
    o['transform'] = el.css('transform');

    // For some reason, this original loop doesn't work with some themes/plugins.
    // importantStyles = ['display','float','flex','box-sizing','clear','overflow','transform'];
    // for(var styleProp in importantStyles) {
    //   o[importantStyles[styleProp]] = el.css(importantStyles[styleProp]);
    // }
    
    return o;
  }

}(jQuery));
