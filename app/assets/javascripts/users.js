$('.users.show').ready(function(){
  loadUserShowPage();
});

function loadUserShowPage() {
  event.preventDefault();
  var userSlug = $('.showUser').data("id");
  var userLocalLink = "/users/" + userSlug;
  var divID = "user-" + userSlug;
  var userDiv = $('<div/>', { id: divID});
  $.ajax({
    type: "GET",
    dataType: "json",
    url: userLocalLink,
    success: function(user){
      for (var i = 0; i < user.shows.length; i++) {
        var userShowData = user.shows[i];
        var showLocalLink = "/shows/" + userShowData.slug
        // userDiv.append("<p><a href='" + showLocalLink + "'>" + userShowData.title + "</a></p>");
        var showImage = userShowData.url;
        userDiv.append("<a href='" + showLocalLink + "'><img class='poster' src='" + showImage + "'></a>");
        $('.showUser').append(userDiv);
      }
    }
  });
}
