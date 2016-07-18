$( document ).ready(function() {
    addShow();
    showSearch();
    loadShows();
    showMore();
    // $(".show_index").hide();  
  });

    function showSearch() {
          $('#showSearch').submit(function(event) {
      event.preventDefault();
      $(".content").hide();
      $(".search-results").empty();
      
      function Show(showData) {
        this.title = showData.name;
        this.url = showData.image.original;
        this.description = showData.summary;
        this.network = showData.network.name;
        this.time = showData.schedule.time;
        this.days = showData.schedule.days;
        this.remoteID = showData.id;
      };

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
              var newShow = new Show(showData);
              $('.search-results').append("<h2>" + newShow.title + "</h2>");
              $('.search-results').append("<a href='" + newShow.url + "' target='_blank'><img class='thumbnail img-responsive' src=" + newShow.url + "></a>");
              $('.search-results').append("<p>" + newShow.network + " " + newShow.days[0] + " " + newShow.time + "</p>");
              $('.search-results').append("<p>" + newShow.description + "</p>");
              $('.search-results').append("<button class='addShow' id='remoteID' data-id='" + newShow.remoteID + "'>Add to my shows</button>");
              console.log(newShow.time[0]);
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
      $(this).hide();
      $.getJSON( url, function ( data ) { 
        $.ajax({
          url: "/shows",
          type: "POST",
          data: {show: {
                   title: data.name, 
                   description: data.summary,
                   time: data.schedule.time,
                   day: data.schedule.days,
                   url: data.image.original,
                   remote_id: remoteID,
                   network_attributes: {
                    name: data.network.name
                   } },
          success: function(resp){ 

           }
        }
      });
    });
  });
}
  function showMore() {
    event.preventDefault();
    $(document).on('click', '.js-more', function(){
      var id = $(this).data("id");
      var showID = "#show-body-" + id;
      $.getJSON("/shows/" + id, function(data) {
        console.log(showID);
        $(showID).html(data.description);
      });
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
            var showDiv = $('<div/>', { id: divID})
            showDiv.append("<a href='" + showLocalLink + "'><h2>" + show.title+ "</h2></a>");
            showDiv.append("<a href='" + showLocalLink + "'><img src='" + showThumbnail + "' class='thumbnail'></a>");
            showDiv.append("<a href='" + networkLocalLink + "'><p>" + show.network.name + "</p></a>");
            var showBodyID = "show-body-" + show.slug;
            var showMore = $('<div/>', {id:showBodyID, class:"showMore"});
            showDiv.append(showMore);
            showDiv.append("<button class='js-more' data-id='" + show.slug + "'>" + "More Info" + "</button>");
            $('.shows_index').append(showDiv);
          }
        } else {
          $('.search-results').append("<h2>There were no shows matching your search. Please try again.</h2>");
        }
      }
    });
  }
