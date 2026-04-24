# Lesson Images

Drop PNG/JPG files here (e.g. `football.png`, `art.png`, …).

They are served by Express via the static middleware at `/images/<filename>`.
If a requested image does not exist, the server returns `404 { "error": "Image not found" }`.
