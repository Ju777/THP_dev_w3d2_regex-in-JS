// Vérificateur de formulaire

// Étape 1 : récupérer les informations saisies par l'utilisateur.

const firstname = document.querySelector('#firstname');
const lastname = document.querySelector('#lastname');
const age = document.querySelector('#age');
const email = document.querySelector('#email');
const emailConfirmation = document.querySelector('#email-confirmation');
const password = document.querySelector('#password');
const passwordConfirmation = document.querySelector('#password-confirmation');
const cgu = document.querySelector('input[value="checked"');
const form = document.querySelector('#subscription-form');

// Étape 2 : mettre un écouteur sur l'évènement 'submit' du formulaire.
form.addEventListener('submit', (e) => {
    e.preventDefault();
    console.clear();
    console.log(firstname.value);
    console.log(lastname.value);
    console.log(age.value);
    console.log(email.value);
    console.log(emailConfirmation.value);
    console.log(password.value);
    console.log(passwordConfirmation.value);
    console.log(cgu);

    // Initilialistation des valeurs du style de vérification.
    styleInit(firstname);
    styleInit(lastname);
    styleInit(age);
    styleInit(email);
    styleInit(emailConfirmation);
    styleInit(password);
    styleInit(passwordConfirmation);
    styleInit(cgu);    

    // Vérifier chaque champ.
    isFirstnameValid();
    isLastnameValid();
    isAgeValid();
    isEmailValid();
    isPasswordValid();
    isCGUValid();

    // Rediriger l'utilisateur vers un message / une page validant la saisie du formulaire.
    if(isFormValid()) {
        window.location.href = './form_validated.html';
    }

    // Pourquoi avoir testé chaque champ individuellement dans l'eventListener et les re-tester simultanément dans isFormValid ?
    // Parce que dans isFormValid(), si une condition est fausse, alors les suivantes ne sont pas testés et donc on obtient pas le formatage
    // styleError / styleSuccess à l'écran.    
});

styleInit = (element) => {
    element.classList.remove('error');
    element.classList.remove('success');
    element.nextElementSibling.innerHTML = '';
}

styleError = (element) => {
    element.classList.add('error');
    element.nextElementSibling.style.color = "red"
}

styleSuccess = (element) => {
    element.classList.add('success');
    element.nextElementSibling.style.color = "red"
}

isEmpty = (element) => {
    return element.value === '' ? true : false;
}

regexName = (name) => {
    nameRegex = /[a-z]{3,}/i;
    return nameRegex.test(name.value) ? true : false;
}

regexEmail = (email) => {
    emailRegex = /\w*\.*\w+@\w+\.\w{2,3}/;
    return emailRegex.test(email.value) ? true : false;
}

isFirstnameValid = () => {
    if(!regexName(firstname)) {
        styleError(firstname);
        firstname.nextElementSibling.innerHTML = "Le prénom doit faire au moins 3 caractères."
        return false;
    } else {
        styleSuccess(firstname);
        return true;
    }
}

isLastnameValid = () => {
    if(!regexName(lastname)) {
        styleError(lastname);
        lastname.nextElementSibling.innerHTML = "Le nom doit faire au moins 3 caractères."
        return false;
    } else {
        styleSuccess(lastname);
        return true;
    }
}

isAgeValid = () => {
    if(age.value < 18 || isEmpty(age)) {
        styleError(age);
        age.nextElementSibling.innerHTML = "Vous devez avoir 18 ans."
        return false;
    } else {
        styleSuccess(age);
        return true;
    }
}

isEmailValid = () => {
    if(email.value !== emailConfirmation.value || isEmpty(email) || isEmpty(emailConfirmation) || !regexEmail(email)){
        styleError(email);
        styleError(emailConfirmation);
        email.nextElementSibling.innerHTML = "Email incorrect."
        emailConfirmation.nextElementSibling.innerHTML = "Email incorrect."
        return false;
    } else {
        styleSuccess(email);
        styleSuccess(emailConfirmation);
        return true;
    }
}

isPasswordValid = () => {
    if(password.value !== passwordConfirmation.value || isEmpty(password) || isEmpty(passwordConfirmation) || password.value.length < 6){
        styleError(password);
        styleError(passwordConfirmation);
        password.nextElementSibling.innerHTML = "Mot de passe incorrect."
        passwordConfirmation.nextElementSibling.innerHTML = "Mot de passe incorrect."
        return false;
    } else {
        styleSuccess(password);
        styleSuccess(passwordConfirmation);
        return true;
    }
}

isCGUValid = () => {
    if(!cgu.checked){
        styleError(cgu);
        cgu.nextElementSibling.innerHTML = "Les CGU doivent être validées."
        return false;
    } else {
        return true;
    }
}

isFormValid = () => {
    if(isFirstnameValid() && isLastnameValid() && isAgeValid() && isEmailValid() && isPasswordValid() && isCGUValid()) {
        return true;
    } else {
        return false;
    }
}
