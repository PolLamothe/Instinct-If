const loginPage = document.querySelector("#connexionPage")
const pswdForgetPage = document.querySelector("#mdpForgetPage")
const newAccountPage = document.querySelector("#newAccountPage")

function switchPage(p) {
    switch (p) {
        case "mdpForget":
            pswdForgetPage.style.display = 'flex'
            loginPage.style.display = 'none'
            newAccountPage.style.display = 'none'
            break
        case "newAccount":
            pswdForgetPage.style.display = 'none'
            loginPage.style.display = 'none'
            newAccountPage.style.display = 'flex'
            break
        case "backNewAccount":
            pswdForgetPage.style.display = 'none'
            loginPage.style.display = 'flex'
            newAccountPage.style.display = 'none'
            break
        case "backMdpForget":
            pswdForgetPage.style.display = 'none'
            loginPage.style.display = 'flex'
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

// Vérif email
const loginForm = document.querySelector('#login form');
const emailInput = document.querySelector('#login form .em');
const emailError = document.querySelector('#emailError');

loginForm.addEventListener('submit', function(event) {
    if (!isValidEmail(emailInput.value)) {
        emailError.style.display = 'block'; // Afficher le message d'erreur
        event.preventDefault(); // Empêcher l'envoi du formulaire si l'email n'est pas valide
    } else {
        emailError.style.display = 'none'; // Cacher le message d'erreur si l'email est valide
    }
});

function isValidEmail(email) {
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
