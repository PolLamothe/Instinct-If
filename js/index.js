// Pages
let home = document.querySelector('#home')
let gamePage = document.querySelector('#game')
let login = document.querySelector('#login')
let merch = document.querySelector("#merch")

// Nav
let navItems = document.querySelectorAll('.nav__item__btn')
let lastActiveElement = document.querySelector('.nav__item__btn.active')

$('#merch').load("./merch/merch.html")

function switchWindow(w) {
    switch (w.id){
        case "nav-home":
            lastActiveElement.classList.remove('active')
            w.classList.add('active')
            lastActiveElement = w
            home.style.display = "block"
            gamePage.style.display = "none"
            login.style.display = 'none'
            merch.style.display = 'none'
            gameNavChangeState('hide')
            break
        case "nav-game":
            lastActiveElement.classList.remove('active')
            w.classList.add('active')
            lastActiveElement = w
            home.style.display = "none"
            gamePage.style.display = "flex"
            login.style.display = 'none'
            merch.style.display = 'none'
            gameNavChangeState('hide')
            break
        case "nav-login":
            lastActiveElement.classList.remove('active')
            w.classList.add('active')
            lastActiveElement = w
            home.style.display = "none"
            gamePage.style.display = "none"
            login.style.display = 'block'
            merch.style.display = 'none'
            gameNavChangeState('hide')
            break
        case "nav-merch":
            lastActiveElement.classList.remove('active')
            w.classList.add('active')
            lastActiveElement = w
            home.style.display = "none"
            gamePage.style.display = "none"
            login.style.display = 'none'
            merch.style.display = 'block'
            gameNavChangeState('hide')
            break
    }
}

navItems.forEach(item => {
    item.addEventListener('click', (e) => {
        switchWindow(e.target)
    })
})

// Dark mode
let toggleDark = document.querySelector("#dark-mode")
let root = document.documentElement

let darkMode = {
    "--bg1": "#181735",
    "--bg2": "#444394",
    "--bg3": "#ffffff",
    "--text-color": "#ffffff",
    "--text-color-inactive": "rgba(255, 255, 255, 0.5)",
    "--fs-bg": "rgba(24, 23, 53, 0.70)"
}
let lightMode = {
    "--bg1": "#f4f4f4",
    "--bg2": "#444394",
    "--bg3": "#181735",
    "--text-color": "#444394",
    "--text-color-inactive": "rgba(255, 255, 255, 0.5)",
    "--fs-bg": "rgba(244, 244, 244, 0.70)"
}

// Dark mode par défaut en fonction de l'utilisateur
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    root.classList.add("dark_mode")
}

toggleDark.addEventListener('click', () => {
    if (toggleDark.checked) {
        root.classList.add("dark_mode")
        document.querySelector(".mainlogo").style.filter = "invert(0%)"
        document.querySelector(".game-screen").contentWindow.postMessage(darkMode)
    } else {
        root.classList.remove("dark_mode")
        document.querySelector(".mainlogo").style.filter = "invert(100%)"
        document.querySelector(".game-screen").contentWindow.postMessage(lightMode)
    }
})

toggleDark.checked = root.classList.contains("dark_mode")

//-------------------------------
// Critères de recherche home page
//-------------------------------
let search = ""
let note = "descending"
let categories = {
    psychology: true,
    bolt: true
}
let gameList = []
let allGamesCards = document.querySelectorAll(".card")
const bestGames = document.querySelector(".bestGames")

allGamesCards.forEach(game => {
    if (game.id !== "") {
        let gameInfos = {
            name: document.querySelector(`#${game.id} .card__game__title`).innerText,
            note: parseInt(document.querySelector(`#${game.id} .card__note__number`).innerText),
            category: document.querySelector(`#${game.id} .card__title__left .material-symbols-rounded`).innerText,
            element: game
        }
        gameList.push(gameInfos)
    }
})

function gameSortAscending(a, b) {
    if (a.note > b.note) {
        return 1
    } else if (a.note === b.note) {
        return 0
    }
    return -1
}
function gameSortDescending(a, b) {
    if (a.note < b.note) {
        return 1
    } else if (a.note === b.note) {
        return 0
    }
    return -1
}

function query() {
    let gameQuery = []
    gameList.forEach(game => {
        let gNameNormalize = game.name.toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '')
        let searchNormalize = search.toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '')

        if (gNameNormalize.includes(searchNormalize) && ((game.category === "psychology" && categories.psychology) || (game.category === "bolt" && categories.bolt))) {
            gameQuery.push(game)
        }
    })
    let gameQuerySorted = []
    if (note === "descending") {
        gameQuery.sort(gameSortDescending)
    } else if (note === "ascending") {
        gameQuery.sort(gameSortAscending)
    }
    gameQuery.forEach(g => {
        gameQuerySorted.push(g.element)
    })
    bestGames.replaceChildren(...gameQuerySorted)
}

// Search
const searchInput = document.querySelector(".search__field")
searchInput.addEventListener("input", (e) => {
    search = e.target.value
    query()
})

// Note
const noteInput = document.querySelector("#note_selection")
noteInput.addEventListener("input", (e) => {
    note = e.target.value
    query()
})

// Categories
const categoryPsychology = document.querySelector("#cat_psychology")
const categoryBolt = document.querySelector("#cat_bolt")
categoryPsychology.addEventListener("input", (e) => {
    categories.psychology = e.target.checked
    query()
})
categoryBolt.addEventListener("input", (e) => {
    categories.bolt = e.target.checked
    query()
})

//-------------------------------
// Description des jeux
//-------------------------------
const closeBtns = document.querySelectorAll(".game_desc .desc_title .material-symbols-rounded")
const cards = document.querySelectorAll(".card")
const allDescs = document.querySelectorAll(".game_desc")

cards.forEach(card => {
    card.addEventListener('click', (e) => {
        // Close all before opening
        allDescs.forEach(desc => {
            desc.style.transform = "translateX(100%)"
        })
        document.querySelector(`#${card.id.split("_")[0]}_d`).style.transform = "translateX(0)"
    })
})

closeBtns.forEach(btn => {
    btn.addEventListener('click', (e) =>  {
        document.querySelector("#" + e.target.dataset.id).style.transform = "translateX(100%)"
    })
})
