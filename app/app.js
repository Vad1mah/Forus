const express = require('express');
const multer = require('multer');



// GET-запросы
const { mainHl, staticHl, dynamicHl, getAllItems } = require('./middleware/user-handlers')
// POST-запросы
const { addItem, deleteItem, updateItem } = require('./middleware/post-handlers')


const app = express();

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use(multer().single());
// app.use(express.static(__dirname));
// app.use(multer({dest:"uploads"}).single("filedata"));

app.get("/", mainHl);
app.get("/static", staticHl);
app.get("/dynamic", dynamicHl);
app.get("/getAllItems", getAllItems);

app.post("/addItem", addItem);
app.post("/deleteItem", deleteItem);
app.post("/updateItem", updateItem);

app.listen(3000);