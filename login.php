<?php
session_start();
$error = '';

// Если пользователь уже авторизован, перенаправляем в админку
if (isset($_SESSION['is_admin']) && $_SESSION['is_admin'] === true) {
    header("Location: admin.php");
    exit;
}
?>
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>Вход в админ-панель</title>
    <style>
        body {
            font-family: 'MyFont', sans-serif;
            background-color: #f0f4fa;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
        }
        .login-container {
            background: white;
            padding: 40px;
            border-radius: 12px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
            text-align: center;
            width: 300px;
        }
        input[type="password"] {
            width: 100%;
            padding: 10px;
            margin: 10px 0;
            border: 2px solid #cbd5e1;
            border-radius: 8px;
            box-sizing: border-box;
        }
        button {
            width: 100%;
            padding: 10px;
            background-color: #007bff;
            color: white;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            font-weight: bold;
        }
        button:hover { background-color: #0056b3; }
        .error { color: red; font-size: 14px; margin-bottom: 10px; }
        .back-link { display: block; margin-top: 15px; color: #007bff; text-decoration: none; }
    </style>
</head>
<body>
<div class="login-container">
    <h2>Вход в админ-блок</h2>
    <?php if ($error): ?>
        <div class="error"><?php echo $error; ?></div>
    <?php endif; ?>

    <form action="check_auth.php" method="POST">
        <input type="password" name="password" placeholder="Введите пароль" required>
        <button type="submit">Войти</button>
    </form>
    <a href="index1.html" class="back-link">Вернуться на сайт</a>
</div>
</body>
</html>