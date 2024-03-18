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

const mdpForgetPageForm = document.querySelector('#mdpForgetPage form');
const email1Input = document.querySelector('#mdpForgetPage form .em1');
const email2Error = document.querySelector('#email2Error');

const newAccountPageForm = document.querySelector('#newAccountPage form');
const email2Input = document.querySelector('#newAccountPage form .em2');
const email3Error = document.querySelector('#email3Error');

loginForm.addEventListener('submit', function(event) {
    if (!isValidEmail(emailInput.value)) {
        emailError.style.display = 'block'; // Afficher le message d'erreur
        event.preventDefault(); // Empêcher l'envoi du formulaire si l'email n'est pas valide
    } else {
        emailError.style.display = 'none'; // Cacher le message d'erreur si l'email est valide
    }
});

emailInput.addEventListener('input', function() {
    if (emailInput.value.trim() === '') {
        emailError.style.display = 'none'; // Cacher le message d'erreur si le champ est vide
    }
});

mdpForgetPageForm.addEventListener('submit', function(event) {
    if (!isValidEmail(email1Input.value)) {
        email2Error.style.display = 'block'; // Afficher le message d'erreur
        event.preventDefault(); // Empêcher l'envoi du formulaire si l'email n'est pas valide
    } else {
        email2Error.style.display = 'none'; // Cacher le message d'erreur si l'email est valide
    }
});

email1Input.addEventListener('input', function() {
    if (email1Input.value.trim() === '') {
        email2Error.style.display = 'none'; // Cacher le message d'erreur si le champ est vide
    }
});

email2Input.addEventListener('input', function(event) {
    if (!isValidEmail(email2Input.value)) {
        email3Error.style.display = 'block'; // Afficher le message d'erreur
        event.preventDefault(); // Empêcher l'envoi du formulaire si l'email n'est pas valide
    } else {
        email3Error.style.display = 'none'; // Cacher le message d'erreur si l'email est valide
    }
});

email2Input.addEventListener('input', function() {
    if (email2Input.value.trim() === '') {
        email3Error.style.display = 'none'; // Cacher le message d'erreur si le champ est vide
    }
});


function isValidEmail(email) {
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}


const password1Input = document.getElementById('password1');
const password2Input = document.getElementById('password2');
const passwordMismatchError = document.getElementById('passwordMismatchError');

function validatePasswords() {
    if (password2Input.value !== '' && password1Input.value !== password2Input.value) {
        password2Input.setCustomValidity(''); // Réinitialiser la validation personnalisée au cas où elle aurait été définie précédemment
        passwordMismatchError.style.display = 'block';
        password2Input.setCustomValidity('Les mots de passe doivent correspondre.');
    } else {
        passwordMismatchError.style.display = 'none';
        password2Input.setCustomValidity('');
    }
}

password2Input.addEventListener('input', validatePasswords);