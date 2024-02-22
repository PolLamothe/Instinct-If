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

toogleDark.addEventListener('click', () => {
    if (toogleDark.checked) {
        root.classList.remove("dark_mode")
    } else {
        root.classList.add("dark_mode")
    }
})
toogleDark.checked = !root.classList.contains("dark_mode")