const express = require("express");
const path = require("path");
const compression = require("compression");

const app = express();

app.use(compression());
app.use(express.static(path.join(__dirname, "build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

const PORT = 3000;

app.listen(PORT, () => console.log(`App started on port ${PORT}...`));
