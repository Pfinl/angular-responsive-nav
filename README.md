angular-responsive-nav
======================

A simple, responsive horizontal navigation bar that will collapse options into a "More" dropdown as the screen gets smaller. All you really need is the directive and the css (the media queries do most of the work). There is no dependency on jQuery.

If you are not already using <a href="https://github.com/angular-ui/bootstrap">angular-ui</a>/<a href="http://getbootstrap.com/css/">twitter bootstrap css</a>, the files in the dropdown folder contains some extras you'll need to get the More menu to display. The nav.js and nav.css files also contain the dropdown extras commented out. You can write your own directive and make it look any you want to, of course. But I decided to include it here to make it easy to get it up and running.

The simple-sample.html is a full page example where clicking an item will simply call the callback method supplied.

The broadcast-sample.html is an example where the display area may be a sibling controller of the nav's controller, but you need a way to let the sibling controller know a nav item was clicked, hence the broadcast. 

The responsive-nav.html file is the template for the directive.

The directive looks for the following attributes:

- max-in-view: indicates the maximum items to display. This should correspond to what is set in the css ( i.e., 		.nav-filter > ul > li:nth-child(n+4) { display: none; } )
- get-items: the method to call to populate the items. The method must return a promise.
- item-click: the method to call to handle the click event.
- broadcast-key: if the item-click won't completely work for you because of scope limitations, set this and listen 		for the broadcast instead.
