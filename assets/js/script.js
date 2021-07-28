// let searchBar = $("")

const getAllGenres = () => {
    return fetch(`https://api.rawg.io/api/genres?key=c7ec26c3e2bb4ca79a5a70710956f2f8`)
        .then(response => response.json())
        .then(data => data.results);
}


const getGamesByGenre = (genre) => {
    return fetch(`https://api.rawg.io/api/games?key=c7ec26c3e2bb4ca79a5a70710956f2f8&genre=${genre}`)
        .then(response => response.json())
        .then(data => data.results);
}

// function temp() {
//     fetch(`https://cors-anywhere.herokuapp.com/https://www.giantbomb.com/api/search/?api_key=85b938020fcf46bb6d3e1014180e6954cd8c1a1c&format=json&query=${game}`)
//       .then(response => response.json())
//       .then(data => data)
// }
// let game = 'Destiny-2'
// console.log(temp())

function temp() {
    return fetch(`https://cors-anywhere.herokuapp.com/https://www.giantbomb.com/api/search/?api_key=85b938020fcf46bb6d3e1014180e6954cd8c1a1c&format=json&query=${game}`)
}
let game = 'World-of-Warcraft'
temp()
  .then(res => res.json())
  .then(data => console.log(data));

getAllGenres().then((genres) => {
    // genres is array of all genres
    console.log(genres)
})

//Example to get all games by genre
getGamesByGenre("Action").then((results) => {
    //Do stuff with results of query. Results holds array of all games for a certain genre
    console.log(results)
})

