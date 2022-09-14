
$(document).ready(function() {
    
  $('#tweet-text').on('keyup',function() {
      let counter = $('#tweet-text').siblings('.tweet-buttons').find('.counter')
      let value = 140 - $('#tweet-text').val().length;
      if( value < 0 ) {
        return counter.text(value).css('color', 'red') ;
      }
      return counter.text(value).css('color', 'black') ;
  })
})
