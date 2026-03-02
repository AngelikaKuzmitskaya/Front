<?php
echo "PHP работает!<br>";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    echo "POST запрос получен!<br>";
    echo "Имя: " . $_POST['name'] . "<br>";
    echo "Телефон: " . $_POST['phone'] . "<br>";

    // Тест отправки
    $to = "a.a.kuzmitskaya@gmail.com";
    $subject = "Тест";
    $message = "Тестовое сообщение от " . $_POST['name'];
    $headers = "From: anjelika07122006@gmail.com";

    if (mail($to, $subject, $message, $headers)) {
        echo "✅ Письмо отправлено!";
    } else {
        echo "❌ Ошибка отправки!";
    }
    exit;
}
?>
<!DOCTYPE html>
<html>
<head>
    <title>Тест</title>
</head>
<body>
<h2>Тест отправки формы</h2>
<form method="POST">
    <input type="text" name="name" placeholder="Имя" required><br><br>
    <input type="text" name="phone" placeholder="Телефон" required><br><br>
    <button type="submit">Отправить тест</button>
</form>
</body>
</html>