<?php
/**
 * gallery.php — vracia zoznam fotiek z Google Drive priečinka
 *
 * GET /api/gallery.php
 * Odpoveď: { "photos": [ { "id": "...", "name": "...", "url": "..." }, ... ] }
 *
 * Požiadavky:
 *  - Priečinok na Drive musí byť nastavený ako "Verejný (každý, kto má odkaz)"
 *  - V config.php musí byť platný GOOGLE_API_KEY a GOOGLE_DRIVE_FOLDER_ID
 */

require_once __DIR__ . '/config.php';

// Jednoduché cache — súbor, platný 10 minút
$cacheFile = sys_get_temp_dir() . '/ponik_gallery_cache.json';
$cacheTtl  = 600;

if (file_exists($cacheFile) && (time() - filemtime($cacheFile)) < $cacheTtl) {
    echo file_get_contents($cacheFile);
    exit;
}

$apiKey   = GOOGLE_API_KEY;
$folderId = GOOGLE_DRIVE_FOLDER_ID;

// Načítame zoznam súborov cez Drive Files API v3
$query    = urlencode("'$folderId' in parents and mimeType contains 'image/' and trashed = false");
$fields   = urlencode('files(id,name,mimeType)');
$url      = "https://www.googleapis.com/drive/v3/files?q=$query&fields=$fields&key=$apiKey&pageSize=100";

$ctx = stream_context_create([
    'http' => [
        'timeout'        => 10,
        'ignore_errors'  => true,
    ],
]);

$raw = @file_get_contents($url, false, $ctx);

if ($raw === false) {
    json_out(['photos' => [], 'error' => 'Nepodarilo sa spojiť s Google Drive API'], 502);
}

$data = json_decode($raw, true);

if (!isset($data['files'])) {
    $msg = $data['error']['message'] ?? 'Neznáma chyba Drive API';
    json_out(['photos' => [], 'error' => $msg], 502);
}

// Prekonvertujeme na priame thumbnail URL (nevyžaduje autentifikáciu pre verejné súbory)
$photos = [];
foreach ($data['files'] as $file) {
    $photos[] = [
        'id'   => $file['id'],
        'name' => $file['name'],
        // sz=1200 = max šírka 1200 px, s0 = pôvodný rozmer
        'url'  => "https://lh3.googleusercontent.com/d/{$file['id']}=s1200",
        // Thumbnail pre grid (menší, rýchlejší)
        'thumb' => "https://lh3.googleusercontent.com/d/{$file['id']}=s400",
    ];
}

$result = json_encode(['photos' => $photos], JSON_UNESCAPED_UNICODE);
file_put_contents($cacheFile, $result);

echo $result;
