const api_key = "31e8dd64";
//get the movie info

function getMovieInfo() {
  let movieId = localStorage.getItem("movieId");
  fetch(`http://www.omdbapi.com/?apikey=${api_key}&i=${movieId}`)
    .then(function (response) {
      return response.json();
    })
    .then(function (movie) {
      let output = `
            <div class="row">
                <div class="col-md-4 m-auto">
                    <img src="${movie.Poster}" class="thumbnail">
                </div>
                <div class="col-md-8 m-auto">
                    <h2>${movie.Title}</h2>
                    <!--Add and store all the movie to favorites button-->
                    <button onclick="addToFavorites('${movie.imdbID}')" class="btn btn-success mb-2">Add to Favorites</button>
                    
                    <ul class="list-group">
                        <li class="list-group-item"><strong>Genre:</strong> ${movie.Genre}</li>
                        <li class="list-group-item"><strong>Released:</strong> ${movie.Released}</li>
                        <li class="list-group-item"><strong>Rated:</strong> ${movie.Rated}</li>
                        <li class="list-group-item"><strong>IMDB Rating:</strong> ${movie.imdbRating}</li>
                        <li class="list-group-item"><strong>Director:</strong> ${movie.Director}</li>
                        <li class="list-group-item"><strong>Writer:</strong> ${movie.Writer}</li>
                        <li class="list-group-item"><strong>Actors:</strong> ${movie.Actors}</li>
                    </ul>
                </div>
            </div>
            <div class="row">
                <div class="movieImage">
                    <h3>Plot</h3>
                    ${movie.Plot}
                    <hr>
                    <a href="http://imdb.com/title/${movie.imdbID}" target="_blank" class="btn btn-light">View IMDB</a>
                    <a href="index.html" class="btn btn-dark">Home</a>
                </div>
            </div>
            `;
      document.getElementById("movie").innerHTML = output;
    })
    .catch(function (error) {
      console.log(error);
    });
}

//add the id of that movie whenever the add to favorites button is clicked
function addToFavorites(id) {
  //add the id of the movie and donot delete the previous id of other movies
  let favorites = [];
  let checkID = JSON.parse(localStorage.getItem("favorites")) || [];

  //this is to check if the movie is already in the favorites
  for (let i = 0; i < checkID.length; i++) {
    if (checkID[i] === id) {
      alert("This movie is already in your favorites");
      return;
    }
  }

  //if the movie is not in the favorites, add it to the favorites
  if (localStorage.getItem("favorites") === null) {

    favorites.push(id);
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }
  //if the local storage is not empty and the movie is not in the favorites, add it to the favorites
  else {
    favorites = JSON.parse(localStorage.getItem("favorites"));
    favorites.push(id);
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }

  //display the message that the movie is added to favorites successfully
  window.location = "favorites.html";
  return false;
}
