# U skákavého poníka 🐴

Webová stránka občianskeho združenia.

## Rýchly štart

### Frontend (React + Vite)
```bash
cd frontend
npm install
npm run dev
```
Otvor: http://localhost:5173

### Backend (PHP)
Na lokálnom vývoji spusti PHP built-in server z koreňa projektu:
```bash
php -S localhost:8080 -t backend
```

Vite proxy presmeruje `/api/*` → `http://localhost:8080/*` automaticky.

---

## Nastavenie Google Drive galérie

1. **Vytvor priečinok na Google Drive** a nastav ho:
   - Klikni pravým → Zdieľať → "Každý, kto má odkaz" → Prezerateľ

2. **Získaj ID priečinka** — je v URL:
   `https://drive.google.com/drive/folders/`**`TU_JE_ID`**

3. **Google API Key**:
   - Choď na [console.cloud.google.com](https://console.cloud.google.com)
   - Vytvor projekt → Enable "Google Drive API"
   - Credentials → Create API Key (obmedzit na Drive API)

4. **Vyplň `backend/config.php`**:
   ```php
   define('GOOGLE_API_KEY',       'tvoj-api-kluc');
   define('GOOGLE_DRIVE_FOLDER_ID', 'id-priecinka');
   ```

---

## Nasadenie na hosting

1. Nahraj **`/frontend/dist/`** (po `npm run build`) do webového rootu.
2. Nahraj **`/backend/`** vedľa.
3. Skontroluj, že `.htaccess` funguje (mod_rewrite musí byť povolený).
4. V `config.php` nastav správnu `ALLOWED_ORIGIN` a `MAIL_TO`.

## Štruktúra

```
uskakavehoponika/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Hero.jsx
│   │   │   ├── About.jsx
│   │   │   ├── Gallery.jsx
│   │   │   ├── Contact.jsx
│   │   │   └── Footer.jsx
│   │   ├── App.jsx
│   │   └── index.css
│   ├── index.html
│   ├── vite.config.js
│   └── tailwind.config.js
├── backend/
│   ├── config.php
│   ├── gallery.php
│   └── contact.php
└── .htaccess
```
