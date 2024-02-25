const express = require("express");
const dotenv = require(`dotenv`);
const morgan = require('morgan');
const app = express();
const bodyparser = require("body-parser");
const path = require('path');

dotenv.config({ path: "config.env" }); //
const PORT = process.PORT || 8080;

// log requests
app.use(morgan('tiny'));

// parse request to body-parser
app.use(bodyparser.urlencoded({ extended : true}))

// set view engine
app.set("view engine", "ejs")
//app.set("views", path.resolve(__dirname, "views/ejs"))

app.get(`/`, (req, res) => {
  res.send("Express Server Application");
});

//liststen to PORT
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
