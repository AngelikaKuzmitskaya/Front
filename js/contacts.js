$(function() {
    $('.contact-button').on('click', function() {
        // Если форма уже есть, не создаём заново
        if ($('#contact-modal').length) return;

        // Создаём разметку модального окна с формой
        const modalHtml = `
      <div id="contact-modal" style="
        position: fixed;
        top: 0; left: 0; right: 0; bottom: 0;
        background: rgba(0,0,0,0.4);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        opacity: 0;
        transition: opacity 0.5s;
      ">
        <div style="
          background: white;
          border-radius: 12px;
          width: 90%;
          max-width: 400px;
          padding: 20px 24px;
          box-sizing: border-box;
          position: relative;
          font-family: Arial, sans-serif;
          color: #000;
          transform: translateY(-30px);
          transition: transform 0.5s, opacity 0.5s;
          opacity: 0;
        ">
          <h3 style="margin-top:0; margin-bottom: 16px; font-weight: 600; font-size: 18px;">Контакты</h3>
          <button id="close-contact" style="
            position: absolute;
            top: 16px;
            right: 16px;
            border: none;
            background: transparent;
            font-size: 18px;
            cursor: pointer;
          " aria-label="Закрыть форму">&times;</button>

          <div style="margin-bottom: 12px;">
            <label style="display:block; font-weight: 500; font-size: 14px; margin-bottom: 4px;">Основной телефон</label>
            <input type="text" readonly value="7 (495) 255-67-67" style="
              width: 100%;
              font-size: 1em;
              color: #007aff;
              background: #f9fbff;
              cursor: default;
              padding: 10px 12px;
              margin-bottom: 20px;
              border: 1px solid #d1d9e6;
              border-radius: 6px;
              box-sizing: border-box;
            ">
          </div>

          <div style="margin-bottom: 20px;">
            <label style="display:block; font-weight: 500; font-size: 14px; margin-bottom: 4px;">Дополнительный</label>
            <input type="text" readonly value="7 (495) 255-67-67" style="
              width: 100%;
              font-size: 1em;
              color: #007aff;
              background: #f9fbff;
              cursor: default;
              padding: 10px 12px;
              margin-bottom: 20px;
              border: 1px solid #d1d9e6;
              border-radius: 6px;
              box-sizing: border-box;
            ">
          </div>

          <div style="font-weight: 600; font-size: 14px; margin-bottom: 4px;">Вы можете оставить заявку на обратный звонок</div>
          <div style="font-size: 12px; color: #8e8e93; margin-bottom: 12px;">
            Отправьте заявку на консультацию,<br>и мы вам перезвоним в течение часа
          </div>

          <form id="callback-form">
            <input type="text" name="name" placeholder="Ваше Имя" required style="
              width: 100%;
              padding: 10px 12px;
              margin-bottom: 12px;
              border: 1px solid #d1d9e6;
              border-radius: 6px;
              font-size: 14px;
              box-sizing: border-box;
            ">
            <input type="tel" name="phone" placeholder="Ваш номер" required style="
              width: 100%;
              padding: 10px 12px;
              margin-bottom: 20px;
              border: 1px solid #d1d9e6;
              border-radius: 6px;
              font-size: 14px;
              box-sizing: border-box;
            ">
            <button type="submit" style="
              width: 100%;
              background-color: #007aff;
              color: white;
              border: none;
              padding: 12px 0;
              border-radius: 8px;
              font-weight: 600;
              font-size: 16px;
              cursor: pointer;
            ">Отправить заявку</button>
          </form>

          <div style="font-size: 10px; color: #8e8e93; margin-top: 12px; line-height: 1.2;">
            Нажимая на кнопку, вы соглашаетесь с <a href="#" style="color: #007aff; text-decoration: none;">политикой конфиденциальности</a>
          </div>
        </div>
      </div>
    `;

        $('body').append(modalHtml);

        // Появление модального окна с анимацией
        const $modal = $('#contact-modal');
        const $modalContent = $modal.children().first();
        $modal.css('opacity', 1);
        $modalContent.css({ opacity: 1, transform: 'translateY(0)' });

        // Закрытие модального окна
        $('#close-contact').on('click', function() {
            $modal.remove();
        });

        // Закрытие по клику вне формы
        $modal.on('click', function(e) {
            if (e.target.id === 'contact-modal') {
                $modal.remove();
            }
        });

        // Обработка отправки формы
        $('#callback-form').on('submit', function(e) {
            e.preventDefault();
            // Здесь можно добавить отправку данных на сервер
            alert('Заявка отправлена! Спасибо.');
            $modal.remove();
        });
    });
});