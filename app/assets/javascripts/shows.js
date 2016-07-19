$('.shows.index').ready(function(){
  loadShowsIndex();
});
$('.shows.show').ready(function(){
  loadShowShowPage();
});

function loadShowsIndex() {
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
          var showDiv = $('<div/>', { id: divID, class:"bordered"});
          showDiv.append("<a href='" + showLocalLink + "'><h2>" + show.title+ "</h2></a>");
          showDiv.append("<img src='" + showThumbnail + "' class='thumbnail img-responsive'>");
          showDiv.append("<a href='" + networkLocalLink + "'><p>" + show.network.name + "</p></a>");
          var showBodyID = "show-body-" + show.slug;
          var showMore = $('<div/>', {id:showBodyID, class:"showMore"});
          showDiv.append(showMore);
          showDiv.append("<button class='js-more btn btn-default'  data-id='" + show.slug + "'>" + "Show More" + "</button>");
          $('.shows_index').append(showDiv);
        }
      } else {
        $('.search-results').append("<h2>There were no shows matching your search. Please try again.</h2>");
      }
    }
  });
}
function loadShowShowPage() {
    event.preventDefault();
    var showSlug = $('.showsShow').data("id");
    var showLocalLink = "/shows/" + showSlug;
    if (showSlug !== undefined) {
          $.ajax({
      type: "GET",
      dataType: "json",
      url: showLocalLink,
      success: function(show){
        console.log(show);
        var networkLocalLink = "/networks/" + show.network.slug;
        var showImage = show.url;
        var divID = "show-" + show.slug;
        var showDiv = $('<div/>', { id: divID});
        showDiv.append("<a href='" + showLocalLink + "'><h1>" + show.title+ "</h1></a>");
        showDiv.append("<a href='" + networkLocalLink + "'><p>" + show.network.name + "</p></a>" + " " + show.time + " " + show.day);
        showDiv.append("<img class='poster img-responsive' src='" + showImage + "'>");
        var showBodyID = "show-body-" + show.slug;
        var showMore = $('<div/>', {id:showBodyID, class:"showMore"});
        showDiv.append(showMore);
        showDiv.append("<button class='js-more btn btn-default' data-id='" + show.slug + "'>" + "Show More" + "</button>");
        $('.showsShow').append(showDiv);
      }
    });
    }
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