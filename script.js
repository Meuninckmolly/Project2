fetch("data.json")
    .then(response => response.json())
    .then(data => {

        const movies = data;

        const moviesContainer = document.getElementById("movies");

        const yearFilter = document.getElementById("yearFilter");
        const genreFilter = document.getElementById("genreFilter");
        const ratingFilter = document.getElementById("ratingFilter");


        function getTitle(movie) {

            return movie.title || movie["Movie Title"] || "Untitled Movie";

        }



        function getGenres(movie) {

            if (Array.isArray(movie.genre)) {
                return movie.genre;
            }

            if (typeof movie.genre === "string") {
                return movie.genre.split(",").map(genre => genre.trim());
            }

            return [];

        }


        const years = [...new Set(
            movies.map(movie => movie.year)
        )].sort((a, b) => b - a);


        years.forEach(year => {

            const option = document.createElement("option");

            option.value = year;
            option.textContent = year;

            yearFilter.appendChild(option);

        });



        const genres = new Set();


        movies.forEach(movie => {

            getGenres(movie).forEach(genre => {

                genres.add(genre);

            });

        });


        [...genres]
            .sort()
            .forEach(genre => {

                const option = document.createElement("option");

                option.value = genre;
                option.textContent = genre;

                genreFilter.appendChild(option);

            });



        const ratings = [...new Set(
            movies.map(movie => movie.rating)
        )]
        .filter(rating => rating !== undefined && rating !== null)
        .sort((a, b) => Number(b) - Number(a));


        ratings.forEach(rating => {

            const option = document.createElement("option");

            option.value = rating;
            option.textContent = rating + "/5";

            ratingFilter.appendChild(option);

        });


        function displayMovies(movieList) {

            moviesContainer.innerHTML = "";


            movieList.forEach(movie => {

                const card = document.createElement("div");

                card.classList.add("card");


                const title = getTitle(movie);

                const genres = getGenres(movie).join(", ");


                card.innerHTML = `

                    <img
                        src="${movie.image}"
                        alt="${title}"
                    >

                    <h2>${title}</h2>

                    <p>${movie.year}</p>

                    <p>${genres}</p>

                    <p>⭐ ${movie.rating}/5</p>

                `;



                card.addEventListener("click", function() {

                    openModal(movie);

                });


                moviesContainer.appendChild(card);

            });

        }


        function filterMovies() {

            const selectedYear = yearFilter.value;

            const selectedGenre = genreFilter.value;

            const selectedRating = ratingFilter.value;


            const filteredMovies = movies.filter(movie => {

                const movieGenres = getGenres(movie);


                const yearMatches =
                    selectedYear === "all" ||
                    String(movie.year) === selectedYear;


                const genreMatches =
                    selectedGenre === "all" ||
                    movieGenres.includes(selectedGenre);


                const ratingMatches =
                    selectedRating === "all" ||
                    String(movie.rating) === selectedRating;


                return (
                    yearMatches &&
                    genreMatches &&
                    ratingMatches
                );

            });


            displayMovies(filteredMovies);

        }


        yearFilter.addEventListener(
            "change",
            filterMovies
        );


        genreFilter.addEventListener(
            "change",
            filterMovies
        );


        ratingFilter.addEventListener(
            "change",
            filterMovies
        );


        const modal = document.getElementById("movieModal");

        const closeModalButton =
            document.getElementById("closeModal");

        const modalImage =
            document.getElementById("modalImage");

        const modalTitle =
            document.getElementById("modalTitle");

        const modalYear =
            document.getElementById("modalYear");

        const modalGenre =
            document.getElementById("modalGenre");

        const modalDirector =
            document.getElementById("modalDirector");

        const modalRating =
            document.getElementById("modalRating");

        const modalPlot =
            document.getElementById("modalPlot");


        const summaries = {

            "Good Will Hunting":
                "A young janitor at MIT turns out to have an extraordinary talent for mathematics. With the help of a therapist, he begins confronting his difficult past and figuring out what he wants from his future.",

            "Running on Empty":
                "A family has spent years living on the run after the parents became fugitives. Their teenage son begins questioning the life his parents have created for him and wonders what his own future could look like.",

            "This is the End":
                "A group of celebrities become trapped inside James Franco's house after a series of apocalyptic events. Their friendships are tested as they try to survive the end of the world.",

            "Astro Boy":
                "A young robot with incredible powers searches for his place in the world while discovering what it means to be human.",

            "She's the Man":
                "When Viola's soccer team is cut, she disguises herself as her twin brother so she can play for his school. Things become complicated when she develops feelings for one of her teammates.",

            "The Birdcage":
                "A gay couple who own a drag club attempt to pretend to be a traditional family when their son's fiancée and conservative parents come to visit.",

            "Snack Shack":
                "Two best friends decide to run a snack shack during the summer, leading to an unforgettable series of adventures, friendships, and romantic complications.",

            "Tick Tick Boom":
                "A young theater composer approaches his thirtieth birthday while struggling to balance his artistic dreams, relationships, and fear that he is running out of time.",

            "The Perks of Being a Wallflower":
                "A shy teenager begins his freshman year of high school and finds friendship with two older students who help him navigate love, friendship, and painful memories.",

            "Riding in Cars with Boys":
                "A young woman becomes a mother earlier than expected and has to navigate adulthood, motherhood, relationships, and her dreams of becoming a writer.",

            "No Other Choice":
                "A man who suddenly loses his job becomes increasingly desperate as he searches for another position and begins making increasingly dangerous choices.",

            "The Odyssey":
                "An epic adventure following Odysseus as he struggles to return home after the Trojan War.",

            "The Maze Runner":
                "A teenage boy wakes up in a mysterious maze with no memory of his past. Along with the other trapped teenagers, he must uncover the truth and find a way out.",

            "The Hunger Games":
                "Katniss Everdeen volunteers to compete in a deadly televised competition in place of her younger sister. She must survive while navigating a powerful political system.",

            "The Impossible":
                "A family vacationing in Thailand is separated by a devastating tsunami. They struggle to survive and find one another again.",

            "Star Wars: Revenge of the Sith":
                "Anakin Skywalker becomes increasingly influenced by the dark side as the Galactic Republic collapses and the Jedi face destruction.",

            "The Outsiders":
                "Two rival groups of teenagers struggle with class differences, loyalty, friendship, and violence in 1960s Oklahoma.",

            "Dead Poets Society":
                "An inspiring English teacher encourages his students at a strict boarding school to think independently and embrace life.",

            "All Dogs Go To Heaven":
                "A mischievous dog returns from the afterlife and attempts to make amends while helping a young orphan.",

            "Heathers":
                "A teenage girl becomes involved with the most popular clique at school before discovering that her new boyfriend has dangerous ideas about dealing with their classmates.",

            "Manon of the Spring":
                "A young woman seeks revenge against the people responsible for her family's suffering and the loss of their land.",

            "Lucas":
                "A sensitive teenage boy navigates friendship, first love, and the complicated social hierarchy of high school.",

            "Fox and the Hound":
                "A fox and a hunting dog become childhood friends despite being natural enemies, testing whether their friendship can survive as they grow older.",

            "A River Runs Through It":
                "Two brothers grow up in Montana while their family navigates love, religion, fishing, and the different paths the brothers take through adulthood."

        };


        function openModal(movie) {

            const title = getTitle(movie);

            modalImage.src = movie.image;

            modalImage.alt = title;

            modalTitle.textContent = title;

            modalYear.textContent = movie.year;

            modalGenre.textContent =
                getGenres(movie).join(", ");

            modalDirector.textContent =
                movie.director || "Unknown";

            modalRating.textContent =
                movie.rating + "/5";

            modalPlot.textContent =
                summaries[title] ||
                "No plot summary available for this movie.";


            modal.style.display = "flex";

        }


        function closeModal() {

            modal.style.display = "none";

        }


        closeModalButton.addEventListener(
            "click",
            closeModal
        );


        modal.addEventListener("click", function(event) {

            if (event.target === modal) {

                closeModal();

            }

        });

        document.addEventListener("keydown", function(event) {

            if (event.key === "Escape") {

                closeModal();

            }

        });

        displayMovies(movies);

    })

    .catch(error => {

        console.error(
            "There was a problem loading the movie data:",
            error
        );

    });



