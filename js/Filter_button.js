    function resetFilters() {
    // Сбросить все чекбоксы и радио к изначальному состоянию
    const checkboxes = document.querySelectorAll('.filter-panel input[type="checkbox"]');
    checkboxes.forEach(cb => {
    cb.checked = cb.defaultChecked;
});

    const radios = document.querySelectorAll('.filter-panel input[type="radio"]');
    radios.forEach(radio => {
    radio.checked = radio.defaultChecked;
});

    // Сброс значений input[type="number"]
    const numberInputs = document.querySelectorAll('.filter-panel input[type="number"]');
    numberInputs.forEach(input => {
    input.value = input.defaultValue;
});

    // Сброс значений input[type="date"]
    const dateInputs = document.querySelectorAll('.filter-panel input[type="date"]');
    dateInputs.forEach(input => {
    input.value = input.defaultValue;
});

    // Можно добавить сброс слайдеров, если они управляются JS (зависит от реализации)
    // Например, если используете noUiSlider, нужно вызвать reset на слайдерах

    console.log('Фильтры сброшены к значениям по умолчанию');
}

    function applyFilters() {
    // Собираем значения формы
    const formValues = {};

    // Форма обучения (checkboxes)
    formValues.form = Array.from(document.querySelectorAll('input[name="form"]:checked')).map(el => el.value);

    // Длительность (числовые значения)
    formValues.durationFrom = document.getElementById('durationFrom').value;
    formValues.durationTo = document.getElementById('durationTo').value;

    // Документы (checkboxes)
    formValues.docs = Array.from(document.querySelectorAll('input[name="docs"]:checked')).map(el => el.value);

    // Требование к образованию (radio)
    const education = document.querySelector('input[name="education"]:checked');
    formValues.education = education ? education.value : null;

    // Тип программы (checkboxes)
    formValues.program_type = Array.from(document.querySelectorAll('input[name="program_type"]:checked')).map(el => el.value);

    // Стоимость (числовые значения)
    formValues.costFrom = document.getElementById('durationFroms').value;
    formValues.costTo = document.getElementById('durationTos').value;

    // Дата проведения (date)
    formValues.dateFrom = document.getElementById('dateFrom').value;
    formValues.dateTo = document.getElementById('dateTo').value;

    // Иностранное гражданство (checkbox)
    formValues.foreignCitizen = document.getElementById('foreignCitizen').checked;

    console.log('Примененные фильтры:', formValues);

    // Здесь можно добавить логику применения фильтров, например, фильтрацию списка курсов
}


    // Функция для сохранения состояния в localStorage
    function saveToLocalStorage(cardIndex, isFavorite) {
        const favorites = JSON.parse(localStorage.getItem('favorites')) || {};
        favorites[cardIndex] = isFavorite;
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }

    // Функция для загрузки состояния из localStorage
    function loadFromLocalStorage(cardIndex) {
        const favorites = JSON.parse(localStorage.getItem('favorites')) || {};
        return favorites[cardIndex] || false; // По умолчанию false
    }

    // При загрузке страницы устанавливаем состояние кнопок
    document.addEventListener('DOMContentLoaded', function() {
        document.querySelectorAll('.favorite-btn').forEach((btn, index) => {
            const icon = btn.querySelector('i');
            const isFavorite = loadFromLocalStorage(index);

            if (isFavorite) {
                icon.classList.remove('far');
                icon.classList.add('fas');
            } else {
                icon.classList.remove('fas');
                icon.classList.add('far');
            }
        });
    });

    // Обработчик клика с сохранением
    document.querySelectorAll('.favorite-btn').forEach((btn, index) => {
        btn.addEventListener('click', function() {
            const icon = this.querySelector('i');
            icon.classList.contains('far');
// Если far, то будет переключено на fas

            icon.classList.toggle('far'); // Пустая звезда
            icon.classList.toggle('fas'); // Заполненная звезда

            // Сохраняем новое состояние
            saveToLocalStorage(index, icon.classList.contains('fas'));
        });
    });
