// Стили для точного соответствия
const style = document.createElement('style');
style.textContent = `
  .modal-overlay {
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    background: rgba(0,0,0,0.1);
    display: none;
    justify-content: center;
    align-items: flex-start;
    padding-top: 40px;
    z-index: 1000;
  }
  .modal {
    background: white;
    border-radius: 12px;
    width: 900px;
    max-height: 500px;
    display: flex;
    box-shadow: 0 8px 24px rgba(0,0,0,0.12);
    font-family: "Inter", Arial, sans-serif;
    position: relative;
  }
  /* Левая колонка */
  .modal-left {
    width: 250px;
    border-right: 1px solid #e6e8eb;
    padding: 24px 20px 20px 20px;
  }
  .modal-left h2 {
    font-weight: 700;
    font-size: 20px;
    margin: 0 0 24px 0;
    color: #1f2937;
  }
  .category-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 10px 12px;
    border-radius: 12px;
    cursor: pointer;
    user-select: none;
    margin-bottom: 12px;
    font-weight: 600;
    font-size: 14px;
    color: #475569;
    background: transparent;
    border: none;
    transition: background-color 0.2s, color 0.2s;
  }
  .category-item svg {
    width: 24px;
    height: 24px;
    flex-shrink: 0;
    fill: #94a3b8;
    transition: fill 0.2s;
  }
  .category-item .count {
    margin-left: auto;
    font-weight: 400;
    font-size: 12px;
    color: #94a3b8;
  }
  .category-item.active {
    background: #f0f9ff;
    color: #0ea5e9;
  }
  .category-item.active svg {
    fill: #0ea5e9;
  }
  .category-item:hover:not(.active) {
    background: #f9fafb;
  }
  .btn-view-all {
    margin-top: 32px;
    width: 100%;
    padding: 10px 0;
    background: #f0f9ff;
    border-radius: 12px;
    border: none;
    font-weight: 600;
    font-size: 14px;
    color: #0ea5e9;
    cursor: pointer;
    user-select: none;
    transition: background-color 0.2s;
  }
  .btn-view-all:hover {
    background: #d0f0ff;
  }

  /* Средняя колонка - подкатегории */
  .modal-center {
    width: 250px;
    padding: 24px 20px 20px 20px;
    border-right: 1px solid #e6e8eb;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .subcategory {
    padding: 8px 14px;
    background: #f9fafb;
    border-radius: 12px;
    font-size: 14px;
    color: #475569;
    cursor: pointer;
    user-select: none;
    border: none;
    text-align: left;
    font-weight: 500;
    transition: background-color 0.2s, color 0.2s;
  }
  .subcategory.active {
    background: #0ea5e9;
    color: white;
    font-weight: 600;
  }
  .subcategory:hover:not(.active) {
    background: #e2e8f0;
  }

  /* Правая колонка - курсы */
  .modal-right {
    flex-grow: 1;
    padding: 24px 20px 20px 20px;
    font-size: 14px;
    color: #475569;
    overflow-y: auto;
  }
  .modal-right h3 {
    margin: 0 0 4px 0;
    font-weight: 700;
    font-size: 16px;
    color: #0f172a;
  }
  .course-count {
    margin: 0 0 16px 0;
    font-size: 12px;
    color: #94a3b8;
  }
  .modal-right ul {
    list-style: none;
    padding-left: 0;
    margin: 0;
  }
  .modal-right ul li {
    margin-bottom: 10px;
  }
  .modal-right ul li a {
    color: #0ea5e9;
    text-decoration: none;
    cursor: pointer;
    transition: color 0.2s;
  }
  .modal-right ul li a:hover {
    text-decoration: underline;
  }

  /* Кнопка закрытия */
  .modal-close {
    position: absolute;
    top: 16px;
    right: 16px;
    background: transparent;
    border: none;
    font-size: 20px;
    color: #94a3b8;
    cursor: pointer;
    transition: color 0.2s;
    user-select: none;
  }
  .modal-close:hover {
    color: #0ea5e9;
  }
`;
document.head.appendChild(style);

// Данные каталога с подкатегориями и курсами (добавлены ссылки для курсов)
const data = {
    "Высшее": {
        subcategories: ["Математика", "История", "Техника", "Наука"],
        courses: {
            "Математика": [
                {name: "Алгебра", url: "#"},
                {name: "Геометрия", url: "#"},
                {name: "Математический анализ", url: "#"}
            ],
            "История": [
                {name: "Всемирная история", url: "#"},
                {name: "История России", url: "#"}
            ],
            "Техника": [
                {name: "Инженерия", url: "#"},
                {name: "Электротехника", url: "#"}
            ],
            "Наука": [
                {name: "Физика", url: "#"},
                {name: "Химия", url: "#"}
            ]
        }
    },
    "Дополнительное": {
        subcategories: ["Бизнес", "Психология", "Творчество и креатив", "Здоровье и красота", "Подготовка к ЕГЭ", "Китай", "Политика", "Информационная безопасность", "Языки и перевод"],
        courses: {
            "Бизнес": [
                {name: "Управление проектами", url: "#"},
                {name: "Маркетинг", url: "#"}
            ],
            "Психология": [
                {name: "Психология общения", url: "#"},
                {name: "Когнитивная психология", url: "#"}
            ],
            "Творчество и креатив": [
                {name: "Рисование", url: "#"},
                {name: "Дизайн", url: "#"}
            ],
            "Здоровье и красота": [
                {name: "Массаж", url: "#"},
                {name: "Диетология", url: "#"},
                {name: "Медитация", url: "#"}
            ],
            "Подготовка к ЕГЭ": [
                {name: "Математика ЕГЭ", url: "#"},
                {name: "Русский язык ЕГЭ", url: "#"}
            ],
            "Китай": [
                {name: "Международные отношения", url: "#"},
                {name: "Навыки для руководителя", url: "#"},
                {name: "Продажи", url: "#"},
                {name: "Онлайн-проекты", url: "#"}
            ],
            "Политика": [],
            "Информационная безопасность": [],
            "Языки и перевод": []
        }
    },
    "Корпоративное": {
        subcategories: ["Soft Skills", "Инженерия и технологии", "Социальная работа"],
        courses: {
            "Soft Skills": [
                {name: "Коммуникации", url: "#"},
                {name: "Лидерство", url: "#"}
            ],
            "Инженерия и технологии": [
                {name: "Автоматизация", url: "#"},
                {name: "Проектирование", url: "#"}
            ],
            "Социальная работа": [
                {name: "Социальное консультирование", url: "#"}
            ]
        }
    }
};

// Функция создания иконок (SVG) для категорий — упрощены, с цветом по активному состоянию
function createIcon(type, active = false) {
    const ns = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(ns, 'svg');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('width', '24');
    svg.setAttribute('height', '24');
    svg.setAttribute('fill', active ? '#0ea5e9' : '#94a3b8');
    if(type === 'circle') {
        const circle = document.createElementNS(ns, 'circle');
        circle.setAttribute('cx', '12');
        circle.setAttribute('cy', '12');
        circle.setAttribute('r', '10');
        svg.appendChild(circle);
    } else if(type === 'rect') {
        const rect = document.createElementNS(ns, 'rect');
        rect.setAttribute('x', '6');
        rect.setAttribute('y', '6');
        rect.setAttribute('width', '12');
        rect.setAttribute('height', '12');
        svg.appendChild(rect);
    } else if(type === 'triangle') {
        const polygon = document.createElementNS(ns, 'polygon');
        polygon.setAttribute('points', '12,2 22,22 2,22');
        svg.appendChild(polygon);
    }
    return svg;
}

// Создаем модальное окно
const modalOverlay = document.createElement('div');
modalOverlay.className = 'modal-overlay';
modalOverlay.setAttribute('role', 'dialog');
modalOverlay.setAttribute('aria-modal', 'true');
modalOverlay.setAttribute('aria-labelledby', 'modal-title');

const modal = document.createElement('div');
modal.className = 'modal';

// Кнопка закрытия
const modalClose = document.createElement('button');
modalClose.className = 'modal-close';
modalClose.setAttribute('aria-label', 'Закрыть каталог');
modalClose.textContent = '×';
modal.appendChild(modalClose);

// Левая колонка
const modalLeft = document.createElement('div');
modalLeft.className = 'modal-left';

const leftTitle = document.createElement('h2');
leftTitle.id = 'modal-title';
leftTitle.textContent = 'Образование';
modalLeft.appendChild(leftTitle);

const categories = [
    {name: 'Высшее', icon: 'circle', count: 124},
    {name: 'Дополнительное', icon: 'rect', count: 124},
    {name: 'Корпоративное', icon: 'triangle', count: 124},
];

// Для хранения элементов категорий (чтобы обновлять активность)
const categoryElems = [];

categories.forEach(({name, icon, count}, i) => {
    const btn = document.createElement('button');
    btn.className = 'category-item';
    btn.dataset.category = name;
    btn.setAttribute('type', 'button');
    if(i === 0) btn.classList.add('active');

    // Иконка
    const svgIcon = createIcon(icon, i === 0);
    btn.appendChild(svgIcon);

    // Текст
    const text = document.createTextNode(name);
    btn.appendChild(text);

    // Количество
    const countSpan = document.createElement('span');
    countSpan.className = 'count';
    countSpan.textContent = count + ' курсов';
    btn.appendChild(countSpan);

    modalLeft.appendChild(btn);
    categoryElems.push(btn);
});

// Кнопка "Смотреть всё"
const btnViewAll = document.createElement('button');
btnViewAll.className = 'btn-view-all';
btnViewAll.textContent = 'Смотреть всё';
modalLeft.appendChild(btnViewAll);

modal.appendChild(modalLeft);

// Средняя колонка - подкатегории
const modalCenter = document.createElement('div');
modalCenter.className = 'modal-center';
modal.appendChild(modalCenter);

// Правая колонка - курсы
const modalRight = document.createElement('div');
modalRight.className = 'modal-right';
modal.appendChild(modalRight);

modalOverlay.appendChild(modal);
document.body.appendChild(modalOverlay);

// Рендер подкатегорий
function renderSubcategories(category) {
    const subcats = data[category]?.subcategories || [];
    modalCenter.innerHTML = '';
    modalRight.innerHTML = '';

    subcats.forEach((subcat, i) => {
        const subcatBtn = document.createElement('button');
        subcatBtn.className = 'subcategory';
        subcatBtn.textContent = subcat;
        subcatBtn.type = 'button';
        if(i === 0) subcatBtn.classList.add('active');
        modalCenter.appendChild(subcatBtn);

        subcatBtn.addEventListener('click', () => {
            modalCenter.querySelectorAll('.subcategory').forEach(el => el.classList.remove('active'));
            subcatBtn.classList.add('active');
            renderCourses(category, subcat);
        });
    });

    if(subcats.length > 0) {
        renderCourses(category, subcats[0]);
    } else {
        modalRight.innerHTML = '<em>Подкатегории отсутствуют</em>';
    }
}

// Рендер курсов
function renderCourses(category, subcategory) {
    const courses = data[category]?.courses[subcategory] || [];
    modalRight.innerHTML = '';

    const title = document.createElement('h3');
    title.textContent = subcategory;
    modalRight.appendChild(title);

    const count = document.createElement('div');
    count.className = 'course-count';
    count.textContent = `${courses.length} курс${courses.length === 1 ? '' : 'ов'}`;
    modalRight.appendChild(count);

    if(courses.length === 0) {
        const empty = document.createElement('div');
        empty.textContent = 'Курсы отсутствуют';
        empty.style.color = '#94a3b8';
        modalRight.appendChild(empty);
        return;
    }

    const ul = document.createElement('ul');
    courses.forEach(({name, url}) => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.textContent = name;
        a.href = url;
        li.appendChild(a);
        ul.appendChild(li);
    });
    modalRight.appendChild(ul);
}

// Обновление активной категории и рендер
function setActiveCategory(categoryName) {
    categoryElems.forEach((btn) => {
        const isActive = btn.dataset.category === categoryName;
        btn.classList.toggle('active', isActive);

        // Обновляем иконку цвет
        const iconType = categories.find(c => c.name === btn.dataset.category).icon;
        const newIcon = createIcon(iconType, isActive);
        btn.replaceChild(newIcon, btn.querySelector('svg'));
    });
    renderSubcategories(categoryName);
}

// Получаем кнопку открытия каталога
const catalogBtn = document.querySelector('.catalog-button');

catalogBtn.addEventListener('click', () => {
    modalOverlay.style.display = 'flex';
    const activeCat = categoryElems.find(btn => btn.classList.contains('active'))?.dataset.category || 'Высшее';
    setActiveCategory(activeCat);
});

// Закрытие по кресту
modalClose.addEventListener('click', () => {
    modalOverlay.style.display = 'none';
});

// Закрытие по клику на фон
modalOverlay.addEventListener('click', e => {
    if (e.target === modalOverlay) {
        modalOverlay.style.display = 'none';
    }
});

// Переключение категорий
categoryElems.forEach(btn => {
    btn.addEventListener('click', () => {
        setActiveCategory(btn.dataset.category);
    });
});

// Кнопка "Смотреть всё" — здесь просто закрываем окно (можно заменить логику)
btnViewAll.addEventListener('click', () => {
    alert('Показать все курсы (логика не реализована)');
});
