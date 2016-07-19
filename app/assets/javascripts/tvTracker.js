$(document).ready(function() {
  showMore();
  showSearch();
  addShow();
  createNewUserShow();
});

function ShowSearchResult(showData) {
      this.title = showData.name;
      this.url = showData.image.original;
      this.description = showData.summary;
      this.network = showData.network.name;
      this.time = showData.schedule.time;
      this.days = showData.schedule.days;
      this.remoteID = showData.id;
};

ShowSearchResult.prototype.convertShowTime = function() {  
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

ShowSearchResult.prototype.print = function () {
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
            var newShow = new ShowSearchResult(showData);
            var divID = "search-result-" + newShow.remoteID;
            var showDiv = $('<div/>', { id: divID, class:"bordered"});
            showDiv.append("<h2>" + newShow.title + "</h2>");
            showDiv.append("<img class='thumbnail img-responsive' src=" + newShow.url + ">");
            showDiv.append("<p>" + newShow.network + " " + newShow.days[0] + " @ " + newShow.convertShowTime() + "</p>");
            showDiv.append("<p>" + newShow.description + "</p>");
            showDiv.append("<button class='addShow btn btn-default' id='remoteID' data-id='" + newShow.remoteID + "'>Add to my shows</button>");
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
    var newShow = new ShowSearchResult(data); 
    console.log(newShow);
      $.ajax({
        url: "/shows",
        type: "POST",
        data: {show: {
          title: newShow.title, 
          description: newShow.description,
          time: newShow.time.convertShowTime,
          day: newShow.days[0],
          url: newShow.url,
          remote_id: newShow.remoteID,
          network_attributes: {
            name: newShow.network
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

function createNewUserShow() {
    $('.new_show_form form').submit(function(event) {
      // $(this).hide();
      event.preventDefault();
      var values = $(this).serialize();
      var posting = $.post('/shows', values);
      posting.done(function(data) {
        $('#newShow').show();
        var showDiv = $('<div/>', {class:"content-highlight"});
        showDiv.append("<h1>Your New Show:</h1>");
        showDiv.append("<h2>Title: " + data.title + "</h2>");
        showDiv.append("<img src='" + data.url +"'>");
        showDiv.append("<p> Description: " + data.description + "</p>");
        showDiv.append("<p> Network: " + data.network.name + "</p>");
        $("#newShow").append(showDiv);
      });

    });
  }



