var zip_code = 48048;
var today = new Date();
var current_m = today.getMonth() + 1;
var current_d = today.getDate();
var current_y = today.getFullYear();

var oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds 
var currentDate = new Date(current_y, current_m, current_d);

var futureDays = 4;

var forecastHours = 10;

$(function() {
  $.ajax({
    url: "http://api.wunderground.com/api/e59e22a429ff575b/geolookup/forecast10day/q/US/" + zip_code + ".json",
    dataType: "jsonp",
    success: function(data) {
      var htmlString = '';
      var locale = data.forecast.simpleforecast.forecastday;

      for (index = 0; index <= futureDays; index++) {
        if (locale[index].period === 1) {
          var day = 'Today';
        } else {
          var day = locale[index].date.weekday;
        };
        divElement = '<li>' + '<div class="day">' + day +
          ':</div>' + '<div class="icon"><img src="http://icons.wxug.com/i/c/g/' +
          locale[index].icon + '.gif" /></div>' + '<div class="conditions">' +
          locale[index].conditions + '</div>' + '<b>' +
          locale[index].high.fahrenheit + '&deg;</b>' + ' / ' +
          locale[index].low.fahrenheit + '&deg;' + ' F' + '<div class="clear_left"></div></li>';

        htmlString += divElement;
      }
      var location = 'Weather Forecast for  ' + data.location.city + ', ' + data.location.state;
      $('.location').html(location);
      $('#days').html(htmlString);
    }
  });
  
  $.ajax({
    url: "http://api.wunderground.com/api/e59e22a429ff575b/geolookup/hourly/q/US/" + zip_code + ".json",
    dataType: "jsonp",
    success: function(data) {
      var htmlString = '';
      var locale = data.hourly_forecast;

      for (index = 0; index <= forecastHours; index++) {
                    console.log(locale[index]);
        divElement = '<li>' + '<div class="hour">' + locale[index].FCTTIME.civil +
          ':</div>' + '<div class="icon"><img src="' +
          locale[index].icon_url + '" /></div>' + '<div class="conditions">' +
          locale[index].condition + '</div>' + '<b>' +
          locale[index].temp.english + '&deg; F</b>' + '<div class="clear_left"></div></li>';

        htmlString += divElement;
      }
      $('#hourly').html(htmlString);
    }
  });

  $.ajax({
    url: "http://api.wunderground.com/api/e59e22a429ff575b/satellite/q/MI/New_Haven.json",
    dataType: "jsonp",
    success: function(data) {
      var imageSrc = data.satellite.image_url;
      $('#satellite').html(`<img src='${imageSrc}' />`);
    }

  });
});

setTimeout(function(){
   window.location.reload(1);
}, 100000);