<?php
session_start();

// === ПРОВЕРКА ЗАЩИТЫ ===
if (!isset($_SESSION['is_admin']) || $_SESSION['is_admin'] !== true) {
    header("Location: login.php");
    exit;
}
// =======================
?>
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>Панель администратора</title>
    <style>
        body { font-family: 'MyFont', sans-serif; background: #f0f4fa; margin: 0; padding: 20px; }
        .admin-container { max-width: 800px; margin: 0 auto; background: white; padding: 30px; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
        h1 { color: #333; }
        .stats { display: flex; gap: 20px; margin-top: 20px; }
        .stat-box { background: #007bff; color: white; padding: 20px; border-radius: 8px; flex: 1; text-align: center; }
        .logout-btn { display: inline-block; margin-top: 20px; padding: 10px 20px; background: #ff4d4d; color: white; text-decoration: none; border-radius: 8px; }
    </style>
</head>
<body>
<div class="admin-container">
    <h1>Добро пожаловать в Админ-блок!</h1>
    <p>Здесь вы можете управлять контентом сайта.</p>

    <div class="stats">
        <div class="stat-box">
            <h3>Заявок</h3>
            <p>125</p>
        </div>
        <div class="stat-box">
            <h3>Пользователей</h3>
            <p>1,204</p>
        </div>
        <div class="stat-box">
            <h3>Курсов</h3>
            <p>35</p>
        </div>
    </div>

    <a href="logout.php" class="logout-btn">Выйти (Завершить сессию)</a>
</div>
</body>
</html>