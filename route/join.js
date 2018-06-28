module.exports = (app, con) => {
    //회원가입
    app.post('/join', (req, res) => {
       var input = req.body;
       var result = {};
       console.log(input); 
       if(input['mail'] == "" || input['password'] == "" || input['name'] == "" || input['phone'] == "" || input['card'] == "" || input['car'] == "" || input['num'] == "" || input['admin'] == ""){
            result['success'] = 0;
            result['err'] = "empty";
            res.send(result);
            return;
       }else{
           var sql = "SELECT * FROM member WHERE mail='" + input['mail'] + "'";
           con.query(sql, (err, row, data) => {
                if(err){
                    console.log(err);
                    result['success'] = 0
                    result['err'] = 'DB error';
                    res.send(result);
                    return;
                }else{
                    if(row.length != 0){
                        var sql = "INSERT INTO member VALUES ('" + input['mail'] + "', '" + + "', '" + input['password']+ "', '" + input['name'] + "', '" + input['phone'] + "', '" + input['card'] + "', '" + input['car'] + "', '" + input['num'] + "', " + input['admin'] + ")";
                        console.log(sql);
                        result['content'] = sql;
                        res.send(result);
                        return;
                    }else{
                        result['success'] = 0;
                        result['err'] = 'Inavlid mail'
                    }
                }
           });
       }
    });
}