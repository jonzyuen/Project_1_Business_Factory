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
getGamesByGenre("Action").then((results) => {
    //Do stuff with results of query. Results holds array of all games for a certain genre
    console.log(results)
})

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
