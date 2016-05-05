

var model = {
  watchlistItems: [],
  browseItems: []
}


var api = {

  root: "https://api.themoviedb.org/3",
  token: "14baeb200d5c3de25c75d2c0712afbbf", // TODO 0 add your api key

  /**
   * Given a movie object, returns the url to its poster image
   */
  posterUrl: function(movie) {
    // TODO 4b
    // implement this function

    return "http://image.tmdb.org/t/p/w300/" + movie.poster_path; 
  }
}


/**
 * Makes an AJAX request to themoviedb.org, asking for some movies
 * if successful, updates the model.browseItems appropriately, and then invokes
 * the callback function that was passed in
 */
function discoverMovies(callback) {
  $.ajax({
    url: api.root + "/discover/movie",
    data: {
      api_key: api.token
    },
    success: function(response) {
      model.browseItems = response.results;
      callback(response);
      console.log(response);
    }
  });
}


/**
 * Makes an AJAX request to the /search endpoint of the API, using the 
 * query string that was passed in
 *
 * if successful, updates model.browseItems appropriately and then invokes
 * the callback function that was passed in
 */
function searchMovies(query, callback) {
  $.ajax({
    url: api.root + "/search/movie",
    data: {
      api_key: api.token,
      query: query
    },
    success: function(response) {
      model.browseItems = response.results;
      callback(response);
    }
  });
}


/**
 * re-renders the page with new content, based on the current state of the model
 */
function render() {

  // clear everything
  $("#section-watchlist ul").empty();
  $("#section-browse ul").empty();

  // insert watchlist items
  model.watchlistItems.forEach(function(movie) {
    var title = $("<h6></h6>").text(movie.original_title)
    

    // TODO 1 
    var buttonWatch=$("<button type='button' class='btn btn-danger'>I watched it</button>").click(function(){
     
      model.watchlistItems.splice(model.watchlistItems.indexOf(movie), 1);
      render();
    });
    var panelHeading = $("<div class='panel-heading'></div>").append(title);
    var image = $("<img class='img-responsive' src='" + api.posterUrl(movie) + "'></img>");
    var panelBody = $("<div class='panel-body'></div>")
    .append(image)
    .append(buttonWatch);
    // add an "I watched it" button and append it below the title
    // Clicking should remove this movie from the watchlist and re-render

    // TODO 2i
    // apply the classes "btn btn-danger" to the "I watched it button"

    // TODO 4a
    
    // add a poster image and append it inside the 
    // panel body above the button
    
    // TODO 2g
    // re-implement the li as a bootstrap panel with a heading and a body
    var itemView = $("<li class='panel panel-default'></li>")
    .append(panelHeading)
    .append(panelBody);
    
    
      

    $("#section-watchlist ul").append(itemView);
  });

  // insert browse items
  model.browseItems.forEach(function(movie) {

    // TODO 2d continued
    // style this list item to look like the demo
    // You'll also need to make changes in index.html.
    // use the following BS classes:
    // "list-group", "list-group-item", btn", "btn-primary", 

    var title = $("<h4></h4>").text(movie.original_title);

    var button = $("<button class='btn btn-primary'></button>")
      .text("Add to Watchlist")
      .click(function() {
        model.watchlistItems.push(movie);
        render();
      })
      .prop("disabled", model.watchlistItems.indexOf(movie) !== -1);

    var overview = $("<p></p>").text(movie.overview);

    // append everything to itemView, along with an <hr/>
    var itemView = $("<li></li>")
      .append(title)
      .append(overview)
      .append(button)
      .attr("class", "list-group-item");

    // append the itemView to the list
    $("#section-browse ul").append(itemView);
  });
  
}


// When the HTML document is ready, we call the discoverMovies function,
// and pass the render function as its callback
$(document).ready(function() {
  discoverMovies(render);
});