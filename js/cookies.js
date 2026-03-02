// Функция для установки cookies
function setCookie(name, value, days = 30) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + encodeURIComponent(value) + ";" + expires + ";path=/";
}

// Функции валидации отдельных полей (для реал-тайм уборки ошибок)
function validateName() {
    const name = document.getElementById('UserName').value.trim();
    if (name) {
        document.getElementById('UserName').classList.remove('error');
        document.getElementById('nameError').style.display = 'none';
    }
}

function validatePhone() {
    const phone = document.getElementById('PhoneNum').value.trim();
    const phonePattern = /^[\+\-\(\)]*(\d[\-\(\)]*){7,15}$/;
    if (phone && phonePattern.test(phone)) {
        document.getElementById('PhoneNum').classList.remove('error');
        document.getElementById('phoneError').style.display = 'none';
    }
}

function validateEmail() {
    const email = document.getElementById('email').value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && emailPattern.test(email)) {
        document.getElementById('email').classList.remove('error');
        document.getElementById('emailError').style.display = 'none';
    }
}

// Валидация всей формы (для отправки)
function validateForm() {
    let isValid = true;

    // Сброс ошибок
    document.querySelectorAll('.error-message').forEach(el => el.style.display = 'none');
    document.querySelectorAll('input').forEach(el => el.classList.remove('error'));

    // Имя
    const name = document.getElementById('UserName').value.trim();
    if (!name) {
        document.getElementById('nameError').style.display = 'block';
        document.getElementById('UserName').classList.add('error');
        isValid = false;
    }

    // Телефон (независимо от страны: опциональный +, 7-15 цифр, допускает дефисы/скобки, без пробелов)
    const phone = document.getElementById('PhoneNum').value.trim();
    const phonePattern = /^[\+\-\(\)]*(\d[\-\(\)]*){7,15}$/;
    if (!phone || !phonePattern.test(phone)) {
        document.getElementById('phoneError').style.display = 'block';
        document.getElementById('PhoneNum').classList.add('error');
        isValid = false;
    }

    // Email
    const email = document.getElementById('email').value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailPattern.test(email)) {
        document.getElementById('emailError').style.display = 'block';
        document.getElementById('email').classList.add('error');
        isValid = false;
    }

    return isValid;
}

// Обработчик отправки формы
document.getElementById('requestForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Предотвращаем отправку

    if (validateForm()) {
        // Сохраняем в cookies
        const name = document.getElementById('UserName').value.trim();
        const phone = document.getElementById('PhoneNum').value.trim();
        const email = document.getElementById('email').value.trim();

        setCookie('requestName', name);
        setCookie('requestPhone', phone);
        setCookie('requestEmail', email);
    }
});

// Добавляем обработчики input для реал-тайм валидации
document.getElementById('UserName').addEventListener('input', validateName);
document.getElementById('PhoneNum').addEventListener('input', validatePhone);
document.getElementById('email').addEventListener('input', validateEmail);




//////////////////////// LocalStorage ////////////////////////
// Функция для валидации
// Обернуть весь код в DOMContentLoaded, чтобы избежать ошибок с null-элементами
document.addEventListener('DOMContentLoaded', function() {
    // Функции валидации отдельных полей (для реал-тайм уборки ошибок и показа для пустых полей)
    function validateName() {
        const name = document.getElementById('name1').value.trim();
        const nameInput = document.getElementById('name1');
        const nameError = document.getElementById('nameError1');

        if (!name) {
            nameInput.classList.add('error');
            nameError.textContent = 'Имя обязательно для заполнения.';
            nameError.style.display = 'block';
        } else if (name.length < 2) {
            nameInput.classList.add('error');
            nameError.textContent = 'Имя должно содержать минимум 2 символа.';
            nameError.style.display = 'block';
        } else {
            nameInput.classList.remove('error');
            nameError.style.display = 'none';
        }
    }

    function validatePhone() {
        const phone = document.getElementById('phone1').value.trim();
        const phoneInput = document.getElementById('phone1');
        const phoneError = document.getElementById('phoneError1');
        const phoneRegex = /^[+\d\s\-()]+$/;

        if (!phone) {
            phoneInput.classList.add('error');
            phoneError.textContent = 'Телефон обязателен для заполнения.';
            phoneError.style.display = 'block';
        } else if (!phoneRegex.test(phone) || phone.length < 7) {
            phoneInput.classList.add('error');
            phoneError.textContent = 'Введите корректный номер телефона (минимум 7 символов).';
            phoneError.style.display = 'block';
        } else {
            phoneInput.classList.remove('error');
            phoneError.style.display = 'none';
        }
    }

    function validateEmail() {
        const email = document.getElementById('email1').value.trim();
        const emailInput = document.getElementById('email1');
        const emailError = document.getElementById('emailError1');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!email) {
            emailInput.classList.add('error');
            emailError.textContent = 'Email обязателен для заполнения.';
            emailError.style.display = 'block';
        } else if (!emailRegex.test(email)) {
            emailInput.classList.add('error');
            emailError.textContent = 'Введите корректный email.';
            emailError.style.display = 'block';
        } else {
            emailInput.classList.remove('error');
            emailError.style.display = 'none';
        }
    }

    // Валидация всей формы (для отправки)
    function validateForm() {
        let isValid = true;

        // Сброс ошибок
        document.querySelectorAll('.error-message').forEach(el => el.style.display = 'none');
        document.querySelectorAll('input').forEach(el => el.classList.remove('error'));
        document.getElementById('errorMessages').innerHTML = '';
        document.getElementById('successMessage').innerHTML = '';

        // Имя
        const name = document.getElementById('name1').value.trim();
        if (name.length < 2) {
            document.getElementById('nameError1').style.display = 'block';
            document.getElementById('name1').classList.add('error');
            isValid = false;
        }

        // Телефон
        const phone = document.getElementById('phone1').value.trim();
        const phoneRegex = /^[+\d\s\-()]+$/;
        if (!phone || !phoneRegex.test(phone) || phone.length < 7) {
            document.getElementById('phoneError1').style.display = 'block';
            document.getElementById('phone1').classList.add('error');
            isValid = false;
        }

        // Email
        const email = document.getElementById('email1').value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email)) {
            document.getElementById('emailError1').style.display = 'block';
            document.getElementById('email1').classList.add('error');
            isValid = false;
        }

        return isValid;
    }

    // Функция для сохранения в LocalStorage
    function saveToLocalStorage(name, phone, email) {
        const formData = { name, phone, email };
        localStorage.setItem('formData', JSON.stringify(formData));
    }

    // Функция для загрузки из LocalStorage
    function loadFromLocalStorage() {
        const savedData = localStorage.getItem('formData');
        if (savedData) {
            const formData = JSON.parse(savedData);
            document.getElementById('name1').value = formData.name || '';
            document.getElementById('phone1').value = formData.phone || '';
            document.getElementById('email1').value = formData.email || '';
        }
    }

    // Обработчик отправки формы
    document.getElementById('contactForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Предотвратить реальную отправку

        if (validateForm()) {
            const name = document.getElementById('name1').value.trim();
            const phone = document.getElementById('phone1').value.trim();
            const email = document.getElementById('email1').value.trim();

            saveToLocalStorage(name, phone, email);
            document.getElementById('successMessage').innerHTML = 'Заявка сохранена! Мы перезвоним вам в течение часа.';

            // Очистить форму после сохранения (опционально)
            // document.getElementById('contactForm').reset();
        }
    });

    // Добавляем обработчики input для реал-тайм валидации
    document.getElementById('name1').addEventListener('input', validateName);
    document.getElementById('phone1').addEventListener('input', validatePhone);
    document.getElementById('email1').addEventListener('input', validateEmail);

    // Загрузить данные при загрузке страницы
    loadFromLocalStorage();
});
//////////////////////// JSON файл ////////////////////////
// Объект правил валидации по ID полей (ваши изменения: убрана country-code-hidden)
const validationRules = {
    'name': {
        required: true,
        minLength: 2,
        errorId: 'nameError2',
        validate: (value) => value.trim().length >= 2
    },
    'phone': {
        required: true,
        minLength: 5,
        regex: /^[0-9\s\-]+$/,
        errorId: 'phoneError2',
        validate: (value) => value.trim().match(/^[0-9\s\-]+$/) && value.trim().length >= 5
    }
};

// Функция валидации по ID (без изменений)
function validateField(fieldId) {
    const rule = validationRules[fieldId];
    if (!rule) return true;

    const element = document.getElementById(fieldId);
    const errorElement = document.getElementById(rule.errorId);
    const value = element.value.trim();

    if (rule.required && value === '') {
        errorElement.textContent = 'Это поле обязательно для заполнения.';
        errorElement.style.display = 'block';
        return false;
    }

    if (value !== '' && !rule.validate(value)) {
        errorElement.style.display = 'block';
        return false;
    }

    errorElement.style.display = 'none';
    return true;
}

// Функция для обработки отправки формы (ваши изменения: убрана countryCode, successMessage1; убрано localStorage)
function handleSubmit() {
    let isValid = true;

    for (const fieldId in validationRules) {
        if (!validateField(fieldId)) {
            isValid = false;
        }
    }

    if (!isValid) {
        const firstInvalidField = Object.keys(validationRules).find(id => !validateField(id));
        document.getElementById(firstInvalidField).focus();
        return;
    }

    // Собираем данные в объект (ваши изменения: убрана countryCode)
    const formData = {
        name: document.getElementById('name').value.trim(),
        phone: document.getElementById('phone').value.trim(),
        fullPhone: document.getElementById('country-code-hidden').value + ' ' + document.getElementById('phone').value.trim(),
        timestamp: new Date().toISOString()
    };

    const jsonData = JSON.stringify(formData, null, 2);
    // Убрано: localStorage.setItem('contactFormData', jsonData);
    console.log('Данные в JSON формате:', jsonData);

    // Вместо alert: показываем сообщение на странице (successMessage1)
    const successMsg = document.getElementById('successMessage1');
    successMsg.style.display = 'block';
    setTimeout(() => successMsg.style.display = 'none', 3000); // Скрываем через 3 секунды

    // Очистка формы
    document.getElementById('name').value = '';
    document.getElementById('phone').value = '';

    // Опционально: скачать JSON как файл (раскомментируйте, если нужно)
    // downloadJSON(jsonData, 'contactData.json');
}

// Функция для скачивания JSON как файла (добавлена для вашего запроса)
function downloadJSON(data, filename) {
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Обработчики событий для реального времени валидации (без изменений)
document.getElementById('name').addEventListener('blur', () => validateField('name'));
document.getElementById('phone').addEventListener('blur', () => validateField('phone'));

