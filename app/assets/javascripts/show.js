$(document).ready(function() {
  loadShows();
  showMore();
  showSearch();
  addShow();
  loadNetworkShows()
  // loadNetworks();  
});

function ShowFromSearch(showData) {
      this.title = showData.name;
      this.url = showData.image.original;
      this.description = showData.summary;
      this.network = showData.network.name;
      this.time = showData.schedule.time;
      this.days = showData.schedule.days;
      this.remoteID = showData.id;
};

ShowFromSearch.prototype.convertShowTime = function() {  

  if (this.time != "") {
    var time_array = this.time.split(":");
    var ampm = 'AM';
    if (time_array[0] >= 12) {
        ampm = 'PM';
    }
    if (time_array[0] > 12) {
        time_array[0] = time_array[0] - 12;
    }
    formatted_time = time_array[0] + ':' + time_array[1] + ' ' + ampm;
    return formatted_time;
  } else {
    return "Time is not available."
  }
}

ShowFromSearch.prototype.print = function () {
  console.log(this.title);
}

function showSearch() {
  $('#showSearch').submit(function(event) {
    event.preventDefault();
    $(".content").hide();
    $(".search-results").empty();
  
    var showURLName = $("#showName").val().replace(/ /g, '-');
    var url = "http://api.tvmaze.com/search/shows?q=" + showURLName;

    $.ajax({
      type: "GET",
      dataType: "json",
      url: url,
      success: function(data){
        if (data.length > 0) {
          $("#search-results").text("Search Results");
          for (var i = 0; i < data.length; i++) {
            var showData = data[i].show;
            var newShow = new ShowFromSearch(showData);
            var divID = "search-result-" + newShow.remoteID;
            var showDiv = $('<div/>', { id: divID});
            showDiv.append("<h2>" + newShow.title + "</h2>");
            showDiv.append("<img class='thumbnail img-responsive' src=" + newShow.url + ">");
            showDiv.append("<p>" + newShow.network + " " + newShow.days[0] + " @ " + newShow.convertShowTime() + "</p>");
            showDiv.append("<p>" + newShow.description + "</p>");
            showDiv.append("<button class='addShow' id='remoteID' data-id='" + newShow.remoteID + "'>Add to my shows</button>");
            $(".search-results").append(showDiv);
          }
        } else {
          $('.search-results').append("<h2>There were no shows matching your search. Please try again.</h2>");
        }
      }
    });
  })
}

function addShow() {
  event.preventDefault();
  $(".search-results").on("click", 'button.addShow', function() {
    var remoteID = $(this).data("id");
    var url = "http://api.tvmaze.com/shows/" + remoteID;
    var divID = "search-result-" + remoteID;
    $(this).hide();
    $.getJSON( url, function ( data ) { 
      $.ajax({
        url: "/shows",
        type: "POST",
        data: {show: {
          title: data.name, 
          description: data.summary,
          time: data.schedule.time,
          day: data.schedule.days[0],
          url: data.image.original,
          remote_id: remoteID,
          network_attributes: {
            name: data.network.name
          } },
          success: function(){ 
            console.log();
          },
          error: function(){ 
            $(document).ajaxError(function (e, xhr, settings) {
        if (xhr.status == 401) {
          $("button.addShow").hide();
           alert(xhr.responseText);
        }
    });
          }
        }
      });
    });
  });
}
function showMore() {
  event.preventDefault();
  $(document).on('click', '.js-more', function(){
    var button = $(this);
    var id = $(this).data("id");
    var showID = "#show-body-" + id;
    if ($(showID).hasClass("show")) {
      $(showID).removeClass("show");
      $(showID).hide();
      button.text("Show More");
    } else {
      $.getJSON("/shows/" + id, function(data) {
        console.log(showID);
        $(showID).html(data.description);
        $(showID).addClass("show");
        button.text("Show Less");
      });
    }

  });
}

function loadShows() {
  event.preventDefault();
  $.ajax({
    type: "GET",
    dataType: "json",
    url: "/shows",
    success: function(data){
      if (data.length > 0) {
        for (var i = 0; i < data.length; i++) {
          var show = data[i];
          var showLocalLink = "/shows/" + show.slug;
          var networkLocalLink = "/networks/" + show.network.slug;
          var showThumbnail = show.url;
          var divID = "show-" + show.slug;
          var showDiv = $('<div/>', { id: divID});
          showDiv.append("<a href='" + showLocalLink + "'><h2>" + show.title+ "</h2></a>");
          showDiv.append("<a href='" + showLocalLink + "'><img src='" + showThumbnail + "' class='thumbnail'></a>");
          showDiv.append("<a href='" + networkLocalLink + "'><p>" + show.network.name + "</p></a>");
          var showBodyID = "show-body-" + show.slug;
          var showMore = $('<div/>', {id:showBodyID, class:"showMore"});
          showDiv.append(showMore);
          showDiv.append("<button class='js-more' data-id='" + show.slug + "'>" + "Show More" + "</button>");
          $('.shows_index').append(showDiv);
        }
      } else {
        $('.search-results').append("<h2>There were no shows matching your search. Please try again.</h2>");
      }
    }
  });
}

function loadNetworkShows() {
  event.preventDefault();
  var networkSlug = $('.networkShows').data("id");
  $.ajax({
    type: "GET",
    dataType: "json",
    url: "/networks/" + networkSlug,
    success: function(data){
      if (data.shows.length > 0) {
        for (var i = 0; i < data.shows.length; i++) {
          var show = data.shows[i];
          var showTitle = show.title;
          var showLocalLink = "/shows/" + show.slug;
          var showDiv = $('<div/>');
          showDiv.append("<a href='" + showLocalLink + "'><h2>" + showTitle + "</h2></a>");
          $('.networkShows').append(showDiv);
        }
      } else {
        $('.search-results').append("<h2>There were no networks matching your search. Please try again.</h2>");
      }
    }
  });
}



