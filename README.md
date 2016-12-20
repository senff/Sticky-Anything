STICKY ANYTHING - JQUERY PLUGIN
============================================

- Author: Mark Senff
- Version: 2.0.1
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


### Options

#### General

The following default options are provided by the plugin. None of them are required:

	$('.main-menu').stickThis({
        top:            0,		    // top position of sticky element, measured from 'ceiling'
        minscreenwidth: 0,		    // element will not be sticky when viewport width smaller than this
        maxscreenwidth: 999999,		// element will not be sticky when viewport width larger than this 
        zindex:         1,		    // z-index value of sticky element
        debugmode:      false,      // when true, errors will be logged to console
        pushup:         ''          // another (unique) element on the page that will 'push up' the sticky element
    });

More information below.


#### Top position

It's possible that you don't want your element to be sticky EXACTLY at the top of the page, but a little lower (so there is room between the "ceiling" and your element). In this case, add the necessary space as an option named "top", e.g.:

    $('.main-menu').stickThis({
        top:80
    });

If you use a negative number, the element will be sticky ABOVE the "ceiling", and will therefore be cut off a bit at the top, e.g.:

    $('.main-menu').stickThis({
        top:-35
    });

#### Minimum screen width

If you don't want your element to be sticky when the viewport is smaller than a certain width (for example, you don't want your menu to be sticky for mobile devices, or your site is responsive so that a smaller screen width changes the design enough to make stickiness unnecessary), you can add a minimum screen width. 

If you want your main menu to behave normally ("not sticky") for screens/widths smaller than 700 pixels:

    $('.main-menu').stickThis({
        minscreenwidth:700
    });

#### Maximum screen width

If you don't want your element to be sticky when the viewport is larger than a certain width (for example, you don't want your menu to be sticky for desktop devices while still use it for mobile devices, or your site is responsive so that a wider screen width changes the design enough to make stickiness unnecessary), you can add a maximum screen width. 

If you want your main menu to behave normally ("not sticky") for screens/widths wider than 1600 pixels:

    $('.main-menu').stickThis({
        maxscreenwidth:1600
    });

This setting can be combined with the Minimum screen width, so that stickiness can occur between certain screen widths only, for example:

    $('.main-menu').stickThis({
        maxscreenwidth:700,
        maxscreenwidth:1600
    });


#### Z-index

If your page has any elements that may obscure/overlap your sticky element, you can try to overrule that by assigning it a particular Z-index value, e.g.:

    $('.main-menu').stickThis({
        zindex:100
    });

Don't be lazy by assigning a value of 99999 -- that's definitely like shooting a mosquito with a bazooka. Although it'll probably work, it's often unnecessary. Try to find the Z-index of the element(s) that obscure(s) your sticky element, and add a few to it for your sticky one.


#### Debug mode

If you install the plugin and you see that your element is not sticky as you expected, it's usually because the selector you used either doesn't exist on your page, or there's more than one element with that selector. If that's the case but you really don't know what's going on, turn on debug mode and an error message will be displayed in your console:

    $('.main-menu').stickThis({
        debugmode:true
    });

Needless to say that you should never have this option set to TRUE in regular production environments.


#### Pushup

There are situations where you want to "unstick" your sticky element again, when another element (lower on the page) comes into view. A good example of this would be a page footer, that you don't want to be obscured by your sticky element. The so-called Push-up element is what you choose to push your sticky element up again (hence the name "push-up element"!). Usage is as follows:

    $('.sidebar').stickThis({
        pushup:'.page-footer';
    });
 

NOTES AND RESTRICTIONS AND BUGS AND STUFF
-----------------------------------------

- Recommended use is to call *jq-sticky-anything.min.js*. The other JS file, *jq-sticky-anything.js*, is functional and works fine too, but is only included for study purposes, to show more clearly what the code does.

- When you attach "stickThis" to your element of choice, make sure that the selector applies to only ONE element on the page. If it applies to more than one, nothing will get sticky (even IF this would be enabled, things would just get in eachother's way at the top of the page). Hence, only use selectors that are unique on the page. See "Debug mode" above to find out why an element might not be sticky.

- Although this plugin works fine even down to IE7, it will not work if you try to stick any HTML5 elements (`<NAV>`, `<HEADER>`, `<ARTICLE>`, etc), not even when you use a polyfill like HTML5shiv or Modernizr, and not even when you just use the classname and don't include the element name. You can only stick HTML5 elements in IE9 and up.

- If you need to use this in your WordPress site, I recommend using the WordPress plugin that you can download directly from the WP plugin repository: https://wordpress.org/plugins/sticky-menu-or-anything-on-scroll


CHANGELOG
---------

= 2.0.1 =
* Changed fundamental method from creating a clone and making that sticky, to making the same actual element sticky
* Added push-up element

= 1.1.3 =
* Added min/max screen width
* Synced version number with WordPress plugin version

= 1.1.1 =
* Fixed width detection bug (thanks @sambrannon)

= 1.1 =
* Added debug option
* Added Z-index option

= 1.0.1 =
* Fix for top position and left margin.

= 1.0 =
* Initial release


LICENSE DETAILS
---------------
The GPL license of Sticky Anything grants you the right to use, study, share (copy), modify and (re)distribute the software, as long as these license terms are retained. 
