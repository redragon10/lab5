const express = require("express");
const fetch = require("node-fetch");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.post("/api/lyrics", async (req, res) => {
  const { artist, title } = req.body;

  // Перевіряємо, чи передані обидва поля
  if (!artist || !title) {
    return res.json({ lyrics: "Введіть виконавця та назву пісні." });
  }

  try {
    const response = await fetch(
      `https://api.lyrics.ovh/v1/${encodeURIComponent(
        artist
      )}/${encodeURIComponent(title)}`,
      {
        timeout: 7000, // 7 секунд на відповідь
      }
    );

    // Якщо API повертає не 200 - все одно намагаємось прочитати json
    let data = {};
    try {
      data = await response.json();
    } catch (jsonError) {
      return res.json({
        lyrics: "Сталася помилка при обробці відповіді від API.",
      });
    }

    // Якщо поле lyrics є і воно не порожнє
    if (data.lyrics && data.lyrics.trim().length > 0) {
      return res.json({ lyrics: data.lyrics });
    }

    // Якщо API повертає error або порожній текст
    return res.json({ lyrics: "Текст пісні не знайдено!" });
  } catch (error) {
    // Якщо сталася будь-яка інша помилка (включаючи таймаут)
    return res.json({ lyrics: "Сталася помилка при завантаженні тексту." });
  }
});

app.listen(PORT, () => {
  console.log(`Сервер запущено: http://localhost:${PORT}`);
});
