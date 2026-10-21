# Flu Launcher — Landing Page

Website statis (HTML + CSS + JS, tanpa build tool) untuk **Flu Launcher**.
Tema: gelap, gradient hijau Minecraft, pixel font Monocraft, block 3D CSS.

## Cara buka

Langsung:

- Double-click `index.html`

Atau lewat server lokal (lebih rapi untuk tes):

```powershell
cd "F:\mc website"
python -m http.server 8080
```

Lalu buka <http://localhost:8080>.

## Struktur

```
mc website/
├─ index.html
├─ assets/
│  ├─ css/style.css
│  ├─ js/main.js
│  ├─ fonts/            Monocraft (regular/bold/black) + Press Start 2P
│  └─ img/              tekstur pixel (grass, stone, diamond), favicon, noise
└─ README.md
```

File game **tidak** disimpan di folder ini — di-host di Google Drive.

## Download

- **File:** `Flu Launcher.zip` — paket lengkap, **879 MB** (Java + assets + libraries)
- **Link:** <https://drive.google.com/file/d/1_O7T0TQoGxig6dKVgDkUdUf92RTwyZ5M/view?usp=sharing>
- **SHA-256:** `AB58608C19B2738DF55B6A92EA353CA27BDB88B3805A7591380AA89BF977C358`

Versi Minecraft tetap diunduh saat instal pertama (butuh internet sekali);
setelah itu game bisa dimainkan offline.

Semua tombol download diatur dari **satu baris** di `assets/js/main.js`:

```js
```

Kalau link berubah, ganti baris itu. Link `http(s)://` otomatis dibuka di tab baru
dan atribut `download` dilepas supaya halaman Google Drive terbuka normal.

Kalau file zip diganti, perbarui juga:

- ukuran `879 MB` di tombol (hero + section download), dan
- teks SHA-256 di `index.html` (`<code id="sha">…</code>`).

> Google Drive menampilkan peringatan "virus scan" untuk file >100 MB — klik
> **Download anyway**. Kalau link dibuka banyak orang sekaligus, kuota download
> Drive bisa penuh; alternatifnya MediaFire/OneDrive.

## Font & lisensi

- **Monocraft** — Idrees Inc. (SIL Open Font License 1.1).
  File lisensi: `assets/fonts/LICENSE-Monocraft.txt`.
- **Press Start 2P** — CodeMan38 (SIL Open Font License 1.1).
  File lisensi: `assets/fonts/LICENSE-PressStart2P.txt`.

Keduanya boleh dipakai dan didistribusikan ulang untuk project ini.

## Deploy

Folder ini cuma ~1,2 MB (tanpa file game), jadi bisa langsung di-upload ke:

- Netlify Drop — <https://app.netlify.com/drop>
- Vercel
- GitHub Pages
- Cloudflare Pages

Tidak perlu build step.

## Catatan

- Website tidak berafiliasi dengan Mojang Studios / Microsoft.
- Minecraft adalah merek dagang Mojang Studios.
