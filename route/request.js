module.exports = (app, con) => {
  app.post("/request", (req, res) => {
    var input = req.body;
    var result = {};
    result = input;
    console.log(result);
    res.send(result);
    return;
  });
};
