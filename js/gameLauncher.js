// --------
// gameLauncher : gère le chargement des jeux dans l'iframe
// --------
// Le nom du jeu et des id doit être le nom du dossier
let allGames = [
    "default",
    "mouse",
    "tic-tac-toe",
    "snake",
    "tetris",
    "deminer"
]

let frameLauncher = document.querySelector('.game-screen')
let gameSelect = document.querySelector('#game-selection')
let allPlayBtn = document.querySelectorAll(".play")

let gameNav = document.querySelector('.game_nav')

let gameRunning = false
let gameSelected = allGames[0]

let gameNavHide = document.querySelector("#gn_hide")
let gameNavFS = document.querySelector("#gn_fullscreen")
let gameNvPin = false

// Game navigation
let gameNavChangeState = (s) => {
    gameNav.className = `game_nav ${s}`
}
gameNavHide.addEventListener('click', () => {
    if (gameNvPin) {
        gameNavChangeState('show')
    } else {
        gameNavChangeState('close')
    }
    gameNvPin = false
    frameLauncher.focus()
})
gameNav.addEventListener('mouseenter', () => {
    if (gameNav.classList.contains('close') && !gameNvPin) {
        gameNavChangeState('show')
        gameNvPin = true
    }
})
gameNav.addEventListener('mouseleave', () => {
    if (gameNav.classList.contains('show') && gameNvPin) {
        gameNavChangeState('close')
        gameNvPin = false
    }
})

// Game selection in game nav
gameSelect.addEventListener('click', () =>  {
    gameNavChangeState('show')
    if (gameNvPin) {
        gameNvPin = false
    }
})
gameSelect.onchange = (e) => {
    if (allGames.includes(e.target.value)) {
        launcher(e.target.value)
    }
}

// Fullscreen
gameNavFS.addEventListener('click', () => {
    gamePage.classList.toggle('fullscreen')
    gameNavChangeState('show')
    gameNvPin = true
    if (gamePage.classList.contains('fullscreen')) {
        gameNavFS.innerText = "fullscreen_exit"
    } else {
        gameNavFS.innerText = "fullscreen"
    }
    frameLauncher.focus()
})

// Launcher in iframe
function launcher(game) {
    gameRunning = true
    if (gameSelected !== game) {
        gameSelected = game
        if (gameSelected === allGames[0]) {
            frameLauncher.src = ""
        } else {
            frameLauncher.src = "./game/" + gameSelected + "/index.html"
        }
    }
    switchWindow(navItems[2])
    frameLauncher.focus()
    gameSelect.value = gameSelected
}


allPlayBtn.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation()
        if (allGames.includes(e.target.id)) {
            launcher(e.target.id)
        }
    })
})

const playDescBtn = document.querySelectorAll(".desc_play")

playDescBtn.forEach(btn => {
    btn.addEventListener('click', (e) => {
        if (allGames.includes(e.target.dataset.id)) {
            launcher(e.target.dataset.id)
        }
    })
})