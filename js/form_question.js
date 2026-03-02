(function(){
    const countrySelect = document.getElementById('country-select');
    const countryList = document.getElementById('country-list');
    const selectedFlag = document.getElementById('selected-flag');
    const selectedCode = document.getElementById('selected-code');
    const hiddenInput = document.getElementById('country-code-hidden');
    const phoneInput = document.getElementById('phone');

    const countries = [
        { code: '+7', flag: '🇷🇺', name: 'Россия' },
        { code: '+375', flag: '🇧🇾', name: 'Беларусь' },
        { code: '+380', flag: '🇺🇦', name: 'Украина' },
        { code: '+1', flag: '🇺🇸', name: 'США' },
        { code: '+44', flag: '🇬🇧', name: 'Великобритания' }
    ];

    // Заполняем список
    countries.forEach(({code, flag, name}) => {
        const item = document.createElement('div');
        item.setAttribute('role', 'option');
        item.setAttribute('tabindex', '0');
        item.dataset.code = code;
        item.dataset.flag = flag;
        item.textContent = `${flag} ${code} — ${name}`;
        countryList.appendChild(item);

        item.addEventListener('click', () => {
            selectCountry(code, flag);
            closeList();
            countrySelect.focus();
            phoneInput.focus();
        });

        item.addEventListener('keydown', e => {
            if(e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                selectCountry(code, flag);
                closeList();
                countrySelect.focus();
                phoneInput.focus();
            } else if(e.key === 'ArrowDown') {
                e.preventDefault();
                if(item.nextElementSibling) item.nextElementSibling.focus();
                else countryList.firstChild.focus();
            } else if(e.key === 'ArrowUp') {
                e.preventDefault();
                if(item.previousElementSibling) item.previousElementSibling.focus();
                else countryList.lastChild.focus();
            } else if(e.key === 'Escape') {
                e.preventDefault();
                closeList();
                countrySelect.focus();
            }
        });
    });

    function openList() {
        countryList.classList.add('open');
        countrySelect.classList.add('open');
        countrySelect.setAttribute('aria-expanded', 'true');
        // позиционируем список под кнопкой
        const rect = countrySelect.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
        countryList.style.top = (rect.bottom + scrollTop + 4) + 'px';
        countryList.style.left = (rect.left + scrollLeft) + 'px';
        countryList.style.width = '220px';
        // Фокус на первом элементе
        const firstOption = countryList.querySelector('div');
        if(firstOption) firstOption.focus();
    }

    function closeList() {
        countryList.classList.remove('open');
        countrySelect.classList.remove('open');
        countrySelect.setAttribute('aria-expanded', 'false');
    }

    function toggleList() {
        if(countryList.classList.contains('open')) {
            closeList();
        } else {
            openList();
        }
    }

    function selectCountry(code, flag) {
        selectedCode.textContent = code;
        selectedFlag.textContent = flag;
        hiddenInput.value = code;
    }

    countrySelect.addEventListener('click', () => {
        toggleList();
    });

    countrySelect.addEventListener('keydown', e => {
        if(e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
            e.preventDefault();
            openList();
        } else if(e.key === 'Escape') {
            e.preventDefault();
            closeList();
        }
    });

    // Закрываем список при клике вне
    document.addEventListener('click', e => {
        if(!countrySelect.contains(e.target) && !countryList.contains(e.target)) {
            closeList();
        }
    });

    // Маска ввода телефона: формат "999 999 99 99"
    phoneInput.addEventListener('input', onPhoneInput);
    phoneInput.addEventListener('keydown', onPhoneKeyDown);
    phoneInput.addEventListener('paste', onPhonePaste);

    function onPhoneInput(e) {
        let value = phoneInput.value;
        // Удаляем все кроме цифр
        value = value.replace(/\D/g, '');

        // Ограничиваем длину до 9 цифр (примерно для формата)
        if(value.length > 9) {
            value = value.slice(0,9);
        }

        // Форматируем: 999 999 99 99
        let formatted = '';
        for(let i=0; i<value.length; i++){
            if(i === 3 || i === 6 || i === 8) formatted += ' ';
            formatted += value[i];
        }

        phoneInput.value = formatted;
    }

    // Чтобы курсор не прыгал при удалении пробелов
    function onPhoneKeyDown(e) {
        const pos = phoneInput.selectionStart;
        if(e.key === 'Backspace' && pos) {
            // Если перед курсором пробел, то удаляем его тоже
            if(phoneInput.value[pos-1] === ' ') {
                e.preventDefault();
                phoneInput.setSelectionRange(pos-1, pos-1);
                let valArr = phoneInput.value.split('');
                valArr.splice(pos-1,1);
                phoneInput.value = valArr.join('');
                phoneInput.setSelectionRange(pos-1, pos-1);
            }
        }
    }

    // При вставке — очистить от всего кроме цифр и применить маску
    function onPhonePaste(e) {
        e.preventDefault();
        const paste = (e.clipboardData || window.clipboardData).getData('text');
        let digits = paste.replace(/\D/g, '').slice(0,9);
        let formatted = '';
        for(let i=0; i<digits.length; i++){
            if(i === 3 || i === 6 || i === 8) formatted += ' ';
            formatted += digits[i];
        }
        phoneInput.value = formatted;
    }

    // Обработка отправки формы
    window.handleSubmit = function() {
        const form = document.getElementById('contact-form');
        const name = form.name.value.trim();
        const code = hiddenInput.value;
        const phone = form.phone.value.trim();

        if(!name) {
            alert('Пожалуйста, введите имя.');
            form.name.focus();
            return;
        }
        if(!phone) {
            alert('Пожалуйста, введите номер телефона.');
            form.phone.focus();
            return;
        }

        // Проверка на минимальную длину номера (например, не менее 9 цифр)
        const digitsOnly = phone.replace(/\D/g, '');
        if(digitsOnly.length < 9) {
            alert('Пожалуйста, введите корректный номер телефона.');
            form.phone.focus();
            return;
        }

        const fullPhone = code + ' ' + phone;
        alert(`Спасибо, ${name}!\nМы свяжемся с вами по номеру: ${fullPhone}`);

        form.reset();
        selectCountry('+7', '🇷🇺'); // сбросить код на +7
    };

    // Инициализация
    selectCountry('+7', '🇷🇺');
})();