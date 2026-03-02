<?php
session_start();

// === НАСТРОЙКИ ===
// Придумайте свой сложный пароль
$correct_password = "admin123";
// =================

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input_password = $_POST['password'];

    if ($input_password === $correct_password) {
        // Пароль верный: создаем сессию
        $_SESSION['is_admin'] = true;
        $_SESSION['login_time'] = time();

        header("Location: admin.php");
        exit;
    } else {
        // Пароль неверный
        header("Location: login.php?error=1");
        exit;
    }
} else {
    // Если попали сюда не через POST
    header("Location: login.php");
    exit;
}