(function() {
  var WORDS_PER_MINUTE = 200;
  var TOP_CLASS_NAME = "top";
  var windowHeight = $(window).height();		
  var scrollTimeout;
  var fadeTimeout;
  var $container = $('#story');
  var style = "display:none;position:fixed;right:0;top:0;text-align:right;padding:0.25em 0.5em;margin:2em 0.75em 0.75em;background-color:rgba(244, 244, 244, 0.9);border-radius:10px;";
  $container.prepend('<h1 id="reading-time" style="' + style + '"></h1>');

  if($container.length < 1){
    return;
  }

  var countWordsBelowScroll = function() {
    var scrollTop = $(window).scrollTop();
    var count = 0;

    var contentContainers = $(':not(code, i, b, strong, em, div, a, span, img)', $container);

    contentContainers.each(function() {
      var $el = $(this);
      var offset = $el.offset();
      if (scrollTop <= offset.top) {
        var words = $el.text();
        count += words.split(/\s+/).length;
      }
    });

    return count;
  };

  var getMinutesFromWordCount = function(count) {
    return Math.round(count / WORDS_PER_MINUTE);
  };

  var showReadingTime = function(minutes) {
    var $readingTime = $('#reading-time');
    if(minutes > 0) {
      var xMinutes = minutes + ' minute' + (minutes === 1 ? '' : 's');
      $readingTime.text(xMinutes)
        .fadeIn(100);
    }
    fadeTimeout = setTimeout(function() {
      $readingTime.fadeOut(500);
    }, 500);
  };

  var countAndShowReadingTime = function() {
    var wordcount = countWordsBelowScroll();
    var minutes = getMinutesFromWordCount(wordcount);
    showReadingTime(minutes);
  };

  $(window).scroll(function(){
    if(scrollTimeout) {
      clearTimeout(scrollTimeout);
    }
    if(fadeTimeout) {
      clearTimeout(fadeTimeout);
    }
    scrollTimeout = setTimeout(function() {
      countAndShowReadingTime();
    }, 50);
  });

  countAndShowReadingTime();
})();
