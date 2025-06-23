const express = require("express");
const path = require("path");
const app = express();
const PORT = 3001;

app.use(express.static(path.join(__dirname, "public")));

app.get("/about", (req, res) => {
  const login = req.query.login;
  if (login === "is-34fiot-23-157") {
    res.send(`
      <h2>Особисті дані</h2>
      <ul>
        <li>Прізвище: Далівалієв</li>
        <li>Ім’я: Ельнур</li>
        <li>Курс: 2</li>
        <li>Група: ІС-34</li>
      </ul>
    `);
  } else {
    res.status(403).send("Доступ заборонено");
  }
});

app.listen(PORT, () => {
  console.log(
    `Сервер особистих даних працює: http://localhost:${PORT}/about?login=is-34fiot-23-157`
  );
});
