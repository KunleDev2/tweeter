/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
  const baseUrl = "http://localhost:8080";
  const maxTweetLength = 140;
  const submitForm = $('#submit-form');
  const getFormData = $('#new-form');

  submitForm.on('click', function(event) {
    event.preventDefault();

    const $postingData = $(getFormData).serialize();
    const $textData = $('#tweet-text').val().length;
    const $errorMsg = $('.error-msg');

    if ($textData > maxTweetLength) {
      $errorMsg.slideUp();
      setTimeout(function() {
        $errorMsg.text('Lenght is greater than 140 in lenght');
        $errorMsg.slideDown();
      }, 500);
      return;
    } else if ($textData < 1) {
      $errorMsg.slideUp();
      setTimeout(function() {
        $errorMsg.text('Field can not be empty');
        $errorMsg.slideDown();
      }, 500);
      return;
    };

    // function to post tweet to endpoint
    $.ajax({
      url: baseUrl + '/tweets',
      type: 'POST',
      data: $postingData,
      success: function(resp) {
        $('#tweet-text').val('');
        $('#fresh-tweet').empty();
        $errorMsg.slideUp();
        $('.counter').val(maxTweetLength);
        loadTweets();
      },
      error: function(error) {
        $errorMsg.slideUp();
        $('.counter').val(maxTweetLength);
        console.log(error);
      }
    });

  });

  const renderTweets = (tweets) => {
    let result = '';
    const revTweet = tweets.reverse();

    // loop through tweets
    for (let i = 0; i < tweets.length; i++) {

      result = createTweetElement(revTweet[i]);

      $('#fresh-tweet').append(result);
    };
  };

  const createTweetElement = function(tweet) {
    const $tweet = $(`<article class="tweet">
  <header>
    <span>
      <img src="${getEscape(tweet.user.avatars)}" alt="">
      <a>${getEscape(tweet.user.name)}</a>
    </span>
    <a class="profile-style">${getEscape(tweet.user.handle)}</a>
  </header>

  <body>
    <div class="tweet-text">
    ${getEscape(tweet.content.text)}
    </div>
    <hr>
  </body>
  <footer>
    <span>${timeago.format(getEscape(tweet.created_at))}</span>
    <div>
      <i class="fa-solid fa-flag"></i>
      <i class="fa-sharp fa-solid fa-repeat"></i>
      <i class="fa-solid fa-heart"></i>
    </div>
  </footer>
</article>`);

    return $tweet;
  };

  const getEscape = function(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  // function to get tweet from endpoint
  const loadTweets = () => {
    $.ajax({
      url: baseUrl + '/tweets',
      type: 'GET',
      success: function(resp) {
        renderTweets(resp);
      },
      error: function(error) {
        console.log(error);
      }
    });
  };

  loadTweets();
});