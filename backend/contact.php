<?php
/**
 * contact.php — spracovanie kontaktného formulára
 *
 * POST /api/contact.php
 * Body (JSON): { "name": "...", "email": "...", "message": "..." }
 * Odpoveď:     { "ok": true }  alebo  { "ok": false, "error": "..." }
 */

require_once __DIR__ . '/config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    json_out(['ok' => false, 'error' => 'Len POST metóda'], 405);
}

$body = file_get_contents('php://input');
$data = json_decode($body, true);

// Validácia vstupov
$name    = trim($data['name']    ?? '');
$email   = trim($data['email']   ?? '');
$message = trim($data['message'] ?? '');

if (!$name || !$email || !$message) {
    json_out(['ok' => false, 'error' => 'Chýbajú povinné polia'], 400);
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    json_out(['ok' => false, 'error' => 'Neplatný e-mail'], 400);
}

// Sanitizácia — zabránenie header injection
$name    = str_replace(["\r", "\n"], '', $name);
$email   = str_replace(["\r", "\n"], '', $email);
$message = nl2br(htmlspecialchars($message, ENT_QUOTES, 'UTF-8'));

$subject = MAIL_SUBJECT;
$body    = <<<TEXT
Nová správa z webu U skákavého poníka:

Meno:    $name
E-mail:  $email

Správa:
{$message}

---
Odoslané z: uskakavehoponika.sk
TEXT;

$headers  = "From: " . MAIL_FROM . "\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
$headers .= "X-Mailer: PHP/" . phpversion() . "\r\n";

$sent = mail(MAIL_TO, $subject, $body, $headers);

if ($sent) {
    json_out(['ok' => true]);
} else {
    // Logujeme na server, nie do odpovede
    error_log("[contact.php] mail() zlyhalo — od: $email");
    json_out(['ok' => false, 'error' => 'Odoslanie zlyhalo, skús neskôr'], 500);
}
