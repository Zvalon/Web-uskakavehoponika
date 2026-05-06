<?php

// ============================================================
//  KONFIGURÁCIA — vyplň pred nasadením
// ============================================================

// Google Drive API
define('GOOGLE_API_KEY',       'VLOZ_SEM_SVOJ_GOOGLE_API_KEY');
define('GOOGLE_DRIVE_FOLDER_ID', 'VLOZ_SEM_ID_PRIECINKA_NA_DRIVE');

// Kontaktný formulár — SMTP / mail()
define('MAIL_TO',      'info@uskakavehoponika.sk');
define('MAIL_FROM',    'web@uskakavehoponika.sk');
define('MAIL_SUBJECT', '[Web] Nová správa od poníka');

// Bezpečnosť
define('ALLOWED_ORIGIN', 'https://uskakavehoponika.sk');

// ============================================================

// CORS hlavičky
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
// Počas vývoja povol localhost
$allowed = [ALLOWED_ORIGIN, 'http://localhost:5173', 'http://localhost:4173'];
if (in_array($origin, $allowed, true)) {
    header("Access-Control-Allow-Origin: $origin");
}
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

header('Content-Type: application/json; charset=utf-8');

function json_out(array $data, int $code = 200): void {
    http_response_code($code);
    echo json_encode($data, JSON_UNESCAPED_UNICODE);
    exit;
}
