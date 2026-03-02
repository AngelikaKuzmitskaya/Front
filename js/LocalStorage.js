document.addEventListener("DOMContentLoaded", () => {
    const favoriteButtons = document.querySelectorAll(".favorite-btn");

    // Загружаем избранные ID из localStorage
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    // Обновляем состояние кнопок при загрузке
    favoriteButtons.forEach(button => {
        const id = button.getAttribute("data-id");
        const icon = button.querySelector("i");

        if (favorites.includes(id)) {
            icon.classList.remove("far");
            icon.classList.add("fas");
        }

        // Добавляем обработчик клика
        button.addEventListener("click", () => {
            const isFavorite = favorites.includes(id);

            if (isFavorite) {
                // Удаляем из избранного
                favorites = favorites.filter(favId => favId !== id);
                icon.classList.remove("fas");
                icon.classList.add("far");
            } else {
                // Добавляем в избранное
                favorites.push(id);
                icon.classList.remove("far");
                icon.classList.add("fas");
            }

            // Сохраняем обновленный список в localStorage
            localStorage.setItem("favorites", JSON.stringify(favorites));
        });
    });
});
