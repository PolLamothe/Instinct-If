// Pages
let home = document.querySelector('#home')
let gamePage = document.querySelector('#game')
let login = document.querySelector('#login')

// Nav
let navItems = document.querySelectorAll('.nav__item__btn')
let lastActiveElement = document.querySelector('.nav__item__btn.active')

function switchWindow(w) {
    switch (w.id){
        case "nav-home":
            lastActiveElement.classList.remove('active')
            w.classList.add('active')
            lastActiveElement = w
            home.style.display = "block"
            gamePage.style.display = "none"
            login.style.display = 'none'
            break
        case "nav-game":
            lastActiveElement.classList.remove('active')
            w.classList.add('active')
            lastActiveElement = w
            home.style.display = "none"
            gamePage.style.display = "flex"
            login.style.display = 'none'
            break
        case "nav-login":
            lastActiveElement.classList.remove('active')
            w.classList.add('active')
            lastActiveElement = w
            home.style.display = "none"
            gamePage.style.display = "none"
            login.style.display = 'block'
            break
    }
}

navItems.forEach(item => {
    item.addEventListener('click', (e) => {
        switchWindow(e.target)
    })
})

// Game navigation
/*let fullscreen = document.querySelector("#fullscreen")
fullscreen.addEventListener('click', () => {
    gamePage.classList.toggle('fullscreen')
})*/

// Launcher
let frameLauncher = document.querySelector('.game-screen')

function launcher(game) {
    switch (game) {
        case "souris":
            frameLauncher.src = "./game/mouse/index.html"
            break
        case "ttt":
            frameLauncher.src = "./game/tic-tac-toe/index.html"
            break
        case "snake-play":
            frameLauncher.src = "./game/snake/index.html"
            break
        case "Tetris":
            frameLauncher.src = "./game/tetris/index.html"
            break
    }
    switchWindow(navItems[2])
    frameLauncher.focus()
}

let playBtn = document.querySelectorAll(".play")

playBtn.forEach(btn => {
    btn.addEventListener('click', (e) => {
        launcher(e.target.id)
    })
})