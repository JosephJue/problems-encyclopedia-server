var express = require('express');
var router = express.Router();
var child_process = require('child_process');
var SqliteDB = require('./sqlite3').SqliteDB;
var file = "./database/support";
var sqliteDB = new SqliteDB(file);

var key = "";

router.post('/', async function (req, res)   {
  var type = req.body["type"];
  if (type.includes("iOS")) {
    var key = req.body["key"];
    var querySql = 'SELECT * FROM summaryiOS WHERE issueDescription LIKE \'%' + key + '%\'';
     sqliteDB.queryData(querySql, function(objects){
      if (objects.length == 0) {
        res.send("None");
        return;
      }
      var result = objects[0];
      var count = result["reviewCount"];
      console.log("**********old" + count)
      count += 1;
      console.log("**********new" + count)
      var updateSql = 'update summaryiOS set reviewCount =' + count + ' WHERE issueDescription LIKE \'%' + key + '%\'';
      sqliteDB.executeSql(updateSql);
      res.send("success");
     })
  } else {
    res.send("None")
  }
})
module.exports = router;