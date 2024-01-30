const express = require("express");

const app = express();
app.get("/", function(req, res){

  res.setHeader("Content-type", "text/html; charset=utf-8");
  res.send("<h1>Привет, Октагон!</h1>");
});

app.get("/static", function(req, res){

  res.json({header: "Hello", body: "Octagon NodeJS Test"});
});

app.get("/dynamic", function(req, res){

  const {a, b, c} = req.query;

  if (isNaN(a) || isNaN(b) || isNaN(c)) {
    res.json({header: "Error"});
  } else {
    const result = (Number(a) * Number(b) * Number(c)) / 3;
    res.json({header: "Calculated", body: result.toString()});
  }
});

app.listen(3000);