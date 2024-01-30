const express = require("express");

const app = express();
app.get("/", function(req, res){

  res.setHeader("Content-type", "text/html; charset=utf-8");
  res.send("<h1>Привет, Октагон!</h1>");

})

app.listen(3000);