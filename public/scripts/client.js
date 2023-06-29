/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
  const submitForm = document.getElementById('submit-form');
  const getFormData = document.getElementById('new-form');

  submitForm.addEventListener('click', function(event) {
    event.preventDefault();

    const postingData = $(getFormData).serialize();
    const textData = $('#tweet-text').val().length;
    const errorMsg = $('.error-msg');

    if (textData > 140) {
      errorMsg.slideUp();
      setTimeout(function() {
        errorMsg.text('Lenght is greater than 140 in lenght');
        errorMsg.slideDown();
      }, 500);
      return;
    } else if (textData < 1) {
      errorMsg.slideUp();
      setTimeout(function() {
        errorMsg.text('Field can not be empty');
        errorMsg.slideDown();
      }, 500);
      return;
    };

    $.ajax({
      url: 'http://localhost:3000/tweets',
      type: 'POST',
      data: postingData,
      success: function(resp) {
        $('#tweet-text').val('');
        $('#fresh-tweet').empty();
        loadTweets();
      },
      error: function(error) {
        console.log(error);
      }
    });

  });

  const renderTweets = (tweets) => {
    let result = '';
    const revTweet = tweets.reverse();

    for (let i = 0; i < tweets.length; i++) {

      result = createTweetElement(revTweet[i]);

      $('#fresh-tweet').append(result);
    };
  };

  const createTweetElement = function(tweet) {
    const $tweet = $(`<article class="tweet">
  <header>
    <span>
      <img src="${tweet.user.avatars}" alt="">
      <a>${tweet.user.name}</a>
    </span>
    <a class="profile-style">${tweet.user.handle}</a>
  </header>

  <body>
    <div class="tweet-text">
    ${tweet.content.text}
    </div>
    <hr>
  </body>
  <footer>
    <span>${timeago.format(tweet.created_at)} days ago</span>
    <div>
      <i class="fa-solid fa-flag"></i>
      <i class="fa-sharp fa-solid fa-repeat"></i>
      <i class="fa-solid fa-heart"></i>
    </div>
  </footer>
</article>`);

    return $tweet;
  };

  const loadTweets = () => {
    $.ajax({
      url: 'http://localhost:3000/tweets',
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