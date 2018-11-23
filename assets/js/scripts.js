var $ = jQuery;
// Avoid `console` errors in browsers that lack a console.
(function() {
  var method
  var noop = function() {}
  var methods = [
    "assert",
    "clear",
    "count",
    "debug",
    "dir",
    "dirxml",
    "error",
    "exception",
    "group",
    "groupCollapsed",
    "groupEnd",
    "info",
    "log",
    "markTimeline",
    "profile",
    "profileEnd",
    "table",
    "time",
    "timeEnd",
    "timeline",
    "timelineEnd",
    "timeStamp",
    "trace",
    "warn"
  ]
  var length = methods.length
  var console = (window.console = window.console || {})

  while (length--) {
    method = methods[length]

    // Only stub undefined methods.
    if (!console[method]) {
      console[method] = noop
    }
  }
})()
if (typeof jQuery === "undefined") {
  console.warn("jQuery hasn't loaded")
} else {
  console.log("jQuery " + jQuery.fn.jquery + " has loaded")
}
// Place any jQuery/helper plugins in here.
$(document).ready(function() {
  $('.map-overlay .component-button').on('click', function(e){
    // var $parent = $(this).parent();
    // if ($parent.hasClass('active')) {
    // } else {
    //   console.log('inactive');
    //   $('.tab-list .active').removeClass('active');
    //   $parent.addClass('active');
    // }

    $('.tab-list .tab, .item-list .item').each(function( index ) {
      $(this).toggleClass('active');
      $(this).toggleClass('inactive');
    });

  })

})
