const { isNumberNotEmpty } = require('../extra_utils/helpers');
const { updateSql } = require('../sql/utils');

function mainHl(req, res) {
    res.setHeader("Content-type", "text/html; charset=utf-8");
    res.send("<h1>Привет, Октагон!</h1>");
}
  
function staticHl(req, res) {
    res.json({ header: 'Hello', body: 'Octagon NodeJS Test' });
}

function dynamicHl(req, res) {
    const {a, b, c} = req.query;
  
    if (!isNumberNotEmpty(a) || !isNumberNotEmpty(b) || !isNumberNotEmpty(c)) {
      res.json({header: 'Error'});
  
    } else {
      const result = (Number(a) * Number(b) * Number(c)) / 3;
      res.json({header: 'Calculated', body: result.toString()});
    }
}

function getAllItems(req, res) {
    
    const sql = 'SELECT * FROM `items`';
    updateSql(res, sql);
}

module.exports = { mainHl, staticHl, dynamicHl, getAllItems }
