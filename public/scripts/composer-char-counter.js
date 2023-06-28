$(document).ready(function() {
  $('#tweet-text').on('input', function(){
    const initConstVal = 140;
    let countDowntVal = $(this).val().length;

    let initCounterTwo = initConstVal - countDowntVal;

    if (initCounterTwo < 0) {
      $('.counter').addClass('below-limit');
    }

    $('.counter').val(initCounterTwo);
  });
});