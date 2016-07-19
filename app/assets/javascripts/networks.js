$('.networks.index').ready(function() {
  
});
$('.networks.show').ready(function(){
  loadNetworkShows();
});

function loadNetworkShows() {
  event.preventDefault();
  var networkSlug = $('.networkShows').data("id");
  if (networkSlug !== undefined) {
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
}