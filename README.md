STICKY ANYTHING - JQUERY PLUGIN
============================================

- Author: Mark Senff
- Version: 1.0
- Plugin URL: https://github.com/senff/Sticky-Anything
- Author URL: http://www.senff.com
- License: GNU General Public License v2 or later
- License URI: http://www.gnu.org/licenses/gpl-2.0.html



DESCRIPTION
-----------
The Sticky Anything plugin allows you to make any element on your page "sticky" as soon as it hits the top of the page when you scroll down. Although this is commonly used to keep menus at the top of your page, the plugin actually allows you to make ANY element sticky (such as a Call To Action box, a logo, etc.)



USAGE
-----

Put the minified JS file *jq-sticky-anything.min.js* in your JS folder (or wherever you like, of course) and call it in your document -- after you load your jQuery library and before your custom jQuery code/calls:

    <script src="/path/to/plugin/jq-sticky-anything.min.js"></script>

In your custom jQuery calls, attach the function "stickThis" to the element you want to stick at the top of the screen:

    $('.main-menu').stickThis();


Options
-------

Actually, that should be called "Option" as there is only ONE. It's possible that you don't want your element to be sticky EXACTLY at the top of the page, but a little lower (so there is room between the "ceiling" and your element). In this case, add the necessary space as an option named "top", e.g.:

    $('.main-menu').stickThis({
        top:80
    });

If you use a negative number, the element will be sticky ABOVE the "ceiling", and will therefore be cut off a bit at the top, e.g.:

    $('.main-menu').stickThis({
        top:-35
    });



NOTES AND RESTRICTIONS AND BUGS AND STUFF
-----------------------------------------

- Recommended use is to call *jq-sticky-anything.min.js*. The other JS file, *jq-sticky-anything.js*, is functional and works fine too, but is only included for study purposes, to show more clearly what the code does.

- When you attach "stickThis" to your element of choice, make sure that the selector applies to only ONE element on the page. If it applies to more than one, nothing will get sticky (even IF this would be enabled, things would just get in eachother's way at the top of the page). Hence, only use selectors that are unique on the page.

- Although this plugin works fine even down to IE7, it will not work if you try to stick any HTML5 elements (`<NAV>`, `<HEADER>`, `<ARTICLE>`, etc, not even when you use a polyfill like HTML5shiv or Modernizr, and not even when you just use the classname and don't include the element name. You can only stick HTML5 elements in IE9 and up.



LICENSE DETAILS
---------------
The GPL license of Sticky Anything grants you the right to use, study, share (copy), modify and (re)distribute the software, as long as these license terms are retained. 





