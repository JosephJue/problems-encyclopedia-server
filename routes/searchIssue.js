var express = require('express');
var router = express.Router();
var child_process = require('child_process');
var SqliteDB = require('./sqlite3').SqliteDB;
var file = "./database/support";
var sqliteDB = new SqliteDB(file);

var key = "";

router.post('/', async function (req, res) {
  var type = req.body["type"];
  var hotSearch = req.body["hotSearch"];
  if (hotSearch) {
    this.getHotSearch(hotSearch,res);
  } else if (type.includes("iOS")) {
    var key = req.body["key"];
    var querySql = 'SELECT * FROM summaryiOS WHERE issueDescription LIKE \'%' + key + '%\'';
    sqliteDB.queryData(querySql, function(objects){
      if (objects.length == 0) {
        res.send("None");
        return;
      }
      res.send(objects);
     })
    } else {
      res.send("None")
    }
})

getHotSearch = function(key, res) {
  if (key.includes("iOS")) {
    var querySql = 'SELECT * FROM summaryiOS order by reviewCount desc limit 0,3';
    sqliteDB.queryData(querySql, function(objects){
      if (objects.length == 0) {
        res.send("None");
      } else {
        res.send(objects);
      }
     }) 
    } else {
      res.send("None");
    }
    return;
}
module.exports = router;