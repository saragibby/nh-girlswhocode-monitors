$(function() {
  $.ajax({
    url: "https://newsapi.org/v2/top-headlines?sources=google-news&apiKey=96a9f559a54244a3b9d82e6db32a05e5",
    method: "GET",
    success: function(data) {
      console.log(data);
    }

  });
});