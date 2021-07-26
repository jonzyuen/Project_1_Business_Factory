// let searchBar = $("")

const getAllGenres = () => {
    return fetch(`https://api.rawg.io/api/genres?key=c7ec26c3e2bb4ca79a5a70710956f2f8`)
        .then(response => response.json())
        .then(data => console.log(data.results));
}


const getGamesByGenre = (genre) => {
    return fetch(`https://api.rawg.io/api/games?key=c7ec26c3e2bb4ca79a5a70710956f2f8&genre=${genre}`)
        .then(response => response.json())
        .then(data => data.results);
}



getAllGenres().then((genres) => {
    // genres is array of all genres
    console.log(genres)
})

//Example to get all games by genre
getGamesByGenre("Action").then((results) => {
    //Do stuff with results of query. Results holds array of all games for a certain genre
    console.log(results)
})


