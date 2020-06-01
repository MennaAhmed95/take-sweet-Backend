const express = require("express");
require("./db");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(express.urlencoded());

app.get("/", (req, res) => res.send("Hello World!"));
const port = process.env.PORT || 3000;
app.listen(port, () =>
  console.log(`App listening at http://localhost:${port}`)
);
