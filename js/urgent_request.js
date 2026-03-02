$(function() {
    $('.cs-btn-enroll').on('click', function() {
        // Если модал уже есть — не создаём повторно
        if ($('#callback-modal').length) return;

        // Создаем модальное окно с формой
        const modalHtml = `
      <div id="callback-modal" style="
        position: fixed;
        top: 0; left: 0; right: 0; bottom: 0;
        background: rgba(0,0,0,0.3);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
        opacity: 0;
        transition: opacity 0.3s ease;
      ">
        <div class="modal-content" style="
          background: #fff;
          border-radius: 12px;
          width: 90%;
          max-width: 400px;
          padding: 24px 28px 28px;
          box-sizing: border-box;
          position: relative;
          font-family: Arial, sans-serif;
          color: #000;
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
          transform: translateY(-40px);
          transition: transform 0.3s ease, opacity 0.3s ease;
          opacity: 0;
        ">
          <button class="modal-close" aria-label="Закрыть" style="
            position: absolute;
            top: 16px;
            right: 16px;
            border: none;
            background: transparent;
            font-size: 20px;
            cursor: pointer;
            color: #999;
          ">&times;</button>

          <h2 style="margin: 0 0 12px; font-weight: 600; font-size: 20px; line-height: 1.2;">
            Вы можете оставить заявку<br>на обратный звонок
          </h2>
          <p style="margin: 0 0 24px; color: #6b7280; font-size: 14px; line-height: 1.4;">
            Отправьте заявку на консультацию,<br>и мы вам перезвоним в течение часа
          </p>

          <form id="callback-form" novalidate>
            <div class="input-group" style="position: relative; margin-bottom: 20px;">
              <input type="text" name="name" placeholder="Ваше Имя" required style="
              width: 100%;
              padding: 10px 12px;
              margin-bottom: 12px;
              border: 1px solid #d1d9e6;
              border-radius: 6px;
              font-size: 14px;
              box-sizing: border-box;
            ">
            </div>

            <div class="input-group" style="position: relative; margin-bottom: 24px;">
             <input type="tel" name="phone" placeholder="Ваш номер" required style="
              width: 100%;
              padding: 10px 12px;
              margin-bottom: 20px;
              border: 1px solid #d1d9e6;
              border-radius: 6px;
              font-size: 14px;
              box-sizing: border-box;
            ">
            </div>

            <button type="submit" style="
              width: 100%;
              background-color: #2563eb;
              color: white;
              border: none;
              padding: 14px 0;
              font-size: 16px;
              font-weight: 600;
              border-radius: 8px;
              cursor: pointer;
              transition: background-color 0.3s ease;
            ">Отправить заявку</button>
          </form>

          <p style="font-size: 10px; color: #6b7280; margin-top: 12px; line-height: 1.3;">
            Нажимая на кнопку, вы соглашаетесь с <a href="#" style="color: #2563eb; text-decoration: none;">политикой конфиденциальности</a>
          </p>
        </div>
      </div>
    `;

        $('body').append(modalHtml);

        const $modal = $('#callback-modal');
        const $content = $modal.find('.modal-content');

        // Анимация появления
        setTimeout(() => {
            $modal.css('opacity', '1');
            $content.css({opacity: '1', transform: 'translateY(0)'});
        }, 10);

        // Функция для обновления положения label
        function updateLabel($input) {
            if ($input.val().trim() !== '') {
                $input.siblings('label').css({
                    top: '4px',
                    fontSize: '12px',
                    color: '#2563eb',
                    transform: 'none'
                });
            } else {
                $input.siblings('label').css({
                    top: '50%',
                    fontSize: '14px',
                    color: '#9ca3af',
                    transform: 'translateY(-50%)'
                });
            }
        }

        // Инициализация label для всех полей
        $modal.find('input').each(function() {
            updateLabel($(this));
        });

        // Обработчики для плавного label
        $modal.on('focus', 'input', function() {
            $(this).siblings('label').css({
                top: '4px',
                fontSize: '12px',
                color: '#2563eb',
                transform: 'none'
            });
        });

        $modal.on('blur', 'input', function() {
            updateLabel($(this));
        });

        $modal.on('input', 'input', function() {
            updateLabel($(this));
        });

        // Закрытие модального окна по кнопке
        $modal.find('.modal-close').on('click', function() {
            $modal.remove();
        });

        // Закрытие по клику вне контента
        $modal.on('click', function(e) {
            if (e.target.id === 'callback-modal') {
                $modal.remove();
            }
        });

        // Обработка отправки формы
        $modal.find('#callback-form').on('submit', function(e) {
            e.preventDefault();

            const name = $(this).find('input[name="name"]').val().trim();
            const phone = $(this).find('input[name="phone"]').val().trim();

            if (!name) {
                alert('Пожалуйста, введите ваше имя');
                return;
            }
            if (!phone) {
                alert('Пожалуйста, введите ваш номер телефона');
                return;
            }

            // Здесь можно добавить ajax-запрос на сервер

            alert('Заявка отправлена! Мы свяжемся с вами в ближайшее время.');

            $modal.remove();
        });
    });
});