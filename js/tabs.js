const buttons = document.querySelectorAll('.cs-tab');
const header = document.getElementById('content-header');

buttons.forEach(button => {
    button.addEventListener('click', () => {
        // Снимаем активный класс со всех кнопок
        buttons.forEach(btn => btn.classList.remove('cs-tab--active'));
        // Добавляем активный класс к нажатой кнопке
        button.classList.add('cs-tab--active');

        // Меняем текст заголовка в зависимости от текста кнопки
        switch(button.textContent.trim()) {
            case 'Высшее':
                header.textContent = 'Высшее профессиональное образование';
                break;
            case 'Дополнительное':
                header.textContent = 'Дополнительно Профессиональное образование 🚀';
                break;
            case 'Корпоративное':
                header.textContent = 'Корпоративное обучение';
                break;
            default:
                header.textContent = '';
        }
    });
});