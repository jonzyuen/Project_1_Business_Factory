// let searchBar = $("")

let createDiv = document.createElement('div');

let gameCard = document.getElementById('game-grid-container');


function getGenre() { document.querySelector('#genre-container').addEventListener('click', function(event) {
        console.log(event.target.classList);
        event.preventDefault();

        if (event.target.matches('button')) {
            // alert(event.target.id);

            // fetch with dynamic genre in query
            getGamesByGenre(event.target.id)
                .then(res => res.json())
                .then(data => console.log(data));
        }
    });
};

function makeCell() {
    let divCell = document.createElement('div');
    divCell.setAttribute('class', 'cell large-2 medium-4 small-6');

};
function makeCard() {
    let divCard = document.createElement('div');
    divCard.setAttribute('class', 'card');
};
function makeCardSection() {
    let cardSection = document.createElement('div');
    cardSection.setAttribute('class', 'card-section')
};

function gameCardEl () {
    let divCell = document.createElement('div');
    divCell.setAttribute('class', 'cell large-2 medium-4 small-6');
    gameCard.appendChild(divCell);

    let divCard = document.createElement('div');
    divCard.setAttribute('class', 'card');
    divCell.appendChild(divCard);

    let cardSection = document.createElement('div');
    cardSection.setAttribute('class', 'card-section');
    divCard.appendChild(cardSection);
}

function genericFunction() {
    fetch(
        'https://api.rawg.io/api/games?key=c7ec26c3e2bb4ca79a5a70710956f2f8&genres=action'
    ).then(function(response) {
        return response.json();
    })
    .then(function(response) {
        console.log(response.results[0]);
        gameCardEl();
        let gameCover = document.createElement('img')
        gameCover.setAttribute('src', response.results[0].background_image);
        gameCardEl().appendChild(gameCover);

    })
}

const getAllGenres = () => {
    return fetch(`https://api.rawg.io/api/genres?key=c7ec26c3e2bb4ca79a5a70710956f2f8`)
        .then(response => response.json())
        .then(data => data.results);
    }
console.log(getAllGenres())

const getGamesByGenre = (genre) => {
    return fetch(`https://api.rawg.io/api/games?key=c7ec26c3e2bb4ca79a5a70710956f2f8&genres=${genre}`)
        
}


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
// getGamesByGenre("Action").then((results) => {
//     //Do stuff with results of query. Results holds array of all games for a certain genre
//     console.log(results)
// })




getGenre();
genericFunction();



// $('#games-cards-container').hide();
$('.game-page').hide();



