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
  // $('.slide').each(function (indexInArray, valueOfElement) {
  //   var img = $(this).attr('data-thumb');
  //   $(this).find('img').attr('src', img);
  //   var bgi = 'url("' + img + '");';
  //   $(this).find('.component-image').css({
  //     'background-image' : bgi,
  //     'background-position':  '50% 50%;'
  //   });

  // })



})
