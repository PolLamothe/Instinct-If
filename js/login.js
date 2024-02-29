const loginPage = document.querySelector("#connexionPage")
const pswdForgetPage = document.querySelector("#mdpForgetPage")
const newAccountPage = document.querySelector("#newAccountPage")

function switchPage(p) {
    switch (p) {
        case "mdpForget":
            pswdForgetPage.style.display = 'block'
            loginPage.style.display = 'none'
            newAccountPage.style.display = 'none'
            break
        case "newAccount":
            pswdForgetPage.style.display = 'none'
            loginPage.style.display = 'none'
            newAccountPage.style.display = 'block'
            break
        case "backNewAccount":
            pswdForgetPage.style.display = 'none'
            loginPage.style.display = 'block'
            newAccountPage.style.display = 'none'
            break
        case "backMdpForget":
            pswdForgetPage.style.display = 'none'
            loginPage.style.display = 'block'
            newAccountPage.style.display = 'none'
            break
    }
}

document.querySelector("#mdpForget").addEventListener('click', (e) => {
    switchPage(e.target.id)
})

document.querySelector("#newAccount").addEventListener('click', (e) => {
    switchPage(e.target.id)
})

document.querySelector("#backNewAccount").addEventListener('click', (e) => {
    switchPage(e.target.id)
})

document.querySelector("#backMdpForget").addEventListener('click', (e) => {
    switchPage(e.target.id)
})
