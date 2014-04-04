angular-responsive-nav
======================

A simple, responsive horizontal nav bar that will collapse options into a "More" dropdown as the screen gets smaller. All you really need is the directive and the css (the media queries do most of the work).

If you are not already using <a href="https://github.com/angular-ui/bootstrap">angular-ui</a>/<a href="http://getbootstrap.com/css/">twitter bootstrap css</a>, the files in the dropdown folder contains some extras you'll need to get the More menu to display. You can write your own directive and make it look any you want to, of course.  But I decided to include it here to make it easy for you to get it up and running.

The simple-sample.html will work just fine if clicking on a nav item simply redirects to another page, or does some other action that does not require listening for the event.

The broadcast-sample.html is an example where the display area is a sibling controller of the nav's controller, but you need a way to let the other controller know a nav item was clicked. 

The directive looks for a few different attributes:

	- max-in-view: indicates the maximum items to display. This should correspond to the what's set in the css ( i.e., 			.nav-filter > ul > li:nth-child(n+4) { display: none; }
	- get-items: the method to call to populate the items. The method must return a promise.
	- on-item-click-callback: the method to call to handle the click event.
	- broadcast-key: if the on-item-click-callback won't work for you because of scope limitations, set this and listen 		for the broadcast.