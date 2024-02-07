let home = document.querySelector('#home')
let gamePage = document.querySelector('#game')
let frameLauncher = document.querySelector('.game-screen')

function launcher(game) {
    home.style.display = "none"
    gamePage.style.display = "flex"
    switch (game) {
        case "souris":
            frameLauncher.src = "./game/mouse/index.html"
            break
        case "ttt":
            frameLauncher.src = "./game/tic-tac-toe/index.html"
            break
    }
}

let playBtn = document.querySelectorAll(".play")

playBtn.forEach(btn => {
    btn.addEventListener('click', (e) => {
        launcher(e.target.id)
    })
})

function backHome() {
    home.style.display = "block"
    gamePage.style.display = "none"
}

let navHome = document.querySelector('#nav-home')

navHome.addEventListener('click', () =>  {
    backHome()
})