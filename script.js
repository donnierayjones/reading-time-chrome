(function() {
  // > The average adult reads prose text at 250 to 300 words per minute
  // http://en.wikipedia.org/wiki/Words_per_minute
  var WORDS_PER_MINUTE = 275;
  var TOP_CLASS_NAME = "top";
  var READING_TIME_ID = "reading-time";

  var scrollTimeout;
  var fadeTimeout;

  var sites = {
    instapaper: {
      container: $('#story'),
      addReadingTimeContainer: function() {
        var style = "display:none;position:fixed;right:0;top:40px;text-align:right;padding:0.25em 0.5em;margin:0.25em 0.75em;background-color:rgba(244, 244, 244, 0.9);border-radius:10px;";
        this.container.prepend('<h1 id="' + READING_TIME_ID + '" style="' + style + '"></h1>');
      }
    },
    readability: {
      container: $('.entry-content'),
      addReadingTimeContainer: function() {
        var backgroundColor = $('body').css('background-color');
        var style = "display:none;position:fixed;right:0;top:10px;text-align:right;padding:0.25em 0.5em;margin:0.25em 0.75em;border-radius:10px;";
        style += 'background-color:' + backgroundColor + ';';
        this.container.prepend('<h1 id="' + READING_TIME_ID + '" style="' + style + '"></h1>');
      }
    }
  };

  var domain = window.location.hostname
    .replace('www.', '')
    .replace('.com', '');

  var site = sites[domain];

  if(site.container.length < 1){
    return;
  }

  site.addReadingTimeContainer();

  var countWordsBelowScroll = function() {
    var scrollTop = $(window).scrollTop();
    var count = 0;

    var contentContainers = $(':not(code, i, b, strong, em, div, a, span, img, sup, sub)', site.container);

    var i = 0;
    contentContainers.each(function() {
      var $el = $(this);
      var offset = $el.offset();
      if (scrollTop <= offset.top) {
        var words = $el.text().split(/\s+/);
        count += words.length;
      }
    });

    // debugging:
    //console.log('contentContainers:', contentContainers.length);
    //console.log('wordsBelowTheScroll:', count);
    //console.log('wordTotal:', site.container.text().split(/\s+/).length);
    //contentContainers.each(function() {
      //console.log(this);
    //});

    return count;
  };

  var getMinutesFromWordCount = function(count) {
    return Math.round(count / WORDS_PER_MINUTE);
  };

  var showReadingTime = function(minutes) {
    var $readingTime = $('#' + READING_TIME_ID);
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
