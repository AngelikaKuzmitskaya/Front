document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.search-catalog-container');
    const form = container.querySelector('.search-form');
    const originalInput = form.querySelector('input[type="search"]');

    // Создаём модальное окно
    const modal = document.createElement('div');
    modal.className = 'search-modal';
    modal.style.cssText = `
        display: none;
        position: fixed;
        top: 0; left: 0; width: 100vw; height: 100vh;
        background: rgba(0,40,120,0.1);
        justify-content: center; align-items: flex-start;
        padding: 2em 1em; box-sizing: border-box; z-index: 2000;
        overflow-y: auto;
    `;

    const modalContent = document.createElement('div');
    modalContent.style.cssText = `
        background: white; border-radius: 12px; max-width: 600px; width: 100%;
        box-shadow: 0 10px 30px rgba(0,40,120,0.15);
        padding: 1em 1.5em 2em; box-sizing: border-box;
        display: flex; flex-direction: column;
    `;

    modal.appendChild(modalContent);

    // Заголовок с иконкой, инпутом и кнопкой закрытия
    const header = document.createElement('div');
    header.style.cssText = `
        display: flex; align-items: center; gap: 1em;
        border-bottom: 1px solid #ddd; padding-bottom: 0.5em; margin-bottom: 1em;
    `;

    const svgNS = "http://www.w3.org/2000/svg";
    const searchIcon = document.createElementNS(svgNS, 'svg');
    searchIcon.setAttribute('viewBox', '0 0 24 24');
    searchIcon.setAttribute('fill', 'none');
    searchIcon.setAttribute('stroke', 'currentColor');
    searchIcon.setAttribute('stroke-width', '2');
    searchIcon.setAttribute('stroke-linecap', 'round');
    searchIcon.setAttribute('stroke-linejoin', 'round');
    searchIcon.style.width = '24px';
    searchIcon.style.height = '24px';
    searchIcon.style.stroke = '#7a8ca3';
    searchIcon.setAttribute('aria-hidden', 'true');
    searchIcon.innerHTML = `<circle cx="11" cy="11" r="7"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line>`;

    const modalInput = document.createElement('input');
    modalInput.type = 'search';
    modalInput.placeholder = 'Найти...';
    modalInput.setAttribute('aria-label', 'Поиск');
    modalInput.autocomplete = 'off';
    modalInput.style.flex = '1';
    modalInput.style.fontSize = '1rem';
    modalInput.style.border = 'none';
    modalInput.style.outline = 'none';
    modalInput.style.padding = '0.5em 0';
    modalInput.style.color = '#333';

    const closeButton = document.createElement('button');
    closeButton.type = 'button';
    closeButton.setAttribute('aria-label', 'Закрыть поиск');
    closeButton.textContent = '×'; // заменили innerHTML на textContent
    closeButton.style.background = 'none';
    closeButton.style.border = 'none';
    closeButton.style.fontSize = '1.8rem';
    closeButton.style.lineHeight = '1';
    closeButton.style.color = '#999';
    closeButton.style.cursor = 'pointer';
    closeButton.style.padding = '0 0.2em';
    closeButton.style.transition = 'color 0.3s';
    closeButton.style.position = 'relative'; // добавлено
    closeButton.style.zIndex = '10';         // добавлено
    closeButton.addEventListener('mouseenter', () => closeButton.style.color = '#333');
    closeButton.addEventListener('mouseleave', () => closeButton.style.color = '#999');

    // Обработчик закрытия
    closeButton.addEventListener('click', () => {
        console.log('Кнопка закрытия нажата');
        closeModal();
    });

    header.appendChild(searchIcon);
    header.appendChild(modalInput);
    header.appendChild(closeButton);
    modalContent.appendChild(header);

    // Популярные запросы
    const popularSection = document.createElement('div');
    popularSection.style.marginTop = '0.5em';

    const popularTitle = document.createElement('h2');
    popularTitle.textContent = 'Популярные запросы';
    popularTitle.style.fontWeight = '600';
    popularTitle.style.fontSize = '1rem';
    popularTitle.style.color = '#555';
    popularTitle.style.margin = '0 0 0.8em 0';

    popularSection.appendChild(popularTitle);

    const popularTagsContainer = document.createElement('div');
    popularTagsContainer.style.display = 'flex';
    popularTagsContainer.style.flexWrap = 'wrap';
    popularTagsContainer.style.gap = '0.5em';

    const popularQueries = [
        'Документы',
        'Проходной балл',
        'Сроки подачи',
        'Перспективы выпускников',
        'Критерии отбора',
        'Стипендии',
        'Карьера',
        'Социальная поддержка студентов'
    ];

    popularQueries.forEach(q => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.textContent = q;
        btn.style.background = '#f1f5f9';
        btn.style.border = 'none';
        btn.style.borderRadius = '9999px';
        btn.style.padding = '0.5em 1em';
        btn.style.fontSize = '0.875rem';
        btn.style.color = '#475569';
        btn.style.cursor = 'pointer';
        btn.style.transition = 'background-color 0.2s';
        btn.addEventListener('mouseenter', () => btn.style.backgroundColor = '#d5e3ff');
        btn.addEventListener('mouseleave', () => btn.style.backgroundColor = '#f1f5f9');
        btn.addEventListener('focus', () => btn.style.backgroundColor = '#d5e3ff');
        btn.addEventListener('blur', () => btn.style.backgroundColor = '#f1f5f9');
        btn.addEventListener('click', () => {
            originalInput.value = q;
            modalInput.value = q;
            closeModal();
        });
        popularTagsContainer.appendChild(btn);
    });

    popularSection.appendChild(popularTagsContainer);
    modalContent.appendChild(popularSection);

    document.body.appendChild(modal);

    // Открытие и закрытие модального окна
    function openModal() {
        modal.style.display = 'flex';
        modalInput.value = originalInput.value;
        modalInput.focus();
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = '';
        originalInput.focus();
    }

    // События
    originalInput.addEventListener('focus', openModal);

    modal.addEventListener('click', e => {
        if (e.target === modal) closeModal();
    });

    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && modal.style.display === 'flex') closeModal();
    });

    modalInput.addEventListener('input', () => {
        originalInput.value = modalInput.value;
    });
});
