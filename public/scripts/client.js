/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1687738513076
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd"
    },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1687824913076
  }
];

$(document).ready(function() {
  const submitForm = document.getElementById('submit-form');
  const getFormData = document.getElementById('new-form');

  submitForm.addEventListener('click', function(event) {
    event.preventDefault();
    const postingData = $(getFormData).serialize();

    $.ajax({
      url: 'http://localhost:3000/tweets',
      type: 'POST',
      data: postingData,
      success: function(resp) {
        console.log(resp);
      },
      error: function(error) {
        console.log(error);
      }
    });

  });

  const renderTweets = (tweets) => {
    $(document).ready(function() {
      let result = '';

      for (let i = 0; i < tweets.length; i++) {

        const forDate = new Date(tweets[i].created_at);
        const currDate = new Date();

        const dayDiff = forDate.getTime() - currDate.getTime();

        const convDayDiff = Math.abs(Math.floor(dayDiff / (1000 * 60 * 60 * 24)))

        tweets[i].created_at = convDayDiff;

        result = createTweetElement(tweets[i]);

        $('#fresh-tweet').append(result);
      };
    });
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
    <span>${tweet.created_at} days ago</span>
    <div>
      <i class="fa-solid fa-flag"></i>
      <i class="fa-sharp fa-solid fa-repeat"></i>
      <i class="fa-solid fa-heart"></i>
    </div>
  </footer>
</article>`);

    return $tweet;
  };

  renderTweets(data);

});