const api_key = "31e8dd64";

//get all the avialable movies and display them
function getFavorites() {
    //get all the id from local storage array and display them in the table
    let favorites = JSON.parse(localStorage.getItem("favorites"));
    for (let i = 0; i < favorites.length; i++) {
        getMovie(favorites[i]);
    }
}

async function getMovie(id) {
    const movieResponse = await fetch(
        `http://www.omdbapi.com/?apikey=${api_key}&i=${id}`
    );
    const movie = await movieResponse.json();
    let output = "";
    if (movie.Response === "True") {
        output += `
            <div class="col-md-3 m-auto">
                <div class="movieImage text-center">
                    <img src="${movie.Poster}" class="thumbnail">
                    <h5>${movie.Title}</h5>
                  
                </div>
            </div>
            `;
    }
    document.getElementById("favouriteMovies").innerHTML += output;
}
