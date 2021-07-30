// let searchBar = $("")

// let createDiv = document.createElement('div');

// let gameCard = document.getElementById('game-grid-container');


// let getGenre = function() { 
//     document.querySelector('#genre-container').addEventListener('click', function(event) {
//         console.log(event.target.classList);
//         event.preventDefault();

//         if (event.target.matches('button')) {
//             // alert(event.target.id);

//             // fetch with dynamic genre in query
//             getGamesByGenre(event.target.id)
//                 .then(res => res.json())
//                 .then(data => console.log(data));
//         }
//     });
// };

// function gameCardEl () {

//     //POSSIBLE VAR + RETURN THAT READ EASE
//     let divCell = document.createElement('div');
//     divCell.setAttribute('class', 'cell large-2 medium-4 small-6');
//     gameCard.appendChild(divCell);

//     let divCard = document.createElement('div');
//     divCard.setAttribute('class', 'card');
//     divCell.appendChild(divCard);

//     let cardSection = document.createElement('div');
//     cardSection.setAttribute('class', 'card-section');
//     divCard.appendChild(cardSection);

//     return divCard;
// }
// start of for loop to make divs for length of results/genre
// for (let i=0; i<data.results; i++) {}

// function genericFunction() {
//     fetch(
//         // `https://api.rawg.io/api/games?key=c7ec26c3e2bb4ca79a5a70710956f2f8&genres=action`
//     ).then(function(response) {
//         return response.json();
//     })
//     .then(function(response) {
//         console.log(response.results[0]);
//         let divCard = gameCardEl();
//         let gameCover = document.createElement('img')
//         gameCover.setAttribute('src', response.results[0].background_image);
//         let gameTitle = document.createElement('h5');
//         gameTitle.textContent = response.results[0].name;
//         divCard.prepend(gameCover);
//         divCard.appendChild(gameTitle)
//     });
// };

const getAllGenres = () => {
    return fetch(`https://api.rawg.io/api/genres?key=c7ec26c3e2bb4ca79a5a70710956f2f8`)
        .then(response => response.json())
        .then(data => data.results);
    }

const getGamesByGenre = (genre) => {
    return fetch(`https://api.rawg.io/api/games?key=c7ec26c3e2bb4ca79a5a70710956f2f8&genres=${genre}`)
        .then(response => response.json())
        .then(data => data.results);        
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


console.log(getGamesByGenre('action'));

const getVideoClickListener = (e) => {
    const videoPlayer = document.getElementById('video-player')
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
}


//1 Find way to get all games in genres and console log them out
//2 Figure out how to hide all the stuff on the page

const getAllGamesByGenreListener = (e, genre) => {
    const searchForm = document.querySelector('#search-form')
    getGamesByGenre(genre).then((results) => {
        console.log(results)
        searchForm.classList.add('hide')
        document.querySelector('#results-container').classList.add('hide')
        document.querySelector('#genre-container').classList.add('hide')
        for (let i = 0; i < results.length; i++) {
            createGameCard(results[i], document.getElementById('game-grid-container'), function(event, slug) {
                console.log(slug);
                console.log(results[i]);
                
                // hide other 'pages'
                // show game page
                document.getElementById('game-page-container').classList.remove('hide');
                document.getElementById('games-cards-container').classList.add('hide')

                let header = document.createElement('h2');
                header.textContent = results[i].name;
                document.getElementById('game-page-container').appendChild(header);

                let img = document.createElement('img');
                img.setAttribute('src', results[i].background_image);
                img.setAttribute('alt', results[i].name);
                document.getElementById('game-page-container').appendChild(img);

                // add content for game page
            })
        }
    })
}


// Pass game data (one of the results) and return card
const createGameCard = (data, container, clickListener) => {
    const outerDiv = document.createElement('div')
    outerDiv.classList.add('cell', 'large-2', 'medium-4', 'small-6')
    outerDiv.dataset.guid = data.guid
    // outerDiv.addEventListener('click', clickListener)
    outerDiv.addEventListener('click', (e) => clickListener(e, data.slug) )

    const cardDiv = document.createElement('div')
    cardDiv.classList.add('card')
    const gameImg = document.createElement('img')
    gameImg.src = data.image?.icon_url || data.image_background || data.background_image
    gameImg.alt = "No Icon"

    const cardSection = document.createElement('div')
    cardSection.classList.add('card-section')
    const gameName = document.createElement('h5')
    gameName.textContent = data.name

    outerDiv.appendChild(cardDiv)
    cardDiv.appendChild(gameImg)
    cardDiv.appendChild(cardSection)
    cardSection.appendChild(gameName)

    container.appendChild(outerDiv)
}   

let searchForm = document.querySelector('#search-form');


document.getElementById('back-btn').addEventListener('click', () => {
    searchForm.classList.remove('hide')
    document.querySelector('.game-video').classList.add('hide')
    document.querySelector('#results-container').classList.remove('hide')    
    document.querySelector('#game-page-container').classList.add('hide')
    const videoPlayer = document.getElementById('video-player')
    videoPlayer.src = ''
})

document.getElementById('back-btn-game-container').addEventListener('click', () => {
    searchForm.classList.remove('hide')
    document.getElementById('game-grid-container').innerHTML = ''
    document.querySelector('#genre-container').classList.remove('hide')    
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




// getGenre();
// genericFunction();



// $('#games-cards-container').hide();
// $('.game-page').hide();




searchForm.addEventListener('submit', function(e) {
    e.preventDefault()
    let gameName = document.getElementById('text-box').value
    getGameDataByGameName(gameName) 
        .then((results) => {
        for (let i = 0; i < results.length; i++ ) {
            createGameCard(results[i], document.querySelector('#results-container'), getVideoClickListener )
        }
    })
});

getAllGenres() 
    .then((results) => {
        for (let i = 0; i < results.length; i++ ) {
        createGameCard(results[i], document.getElementById('genre-container'), getAllGamesByGenreListener)
        }
    })

