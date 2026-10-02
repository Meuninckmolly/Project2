let movies = [];

fetch("data.json")
    .then(response => response.json())
    .then(data => {
        movies = data;

        createFilters();
        displayMovies();
    });

function createFilters() {

    let yearFilter = document.querySelector("#yearFilter");
    let genreFilter = document.querySelector("#genreFilter");
    let directorFilter = document.querySelector("#directorFilter");

    let years = [...new Set(movies.map(movie => movie.year))];
    years.sort();

    years.forEach(year => {
        yearFilter.innerHTML += `
            <option value="${year}">${year}</option>
        `;
    });

    let genres = [];

    movies.forEach(movie => {
        let movieGenres = movie.genre.split(",");

        movieGenres.forEach(genre => {
            genre = genre.trim();

            if (!genres.includes(genre)) {
                genres.push(genre);
            }
        });
    });

    genres.sort();

    genres.forEach(genre => {
        genreFilter.innerHTML += `
            <option value="${genre}">${genre}</option>
        `;
    });

    let directors = [...new Set(movies.map(movie => movie.director))];
    directors.sort();

    directors.forEach(director => {
        directorFilter.innerHTML += `
            <option value="${director}">${director}</option>
        `;
    });

    yearFilter.addEventListener("change", displayMovies);
    genreFilter.addEventListener("change", displayMovies);
    directorFilter.addEventListener("change", displayMovies);
}

function displayMovies() {

    let movieSection = document.querySelector("#movies");

    let selectedYear = document.querySelector("#yearFilter").value;
    let selectedGenre = document.querySelector("#genreFilter").value;
    let selectedDirector = document.querySelector("#directorFilter").value;

    movieSection.innerHTML = "";


    movies.forEach(movie => {

        let title = movie.title || movie["Movie Title"];

        let yearMatches =
            selectedYear === "all" ||
            movie.year == selectedYear;

        let genreMatches =
            selectedGenre === "all" ||
            movie.genre.includes(selectedGenre);

        let directorMatches =
            selectedDirector === "all" ||
            movie.director === selectedDirector;

        if (yearMatches && genreMatches && directorMatches) {

            let movieItem = document.createElement("div");

            movieItem.classList.add("card");

            movieItem.innerHTML = `
                <h2>${title}</h2>

                <img src="${movie.image}" alt="${title}">

                <p><strong>Year:</strong> ${movie.year}</p>
                <p><strong>Genre:</strong> ${movie.genre}</p>
                <p><strong>Director:</strong> ${movie.director}</p>
            `;

            movieSection.appendChild(movieItem);
        }
    });
}




