//api key
const api_key = "31e8dd64";


//get the movie name from search form and call the getMovieDetails function to get the movies
document.getElementById("searchForm").addEventListener("submit", (e) => {
    let searchText = document.querySelector("#searchText").value;

    getMovieDetails(searchText);
    e.preventDefault();
});

//get the movie details from omdb api and display the movies in the DOM
async function getMovieDetails(movieName) {
    //fetch the data from omdb api using the movie name
    const movieResponse = await fetch(
        `http://www.omdbapi.com/?apikey=${api_key}&s=${movieName}`
    );
    const movie = await movieResponse.json();

    let output = "";
    if (movie.Response === "True") {
        movie.Search.forEach(function (movie) {
            output += `
            <div class="col-md-3 m-auto">
                <div class="movieImage" text-center">

                    <img  src="${movie.Poster}">
                    

                    <h5>${movie.Title}</h5>

                    <a onclick="movieSelected('${movie.imdbID}')" class="btn btn-danger" href="movieInfo.html">More Info</a>
                </div>
            </div>
            `;
        });
    } else {
        output = `
        <div class="col-md-12">
            <div class="alert alert-danger" role="alert">
                ${movie.Error}
            </div>
        </div>
        `;
    }
    document.getElementById("movies").innerHTML = output;
}


//whenever the movieinfo button is clicked, the movie id is passed to the movieinfo.html page and the movie details are displayed
function movieSelected(id) {
    localStorage.setItem("movieId", id); //set the movie id
    
    window.location = "movieInfo.html"; //redirect to the movie info page
    return false; //to prevent the page from reloading
}
