const express = require("express");
const multer = require("multer");
const mysql = require("mysql2");
const TelegramBot = require("node-telegram-bot-api");

function update_sql(res, sql, params = []) {
  pool.query(sql, params)
      .then(()=> {
        pool.query("SELECT * FROM items")
            .then(rows => {
              console.log(rows[0]);
              res.send(rows[0]);
            });
      })
      .catch((err) => {
        console.log(err.message);
        throw err;
      });
}

async function check_existence(id) {
  try {
    const res = await pool.query('SELECT * FROM items WHERE id = ?', [id]);
    return res[0].length != 0;
  
  } catch (err) {
    console.error('Error:', err);
    throw err;
  }
}

function isNumberNotEmpty(str) {
  return !isNaN(str) && str.trim() !== '';
}



const token = "6637576016:AAFXvWBO9hQ9CxtjMpGEzMD7twgimGgPAOQ";
const bot = new TelegramBot(token, {polling: true});

bot.onText(/\/help/, (msg, match) => {
  const chatId = msg.chat.id;
  const helpMessage = 
  "Это тестовый бот, пока что с примитивными командами :)\n\n" +
  "Ниже список команд, которые могут тебе помочь:\n\n" +
  "/help - вернуть список команд\n" +
  "/start - получить приветственное сообщение\n" +
  "/site - получить ссылку на сайт октагона\n" +
  "/creator - получить ФИО создателя"

  bot.sendMessage(chatId, helpMessage);
})

bot.onText(/\/start/, (msg, match) => {
  const chatId = msg.chat.id;
  const helloMessage = 
  "Привет, октагон!\n\n" +
  "Воспользуйся командой /help чтобы получить список команд";

  bot.sendMessage(chatId, helloMessage);
});

bot.onText(/\/site/, (msg, match) => {
  const chatId = msg.chat.id;
  const octagonLink = "Ссылка на сайт октагона: https://students.forus.ru/";

  bot.sendMessage(chatId, octagonLink);
})

bot.onText(/\/creator/, (msg, match) => {
  const chatId = msg.chat.id;
  const creatorFullName = "Инициалы создателя: Исполатов Вадим Петрович";

  bot.sendMessage(chatId, creatorFullName);
})

// bot.on("message", (msg) => {
//   const chatId = msg.chat.id;

//   bot.sendMessage(chatId, "Received your message");
// });


const app = express();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true
  })
);
app.use(multer().single());
// app.use(express.static(__dirname));
// app.use(multer({dest:"uploads"}).single("filedata"));

const pool = mysql.createPool({
  connectionLimit: 5,
  host: "localhost",
  user: "root",
  database: "chatbottests"
}).promise();


// paths
app.get("/", (req, res) => {

  res.setHeader("Content-type", "text/html; charset=utf-8");
  res.send("<h1>Привет, Октагон!</h1>");
});

app.get("/static", (req, res) => {

  res.json({header: "Hello", body: "Octagon NodeJS Test"});
});

app.get("/dynamic", (req, res) => {

  const {a, b, c} = req.query;

  if (!isNumberNotEmpty(a) || !isNumberNotEmpty(b) || !isNumberNotEmpty(c)) {
    res.json({header: "Error"});

  } else {
    const result = (Number(a) * Number(b) * Number(c)) / 3;
    res.json({header: "Calculated", body: result.toString()});
  }
});

app.get("/getAllItems", (req, res) => {
  
  const sql = "SELECT * FROM items";
  update_sql(res, sql);
});

app.post("/addItem", (req, res) => {

  const {name, desc} = req.body;
  if (!isNaN(name) || !isNaN(desc)) {
    console.log(null);
    res.send("null");
    return;
  }

  const sql = "INSERT INTO items (`name`, `desc`) VALUES (?, ?)";
  update_sql(res, sql, [name, desc]);
});

app.post("/deleteItem", async (req, res) => {

  const id = req.body.id;

  if (!isNumberNotEmpty(id)) {
    console.log(null);
    res.send("null");
    return;
  }
  if (!await check_existence(id)) {
    console.log({});
    res.send({});
    return;
  }

  const sql = "DELETE FROM items WHERE `id` = ?";
  update_sql(res, sql, [id]);
});

app.post("/updateItem", async function(req, res){

  const {id, name, desc} = req.body;

  if (!isNumberNotEmpty(id) || !isNaN(name) || !isNaN(desc)) {
    console.log(null);
    res.send("null");
    return;

  } 
  if (!await check_existence(id)) {
    console.log({});
    res.send({});
    return;
  }

  const sql = "UPDATE items SET `name` = ?, `desc` = ? WHERE `id` = ?";
  update_sql(res, sql, [id, name, desc]);
});


app.listen(3000);