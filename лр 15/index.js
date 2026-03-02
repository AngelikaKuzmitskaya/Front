// Базовый класс
class Entity {
    constructor(element) {
        this.element = element;
    }
    getRect() {
        return this.element.getBoundingClientRect();
    }
    remove() {
        if (this.element && this.element.parentNode) {
            this.element.parentNode.removeChild(this.element);
        }
    }
}

// Игрок
class Player extends Entity {
    constructor(element) {
        super(element);
        this.x = 175;
        this.speed = 5;
        this.updatePosition();
    }
    moveLeft() {
        if (this.x > 0) {
            this.x -= this.speed;
            this.updatePosition();
            this.animate();
        }
    }
    moveRight() {
        if (this.x < 350) {
            this.x += this.speed;
            this.updatePosition();
            this.animate();
        }
    }
    updatePosition() {
        this.element.style.left = this.x + 'px';
    }
    animate() {
        this.element.classList.add('moving');
        setTimeout(() => this.element.classList.remove('moving'), 300);
    }
}

// Предмет
class Item extends Entity {
    constructor(container) {
        const el = document.createElement('div');
        super(el);
        this.container = container;
        this.element.className = 'item';
        this.element.style.left = Math.random() * 370 + 'px';
        this.element.style.top = '0px';
        this.isMeat = Math.random() < 0.5;
        if (this.isMeat) {
            this.element.classList.add('meat');
            this.element.textContent = '🥩';
        } else {
            this.element.classList.add('vegetable');
            this.element.textContent = '🥕';
        }
        this.container.appendChild(this.element);
    }
    fall() {
        let top = parseFloat(this.element.style.top);
        this.element.style.top = top + 2 + 'px';
    }
}

// Бонусный предмет
class BonusItem extends Item {
    constructor(container) {
        super(container);
        this.isBonus = true;
        this.element.className = 'item bonus';
        this.element.textContent = '⭐';
    }
}

// Игра
class Game {
    constructor(container, playerElement, scoreElement, gameOverElement) {
        this.container = container;
        this.player = new Player(playerElement);
        this.scoreElement = scoreElement;
        this.gameOverElement = gameOverElement;
        this.items = [];
        this.score = 0;
        this.running = false;
        this.loop = null;
        this.initControls();
    }

    initControls() {
        document.addEventListener('keydown', (e) => {
            if (!this.running && e.key.toLowerCase() !== 'r') return;
            if (e.key === 'ArrowLeft') this.player.moveLeft();
            else if (e.key === 'ArrowRight') this.player.moveRight();
            else if (e.key.toLowerCase() === 'r') this.reset();
        });
    }

    start() {
        this.running = true;
        this.loop = setInterval(() => this.tick(), 16);
    }

    tick() {
        this.moveItems();
        if (Math.random() < 0.03 && this.items.length < 20) {
            // иногда создаём бонус
            if (Math.random() < 0.1) this.items.push(new BonusItem(this.container));
            else this.items.push(new Item(this.container));
        }
    }

    moveItems() {
        for (let i = this.items.length - 1; i >= 0; i--) {
            const item = this.items[i];
            item.fall();

            if (this.checkCollision(item)) {
                if (item.isMeat) {
                    this.score += 10;
                } else if (item.isBonus) {
                    this.score += 50;
                } else {
                    this.gameOver();
                }
                this.scoreElement.textContent = 'Очки: ' + this.score;
                item.remove();
                this.items.splice(i, 1);
                continue;
            }

            if (parseFloat(item.element.style.top) > 600) {
                item.remove();
                this.items.splice(i, 1);
            }
        }
    }

    checkCollision(item) {
        const playerRect = this.player.getRect();
        const itemRect = item.getRect();
        return (
            playerRect.left < itemRect.right &&
            playerRect.right > itemRect.left &&
            playerRect.top < itemRect.bottom &&
            playerRect.bottom > itemRect.top
        );
    }

    gameOver() {
        this.running = false;
        clearInterval(this.loop);
        this.gameOverElement.style.display = 'block';
    }

    reset() {
        this.items.forEach(item => item.remove());
        this.items = [];
        this.score = 0;
        this.scoreElement.textContent = 'Очки: 0';
        this.gameOverElement.style.display = 'none';
        this.player.x = 175;
        this.player.updatePosition();
        this.start();
    }
}

// --- Запуск игры ---
const gameContainer = document.getElementById('game-container');
const player = document.getElementById('player');
const scoreElement = document.getElementById('score');
const gameOverElement = document.getElementById('game-over');

// создаём объект игры и запускаем
const game = new Game(gameContainer, player, scoreElement, gameOverElement);
game.reset();
