const { c, cpp, node, python, java } = require("compile-run");
module.exports = (app, rethinkDB) => {
  app.post("/compile", async (req, res) => {
    var result = {};
    if (req.body.id && req.body.code && req.body.language) {
      switch (req.body.language) {
        case "c":
          result = await c.runSource(req.body.code, {
            stdin: req.body.stdin,
          });
          break;
        case "cpp":
          result = await cpp.runSource(req.body.code, {
            stdin: req.body.stdin,
          });
          break;
        case "python":
          result = await python.runSource(req.body.code, {
            stdin: req.body.stdin,
          });
          break;
        case "javascript":
          result = await node.runSource(req.body.code, {
            stdin: req.body.stdin,
          });
          break;
        case "java":
          result = await java.runSource(req.body.code, {
            stdin: req.body.stdin,
          });
          break;
        default:
          break;
      }
      await rethinkDB.addLog(
        req.body.id,
        req.body.code,
        result,
        req.body.language
      );
      res.send(result);
      return;
    }
    res.sendStatus(403);
  });
};
