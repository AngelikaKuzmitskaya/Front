document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("favorites-container");
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    // Все данные о курсах (можно также хранить в массиве или подгружать с сервера)
    const courses = [
        {
            id: "1",
            title: "Practitioner of Political Administration (PPA)",
            category: "Информационная безопасность",
            period: "21 ноября - 15 декабря",
            tags: ["36 ак.ч", "Очно/Дистанционно", "Профессиональная переподготовка"],
            image: "Image/Img-box.png"
        },
        {
            id: "2",
            title: "Practitioner of Business Administration (PBA)",
            category: "Информационная безопасность",
            period: "21 ноября - 15 декабря",
            tags: ["36 ак.ч", "Очно/Дистанционно", "Профессиональная переподготовка"],
            image: "Image/Img-box(1).png"
        },
        {
            id: "3",
            title: "Practitioner of Business Administration (PBA)",
            category: "Информационная безопасность",
            period: "21 ноября - 15 декабря",
            tags: ["36 ак.ч", "Очно/Дистанционно", "Профессиональная переподготовка"],
            image: "Image/Img-box(1).png"
        }
    ];

    // Фильтруем только избранные
    const favoriteCourses = courses.filter(course => favorites.includes(course.id));

    if (favoriteCourses.length === 0) {
        container.innerHTML = "<p>Нет избранных курсов.</p>";
        return;
    }

    favoriteCourses.forEach(course => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
            <div class="card-image-container">
                <img src="${course.image}" alt="${course.title}" />
                <button class="favorite-btn" data-id="${course.id}" aria-label="Удалить из избранного">
                    <i class="fas fa-star"></i>
                </button>
            </div>
            <div class="card-content" id="${course.id}">
                <h3 class="title">${course.title}</h3>
                <p class="label">Категория:</p>
                <p class="category">${course.category}</p>
                <p class="label">Период проведения:</p>
                <p class="period">${course.period}</p>
                <div class="tags">
                    ${course.tags.map(tag => `<span class="tag">${tag}</span>`).join("")}
                </div>
            </div>
        `;
        container.appendChild(card);
    });

    // Добавляем возможность удаления со страницы избранного
    const removeButtons = document.querySelectorAll(".favorite-btn");
    removeButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            const id = btn.getAttribute("data-id");
            let updatedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
            updatedFavorites = updatedFavorites.filter(favId => favId !== id);
            localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
            location.reload(); // Перезагружаем страницу после удаления
        });
    });
});
