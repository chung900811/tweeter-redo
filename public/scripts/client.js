/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Test / driver code (temporary). Eventually will get this from the server.
$(document).ready(function () {
    //console log appears on the console (dev tools) on page.  
    console.log("ready!");
  
    const loadTweets = function() {
        $.ajax('/tweets', { method: 'GET' })
        .then(function (moreTweets) {
          console.log('Success: ', moreTweets);
          renderTweets(moreTweets);    
    
        });   
      }     
         loadTweets();
         
    $("#new-tweet").on('submit', function(event){
  
        event.preventDefault();
        
        //capturing the value of the form
    const tweetStr = $("#tweet-text").val();
       
        if (!tweetStr) {
            $('.error-section').slideDown('fast');
            $('#error-message').text('Please enter text');
            return;
            }
        if (tweetStr.length > 140) {
            $('.error-section').slideDown('fast');
            $('#error-message').text('Max characters exceeded');
            return;
            }
    const serializedData = $(this).serialize();
  
        $.post('/tweets/', serializedData, (response) => {
            $('.error-section').slideUp('fast');
            $('#tweet-text').val('');
            $('.counter').val('140');
            console.log(response);
            loadTweets();
    });      
  })
  
      
    const renderTweets = function (tweets) {
        for (const tweet of tweets) {
        createTweetElement(tweet);
        }
        
    }
  })
    const createTweetElement = function(tweet) {
        let $tweet = $(
            `
            <section class = tweet-container>
            <article class="article-class">
              <header>
                <div class="avatar-pic">
                  <img src=${tweet.user.avatars}>
                  <span>${tweet.user.name}</span>
                </div>
                <div class="handle">
                  <p>${tweet.user.handle}</p>
                </div>
              </header>
    
            <div class="post-tweet">
              <p>${(escape(tweet.content.text)).replace(/%20/g, " ").replace("%3F", "?").replace("%21", "!").replace(/%2C/g,",")}</p>
              <hr>
            </div>
    
            <footer>
              <div class="postedday">
                <p>${timeago.format(tweet.created_at)}</p>
              </div>
              <div class="flag-retweet-like">
                <span class="icon flag">
                  <i class="fas fa-flag"></i>
                </span>
                <span class="icon retweet">
                  <i class="fas fa-retweet"></i>
                </span>
                <span class="icon like">
                  <i class="fas fa-heart"></i>
                </span>
              </div>
              </footer>
            </article>
          </section>
          `
    );
  
           $(".maintweetcontent").prepend($tweet)  
  }
  