<?php
/**
 * Отправка писем через Mailtrap (С РУССКОЙ КОДИРОВКОЙ)
 */

// Подключаем библиотеку
require 'E:\Online-university-master\PHPMailer\src\Exception.php';
require 'E:\Online-university-master\PHPMailer\src\PHPMailer.php';
require 'E:\Online-university-master\PHPMailer\src\SMTP.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

// Обработка формы
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $name = isset($_POST['name']) ? $_POST['name'] : '';
    $phone = isset($_POST['phone']) ? $_POST['phone'] : '';
    $email = isset($_POST['email']) ? $_POST['email'] : '';

    $mail = new PHPMailer(true);

    try {
        $mail->SMTPDebug  = SMTP::DEBUG_OFF;
        $mail->isSMTP();

        // === НАСТРОЙКИ MAILTRAP ===
        $mail->Host       = 'live.smtp.mailtrap.io';
        $mail->SMTPAuth   = true;
        $mail->Port       = 587;
        $mail->Username   = 'api';
        $mail->Password   = '4b9b219bf2807ac0f8fb644a9ce2865d';
        // ===========================

        // ▼▼ ДОБАВЛЯЕМ КОДИРОВКУ ▼▼
        $mail->CharSet = 'UTF-8';
        $mail->Encoding = 'base64';
        // ===========================

        $mail->setFrom('hello@demomailtrap.co', 'Онлайн-университет');
        $mail->addAddress('a.a.kuzmitskaya@gmail.com', 'Администратор');

        $mail->isHTML(true);
        $mail->Subject = "Заявка от $name";
        $mail->Body    = "
            <html>
            <head>
                <meta charset='UTF-8'>
                <style>
                    body { font-family: Arial, sans-serif; }
                    h2 { color: #007bff; }
                </style>
            </head>
            <body>
                <h2>📨 Новая заявка!</h2>
                <p><b>Имя:</b> $name</p>
                <p><b>Телефон:</b> $phone</p>
                <p><b>Email:</b> $email</p>
                <p><b>Дата:</b> " . date('d.m.Y H:i') . "</p>
            </body>
            </html>
        ";

        $mail->send();

        echo "<h2 style='color: green;'>✅ Успешно отправлено!</h2>";
        echo "<p>Проверьте почту a.a.kuzmitskaya@gmail.com</p>";

    } catch (Exception $e) {
        echo "<h2 style='color: red;'>❌ Ошибка!</h2>";
        echo "<p>Error: {$mail->ErrorInfo}</p>";
    }
    exit;
}
?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Тест Mailtrap</title>
    <style>
        body { font-family: Arial; padding: 40px; max-width: 500px; margin: 0 auto; }
        input { width: 100%; padding: 10px; margin: 5px 0; box-sizing: border-box; border: 1px solid #ccc; border-radius: 5px; }
        button { background: #00d2be; color: white; padding: 15px; border: none; width: 100%; cursor: pointer; border-radius: 5px; font-size: 16px; }
        button:hover { background: #00b5a3; }
    </style>
</head>
<body>
<h2>📧 Тест отправки</h2>
<form method="POST">
    <label>Имя:</label>
    <input type="text" name="name" required>
    <label>Телефон:</label>
    <input type="text" name="phone" required>
    <label>Email:</label>
    <input type="email" name="email" required>
    <button type="submit">Отправить</button>
</form>
</body>
</html>