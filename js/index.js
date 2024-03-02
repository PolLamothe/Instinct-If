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
            gameNavChangeState('hide')
            break
        case "nav-game":
            lastActiveElement.classList.remove('active')
            w.classList.add('active')
            lastActiveElement = w
            home.style.display = "none"
            gamePage.style.display = "flex"
            login.style.display = 'none'
            gameNavChangeState('show')
            break
        case "nav-login":
            lastActiveElement.classList.remove('active')
            w.classList.add('active')
            lastActiveElement = w
            home.style.display = "none"
            gamePage.style.display = "none"
            login.style.display = 'block'
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
let toogleDark = document.querySelector("#dark-mode")
let root = document.documentElement
let darkChange = {
    "--bg1": "#f4f4f4",
    "--bg3": "#181735",
    "--text-color": "#444394",
    "--fs-bg": "rgba(244, 244, 244, 0.70)"
}

let lightChange = {
    "--bg1" : "#181735",
    "--bg2": "#444394",
    "--bg3": "#ffffff",
    "--text-color": "#ffffff",
    "--text-color-inactive": "rgba(255, 255, 255, 0.5)",
    "--fs-bg": "rgba(24, 23, 53, 0.70)"
}

toogleDark.addEventListener('click', () => {
    if (toogleDark.checked) {
        root.classList.remove("dark_mode")
    } else {
        root.classList.add("dark_mode")
    }
    if(!toogleDark.checked){
        for (let [key,value] of Object.entries(darkChange)){
            $("html").css(key,value)
        }
        document.getElementById("game-frame").contentWindow.postMessage(darkChange)
    }else{
        for (let [key,value] of Object.entries(lightChange)){
            $("html").css(key,value)
        }
        document.getElementById("game-frame").contentWindow.postMessage(lightChange)
    }
})
toogleDark.checked = !root.classList.contains("dark_mode")