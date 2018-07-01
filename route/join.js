module.exports = (app, con) => {
  //회원가입
  app.post("/join", (req, res) => {
    var input = req.body;
    var result = {};
    //console.log(input);
    if (
      input["mail"] == "" ||
      input["password"] == "" ||
      input["name"] == "" ||
      input["phone"] == "" ||
      input["card"] == "" ||
      input["car"] == "" ||
      input["num"] == "" ||
      input["owner"] == ""
    ) {
      result["success"] = 0;
      result["err"] = "empty";
      console.log(result);
      res.send(result);
      return;
    } else {
      var sql = "SELECT * FROM member WHERE mail='" + input["mail"] + "'";
      //console.log(sql);
      con.query(sql, (err, row, data) => {
        if (err) {
          console.log(err);
          result["success"] = 0;
          result["err"] = "DB error";
          console.log(result);
          res.send(result);
          return;
        } else {
          if (row.length == 0) {
            var sql =
              "INSERT INTO member VALUES ('" +
              input["mail"] +
              "', '" +
              input["password"] +
              "', '" +
              input["name"] +
              "', '" +
              input["phone"] +
              "', '" +
              input["card"] +
              "', '" +
              input["car"] +
              "', '" +
              input["num"] +
              "', " +
              input["owner"] +
              ")";
            con.query(sql, (err, row) => {
              if (err) {
                console.log(err);
                result["success"] = 0;
                result["err"] = "DB error";
                res.send(result);
                return;
              } else {
                result["success"] = 1;
                console.log(result);
                res.send(result);
                return;
              }
            });
          } else {
            //console.log(row);
            result["success"] = 0;
            result["err"] = "Inavlid mail";
            res.send(result);
            return;
          }
        }
      });
    }
  });
};
