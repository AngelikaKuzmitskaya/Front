// Получаем все изображения внутри div с классом social-icons
const icons = document.querySelectorAll('.social-icons img');

// Массив цветов свечения для каждой иконки
const glowColors = [
    'rgba(0, 150, 255, 0.7)',   // Синий для первой иконки
    'rgba(0, 255, 150, 0.7)',   // Зелёный для второй
    'rgba(255,0,234,0.7)'    // Оранжевый для третьей
];

// Применяем стили и навешиваем обработчики событий
icons.forEach((icon, index) => {
    // Скругление углов
    icon.style.borderRadius = '12px';

    // Плавный переход для box-shadow
    icon.style.transition = 'box-shadow 0.3s ease';

    // Цвет свечения для текущей иконки
    const glowColor = glowColors[index % glowColors.length];

    // Обработчики наведения
    icon.addEventListener('mouseenter', () => {
        icon.style.boxShadow = `0 0 10px 5px ${glowColor}`;
    });

    icon.addEventListener('mouseleave', () => {
        icon.style.boxShadow = 'none';
    });
});
