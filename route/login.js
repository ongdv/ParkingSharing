module.exports = (app, con) => {
  app.post("/login", (req, res) => {
    var input = req.body;
    var result = {};
    if (input["mail"] == "" || input["password"] == "") {
      result["success"] = 0;
      result["err"] = "Check blank";
      res.send(result);
      return;
    } else {
      var sql = "SELECT * FROM member WHERE mail = '" + input["mail"] + "'";
      //console.log(sql);
      con.query(sql, (err, row, data) => {
        if (err) {
          console.log(err);
          result["success"] = 0;
          result["err"] = "DB error";
          res.send(result);
          return;
        } else {
          //console.log(row);
          if (row.length == 0) {
            result["success"] = 0;
            result["err"] = "Invalid mail";
            res.send(result);
            return;
          } else {
            if (
              row[0].mail == input["mail"] &&
              row[0].password == input["password"]
            ) {
              var data = {};
              result["success"] = 1;
              data["mail"] = row[0].mail;
              data["name"] = row[0].name;
              data["phone"] = row[0].phone;
              data["card"] = row[0].card;
              data["car"] = row[0].car;
              data["num"] = row[0].num;
              result["data"] = data;
              res.send(result);
              return;
            } else {
              result["success"] = 0;
              result["err"] = "Check mail & password";
              res.send(result);
              return;
            }
          }
        }
      });
    }
  });
};
