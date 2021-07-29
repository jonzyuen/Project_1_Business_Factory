// let searchBar = $("")

let createDiv = document.createElement('div');

let gameCard = document.getElementById('game-grid-container');


let getGenre = function() { 
    document.querySelector('#genre-container').addEventListener('click', function(event) {
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

function gameCardEl () {

    //POSSIBLE VAR + RETURN THAT READ EASE
    let divCell = document.createElement('div');
    divCell.setAttribute('class', 'cell large-2 medium-4 small-6');
    gameCard.appendChild(divCell);

    let divCard = document.createElement('div');
    divCard.setAttribute('class', 'card');
    divCell.appendChild(divCard);

    let cardSection = document.createElement('div');
    cardSection.setAttribute('class', 'card-section');
    divCard.appendChild(cardSection);

    return divCard;
}
// start of for loop to make divs for length of results/genre
// for (let i=0; i<data.results; i++) {}

function genericFunction() {
    fetch(
        // `https://api.rawg.io/api/games?key=c7ec26c3e2bb4ca79a5a70710956f2f8&genres=action`
    ).then(function(response) {
        return response.json();
    })
    .then(function(response) {
        console.log(response.results[0]);
        let divCard = gameCardEl();
        let gameCover = document.createElement('img')
        gameCover.setAttribute('src', response.results[0].background_image);
        let gameTitle = document.createElement('h5');
        gameTitle.textContent = response.results[0].name;
        divCard.prepend(gameCover);
        divCard.appendChild(gameTitle)
    });
};

const getAllGenres = () => {
    return fetch(`https://api.rawg.io/api/genres?key=c7ec26c3e2bb4ca79a5a70710956f2f8`)
        .then(response => response.json())
        .then(data => data.results);
    }
console.log(getAllGenres())

const getGamesByGenre = (genre) => {
    return fetch(`https://api.rawg.io/api/games?key=c7ec26c3e2bb4ca79a5a70710956f2f8&genres=${genre}`)
        
}


const getGameDataByGameName = (game) => {
    return fetch(`https://cors-anywhere.herokuapp.com/https://www.giantbomb.com/api/search/?api_key=85b938020fcf46bb6d3e1014180e6954cd8c1a1c&format=json&query=${game}`)
        .then(res => res.json())
        .then(data => data.results);
}

const getDetailedGameDataByGuid = (guid) => {
    return fetch(`https://cors-anywhere.herokuapp.com/https://www.giantbomb.com/api/game/${guid}/?api_key=85b938020fcf46bb6d3e1014180e6954cd8c1a1c&format=json`)
        .then(res => res.json())
        .then(data => data.results);
}

const getVideoByGuid = (videoUrl) => {
    return fetch(`https://cors-anywhere.herokuapp.com/${videoUrl}?api_key=85b938020fcf46bb6d3e1014180e6954cd8c1a1c&format=json`)
        .then(res => res.json())
        .then(data => data.results);
}





// Pass game data (one of the results) and return card
const createGameCard = (gameData) => {
    const videoPlayer = document.getElementById('video-player')
    const outerDiv = document.createElement('div')
    outerDiv.classList.add('cell', 'large-2', 'medium-4', 'small-6')
    outerDiv.dataset.guid = gameData.guid
    outerDiv.addEventListener('click', (e) => {
        getDetailedGameDataByGuid(e.currentTarget.dataset.guid).then((results) => {
            const videoUrl = results.videos[0].api_detail_url
            getVideoByGuid(videoUrl).then((results) => {
                const videoPlayerUrl = results.embed_player
                const searchForm = document.querySelector('#search-form')
                videoPlayer.src = videoPlayerUrl
                searchForm.classList.add('hide')
                document.querySelector('.game-video').classList.remove('hide')
                document.querySelector('#results-container').classList.add('hide')
            })
        })
    })
    const cardDiv = document.createElement('div')
    cardDiv.classList.add('card')
    const gameImg = document.createElement('img')
    gameImg.src = gameData.image.icon_url
    gameImg.alt = "No Icon"

    const cardSection = document.createElement('div')
    cardSection.classList.add('card-section')
    const gameName = document.createElement('h5')
    gameName.textContent = gameData.name

    outerDiv.appendChild(cardDiv)
    cardDiv.appendChild(gameImg)
    cardDiv.appendChild(cardSection)
    cardSection.appendChild(gameName)

    const headerContainer = document.querySelector('#results-container')
    headerContainer.appendChild(outerDiv)
}   


document.getElementById('back-btn').addEventListener('click', () => {
    searchForm.classList.remove('hide')
    document.querySelector('.game-video').classList.add('hide')
    document.querySelector('#results-container').classList.remove('hide')    
    const videoPlayer = document.getElementById('video-player')
    videoPlayer.src = ''
})


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



let searchForm = document.querySelector('#search-form');

searchForm.addEventListener('submit', function(e) {
    e.preventDefault()
    let gameName = document.getElementById('text-box').value
    getGameDataByGameName(gameName) 
        .then((results) => {
            console.log(results)
        for (let i = 0; i < results.length; i++ ) {
            createGameCard(results[i])
        }
    })
});
