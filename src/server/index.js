const express = require("express");
const path = require("path");
const app = express();

const PORT = 3006;

// use static
app.use(express.static(path.join(__dirname, "../../build")));

// get file index.html from 'public/build/index.html'
app.use("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../../build", "index.html"));
});

// endfile

app.listen(PORT, () => {
  console.log("weddingWeb (express + react) run : " + PORT);
});
