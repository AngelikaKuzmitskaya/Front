$(function() {
    $('.reviews-section').each(function() {
        let $th = $(this);
        let $container = $th.find('.reviews-scroll-container');
        let $cards = $container.find('.review-card');
        let num = $cards.length;
        $th.attr('data-pos', 1);

        const cardWidth = 300; // ширина карточки в px (укажите нужную)

        // Создаем контейнер для точек навигации
        let $dots = $('<div class="reviews-dots"></div>');
        $th.append($dots);

        // Создаем индикатор и точки
        $dots.append('<span class="slider-indicator"></span>');
        for(let i = 1; i <= num; i++) {
            $dots.append('<span style="width:' + (100 / num) + '%" class="slider-dot" data-pos="'+ i +'"></span>');
        }

        // Задаем ширину контейнера и карточек
        $container.css({
            'width': (cardWidth * num) + 'px',
            'display': 'flex',
            'transition': 'transform 0.5s ease',
            'overflow': 'hidden' // прячем лишнее
        });
        $cards.css({
            'width': cardWidth + 'px',
            'flex-shrink': 0
        });

        function goToSlide(newPos) {
            let currentPos = +$th.attr('data-pos');
            let newDirection = (newPos > currentPos ? 'right' : 'left');
            let currentDirection = (newPos < currentPos ? 'right' : 'left');

            $th.find('.slider-indicator').removeClass('slider-indicator-' + currentDirection);
            $th.find('.slider-indicator').addClass('slider-indicator-' + newDirection);

            $th.attr('data-pos', newPos);
            $container.css('transform', 'translateX(-' + cardWidth * (newPos - 1) + 'px)');
            $th.find('.slider-indicator').css({
                'left': (100 / num * (newPos - 1)) + '%',
                'right': (100 - (100 / num) - 100 / num * (newPos - 1)) + '%'
            });
        }

        $th.find('.slider-dot').on('click', function() {
            let newPos = +$(this).attr('data-pos');
            goToSlide(newPos);
        });

        $th.find('.slider-indicator').css({
            'left': 0,
            'right': (100 - (100 / num)) + '%'
        });
    });
});
