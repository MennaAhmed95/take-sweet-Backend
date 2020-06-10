const mongoose = require("mongoose");
require("dotenv").config();

const dataBase_Connection = process.env.DB_CONNECTION

mongoose.connect(dataBase_Connection, {
    useNewUrlParser: true,
  })
  .then(() => console.info("connected to mongo successfuly"))
  .catch((err) => {
    console.error(err);
  });