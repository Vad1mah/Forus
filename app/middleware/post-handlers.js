const { isNumberNotEmpty } = require('../extra_utils/helpers');
const { updateSql } = require('../sql/utils');

function addItem(req, res) {
  
    const {name, desc} = req.body;
    if (!isNaN(name) || !isNaN(desc)) {
      console.log(null);
      res.send("null");
      return;
    }
  
    const sql = 'INSERT INTO `items` (`name`, `desc`) VALUES (?, ?)';
    updateSql(res, sql, [name, desc]);
}
  
async function deleteItem (req, res) {
  
    const id = req.body.id;
  
    if (!isNumberNotEmpty(id)) {
      console.log(null);
      res.send("null");
      return;
    }
    if (!await checkExistence(id)) {
      console.log({});
      res.send({});
      return;
    }
  
    const sql = 'DELETE FROM `items` WHERE `id` = ?';
    updateSql(res, sql, [id]);
}
  
async function updateItem(req, res) {
  
    const {id, name, desc} = req.body;
  
    if (!isNumberNotEmpty(id) || !isNaN(name) || !isNaN(desc)) {
      console.log(null);
      res.send('null');
      return;
  
    } 
    if (!await checkExistence(id)) {
      console.log({});
      res.send({});
      return;
    }
  
    const sql = 'UPDATE `items` SET `name` = ?, `desc` = ? WHERE `id` = ?';
    updateSql(res, sql, [id, name, desc]);
}


module.exports = { addItem, deleteItem, updateItem }