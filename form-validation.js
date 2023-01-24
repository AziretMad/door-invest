const fullNameValue = document.querySelector('#full-name');
const phoneNumberValue = document.querySelector('#phone-number');
const emailValue = document.querySelector('#email');

const form = document.querySelector('#form');

const isBlank = value => value == '' ? true : false;

const isEmailValid = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};

const showSuccess = (input) => {
    const formField = input.parentElement;
    formField.classList.remove('error');
    
    var element = document.getElementById("form");
    element.classList.remove('extra-height');
    formField.classList.add('success');

    const error = formField.querySelector('small');
    error.textContent = '';
}

const showError = (input, message) => {
    const formField = input.parentElement;
    formField.classList.remove('success');
    formField.classList.add('error');

    var element = document.getElementById("form");
    element.classList.add('extra-height');

    const error = formField.querySelector('small');
    error.textContent = message;
};

const checkFullName = () => {
    let valid = false;
    const fullName = fullNameValue.value.trim();

    if (isBlank(fullName)) {
        showError(fullNameValue, 'ФИО не может быть пустым');
    } else {
        showSuccess(fullNameValue);
        valid = true;
    }
    return valid;
}

const checkPhoneNumber = () => {
    let valid = false;
    const phoneNumber = phoneNumberValue.value.trim();

    if (isBlank(phoneNumber)) {
        showError(phoneNumberValue, 'Номер телефона не может быть пустым');
    } else {
        showSuccess(phoneNumberValue)
        valid = true;
    }
    return valid;
}

const checkEmail = () => {
    let valid = false;
    const email = emailValue.value.trim();

    if (isBlank(email)) {
        showError(emailValue, 'Электронная почта не может быть пустой');
    } else if (!isEmailValid(email)) {
        showError(emailValue, 'Электронная почта не действительна')
    } else {
        showSuccess(emailValue)
        valid = true;
    }
    return valid;
};

form.addEventListener('submit', function (e) {
    e.preventDefault();

    let isFullNameValid = checkFullName(),
        isEmailValid = checkEmail(),
        isPhoneNumberValid = checkPhoneNumber();

    let isFormValid = isFullNameValid && isEmailValid && isPhoneNumberValid;

    if (isFormValid) {

    }
});

const debounce = (fn, delay = 500) => {
    let timeoutId;
    return (...args) => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => {
            fn.apply(null, args)
        }, delay);
    };
};

form.addEventListener('input', debounce(function (e) {
    switch (e.target.id) {
        case 'full-name':
            checkFullName();
            break;
        case 'email':
            checkEmail();
            break;
        case 'phone-number':
            checkPhoneNumber();
            break;
    }
}));