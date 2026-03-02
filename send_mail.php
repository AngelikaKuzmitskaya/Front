<?php
/**
 * send_mail.php - Отправка заявок с сайта через Mailtrap (КРАСИВЫЙ ДИЗАЙН)
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

    $name = isset($_POST['name']) ? htmlspecialchars(trim($_POST['name'])) : '';
    $phone = isset($_POST['phone']) ? htmlspecialchars(trim($_POST['phone'])) : '';
    $email = isset($_POST['email']) ? htmlspecialchars(trim($_POST['email'])) : '';
    $form_type = isset($_POST['form_type']) ? htmlspecialchars(trim($_POST['form_type'])) : 'Заявка с сайта';
    $message = isset($_POST['message']) ? htmlspecialchars(trim($_POST['message'])) : '';

    // Валидация
    if (empty($name) || empty($phone)) {
        echo json_encode(['success' => false, 'message' => 'Заполните обязательные поля!']);
        exit;
    }

    $phpmailer = new PHPMailer();
    $phpmailer->isSMTP();
    $phpmailer->Host = 'live.smtp.mailtrap.io';
    $phpmailer->SMTPAuth = true;
    $phpmailer->Port = 587;
    $phpmailer->Username = 'api';
    $phpmailer->Password = '24b07ac952bd629c5edb2ffebda5739d';

    $phpmailer->CharSet = 'UTF-8';
    $phpmailer->Encoding = 'base64';

    $phpmailer->setFrom('hello@demomailtrap.co', 'Онлайн-университет');
    $phpmailer->addAddress('anjelika07122006@gmail.com', 'Администратор');

    $phpmailer->isHTML(true);
    $phpmailer->Subject = "📝 $form_type от $name";

    // КРАСИВЫЙ ШАБЛОН
    $phpmailer->Body = '
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
            body {
                margin: 0;
                padding: 0;
                font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
                background-color: #f3f4f6;
                width: 100% !important;
            }
            
            .wrapper {
                width: 100% !important;
                background-color: #f3f4f6;
                padding: 40px 10px;
            }
            
            .container {
                max-width: 580px;
                margin: 0 auto;
                background-color: #ffffff;
                border-radius: 16px;
                overflow: hidden;
                box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
            }
            
            .header {
                background: linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%);
                padding: 36px 24px;
                text-align: center;
            }
            
            .logo {
                width: 56px;
                height: 56px;
                background-color: white;
                border-radius: 14px;
                display: inline-flex;
                align-items: center;
                justify-content: center;
                font-size: 28px;
                margin-bottom: 12px;
            }
            
            .header h1 {
                color: white;
                font-size: 22px;
                font-weight: 700;
                margin: 0;
            }
            
            .header p {
                color: rgba(255, 255, 255, 0.85);
                font-size: 14px;
                margin-top: 8px;
            }
            
            .content {
                padding: 24px;
            }
            
            .badge {
                display: inline-block;
                background-color: #EEF2FF;
                color: #4F46E5;
                font-size: 11px;
                font-weight: 600;
                padding: 5px 12px;
                border-radius: 9999px;
                margin-bottom: 20px;
            }
            
            .info-table {
                width: 100%;
                border-collapse: collapse;
            }
            
            .info-row {
                border-bottom: 1px solid #E5E7EB;
            }
            
            .info-row:first-child {
                border-top: 1px solid #E5E7EB;
            }
            
            .info-row td {
                padding: 14px 10px;
                vertical-align: top;
            }
            
            .field-name {
                width: 80px;
                min-width: 80px;
                color: #6B7280;
                font-size: 13px;
                font-weight: 500;
            }
            
            .field-value {
                color: #111827;
                font-size: 15px;
                font-weight: 500;
                word-break: break-word !important;
                overflow-wrap: break-word !important;
                word-wrap: break-word !important;
            }
            
            .field-value a {
                color: #4F46E5;
                text-decoration: none;
                word-break: break-word !important;
                overflow-wrap: break-word !important;
            }
            
            .message {
                background-color: #F9FAFB;
                border-radius: 10px;
                padding: 16px;
                margin-top: 16px;
            }
            
            .message-title {
                color: #6B7280;
                font-size: 11px;
                font-weight: 600;
                text-transform: uppercase;
                letter-spacing: 0.05em;
                margin-bottom: 8px;
            }
            
            .message-text {
                color: #111827;
                font-size: 14px;
                line-height: 1.5;
                margin: 0;
                word-break: break-word !important;
                overflow-wrap: break-word !important;
            }
            
            .footer {
                background-color: #F9FAFB;
                padding: 20px 24px;
                text-align: center;
            }
            
            .footer p {
                color: #9CA3AF;
                font-size: 12px;
                margin: 0;
            }
            
            .footer .time {
                color: #6B7280;
                font-size: 13px;
                font-weight: 500;
                margin-top: 6px;
            }
        </style>
    </head>
    <body>
        <div class="wrapper">
            <div class="container">
                <div class="header">
                    <div class="logo">🎓</div>
                    <h1>Новая заявка</h1>
                    <p>Онлайн-университет</p>
                </div>
                
                <div class="content">
                    <span class="badge">' . $form_type . '</span>
                    
                    <table class="info-table">
                        <tr class="info-row">
                            <td class="field-name">Имя</td>
                            <td class="field-value">' . $name . '</td>
                        </tr>
                        <tr class="info-row">
                            <td class="field-name">Телефон</td>
                            <td class="field-value">
                                <a href="tel:' . $phone . '">' . $phone . '</a>
                            </td>
                        </tr>
                        <tr class="info-row">
                            <td class="field-name">Email</td>
                            <td class="field-value">
                                <a href="mailto:' . $email . '">' . $email . '</a>
                            </td>
                        </tr>
                    </table>
                    
                    ' . (!empty($message) ? '
                    <div class="message">
                        <div class="message-title">Сообщение</div>
                        <p class="message-text">' . nl2br($message) . '</p>
                    </div>
                    ' : '') . '
                </div>
                
                <div class="footer">
                    <p>Автоматическое уведомление с сайта</p>
                    <p class="time">' . date('d.m.Y H:i') . '</p>
                </div>
            </div>
        </div>
    </body>
    </html>
    ';

    if ($phpmailer->send()) {
        echo json_encode(['success' => true, 'message' => 'Спасибо! Ваша заявка отправлена. Мы свяжемся с вами в ближайшее время!']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Ошибка отправки. Попробуйте позже.']);
    }
    exit;
}
?>