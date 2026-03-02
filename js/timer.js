(function() {
    const notificationBar = document.querySelector('.cs-notification-bar');
    const closeBtn = document.querySelector('.cs-btn-close');

    // Функция запуска таймера с заданной длительностью в секундах
    function startCountdown(duration) {
        let timer = duration, days, hours, minutes, seconds;

        function updateTimer() {
            if (timer < 0) {
                // Скрыть уведомление, когда таймер закончится
                if (notificationBar) notificationBar.style.display = 'none';
                clearInterval(interval);
                return;
            }

            days = Math.floor(timer / (3600 * 24));
            hours = Math.floor((timer % (3600 * 24)) / 3600);
            minutes = Math.floor((timer % 3600) / 60);
            seconds = Math.floor(timer % 60);

            document.getElementById("days").innerHTML = String(days).padStart(2, '0').split('').map(d => `<div class="cs-timer-box">${d}</div>`).join('');
            document.getElementById("hours").innerHTML = String(hours).padStart(2, '0').split('').map(d => `<div class="cs-timer-box">${d}</div>`).join('');
            document.getElementById("minutes").innerHTML = String(minutes).padStart(2, '0').split('').map(d => `<div class="cs-timer-box">${d}</div>`).join('');
            document.getElementById("seconds").innerHTML = String(seconds).padStart(2, '0').split('').map(d => `<div class="cs-timer-box">${d}</div>`).join('');

            timer--;
        }

        updateTimer();
        let interval = setInterval(updateTimer, 1000);

        // Обработчик кнопки закрытия уведомления
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                if (notificationBar) notificationBar.style.display = 'none';
                clearInterval(interval);
            });
        }
    }

    // Запускаем таймер с примерным временем (например, 99 часов = 356400 секунд)
    // Замените на нужное время в секундах
    startCountdown(8553600); // 99 дней 0 часов (пример)
})();