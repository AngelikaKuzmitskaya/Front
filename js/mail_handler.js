console.log('JS загружен');

document.addEventListener('DOMContentLoaded', function() {

    var f1 = document.getElementById('requestForm');
    if (f1) {
        f1.addEventListener('submit', function(e) {
            e.preventDefault();
            sendForm(this, 'Заявка на курс');
        });
    }

    var f2 = document.getElementById('contactForm');
    if (f2) {
        f2.addEventListener('submit', function(e) {
            e.preventDefault();
            sendForm(this, 'Подбор программы');
        });
    }

    var f3 = document.getElementById('contact-form');
    if (f3) {
        f3.addEventListener('submit', function(e) {
            e.preventDefault();
            sendForm(this, 'Обратная связь');
        });
    }
});

function sendForm(form, t) {
    var fd = new FormData(form);
    fd.append('form_type', t);

    var btn = form.querySelector('button[type="submit"]');
    if (!btn) return;

    var old = btn.innerHTML;
    btn.disabled = true;
    btn.innerHTML = '<span class="spinner"></span> Отправка...';
    btn.style.opacity = '0.8';

    fetch('send_mail.php', { method: 'POST', body: fd })
        .then(function(r) { return r.json(); })
        .then(function(d) {
            if (d.success) {
                showToast(d.message, 'ok');
                form.reset();
            } else {
                showToast(d.message, 'err');
            }
        })
        .catch(function() {
            showToast('Ошибка. Попробуйте позже.', 'err');
        })
        .finally(function() {
            btn.disabled = false;
            btn.innerHTML = old;
            btn.style.opacity = '1';
        });
}

function showToast(text, type) {
    var old = document.querySelector('.toast-msg');
    if (old) old.remove();

    var div = document.createElement('div');
    div.className = 'toast-msg toast-' + type;

    var color = type === 'ok' ? 'linear-gradient(135deg, #10B981, #059669)' : 'linear-gradient(135deg, #EF4444, #DC2626)';
    var icon = type === 'ok' ? '✓' : '✕';

    div.style.cssText =
        'position:fixed;top:30px;right:30px;padding:18px 24px;background:' + color +
        ';color:#fff;border-radius:14px;font-family:-apple-system,BlinkMacSystemFont,sans-serif;font-size:15px;font-weight:500;' +
        'z-index:99999;box-shadow:0 20px 40px rgba(0,0,0,0.25);display:flex;align-items:center;gap:14px;' +
        'animation:slideIn 0.4s ease;max-width:380px;';

    div.innerHTML = '<span style="font-size:20px;">' + icon + '</span><span>' + text + '</span>';

    document.body.appendChild(div);

    setTimeout(function() {
        div.style.animation = 'slideOut 0.3s ease';
        setTimeout(function() { div.remove(); }, 300);
    }, 4000);
}

// Добавляем стили
var st = document.createElement('style');
st.textContent =
    '.spinner{display:inline-block;width:16px;height:16px;border:2px solid rgba(255,255,255,0.3);' +
    'border-top-color:#fff;border-radius:50%;animation:spin 0.8s linear infinite;margin-right:8px;vertical-align:middle}' +
    '@keyframes spin{to{transform:rotate(360deg)}}' +
    '@keyframes slideIn{from{transform:translateX(120%);opacity:0}to{transform:translateX(0);opacity:1}}' +
    '@keyframes slideOut{from{transform:translateX(0);opacity:1}to{transform:translateX(120%);opacity:0}}';
document.head.appendChild(st);