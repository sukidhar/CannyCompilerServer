module.exports = (app, rethinkDB) => {
  app.get("/logs/user/:id/all", (req, res) => {
    if (!req.params.id) {
      res.sendStatus(404);
      return;
    }
    rethinkDB
      .getAllLogs(req.params.id)
      .then((result) => res.send(result))
      .catch((error) => res.sendStatus(404));
  });

  app.get("/logs/user/:id/log/:lid", (req, res) => {
    if (!req.params.id || !req.params.lid) {
      res.sendStatus(404);
      return;
    }
    rethinkDB
      .getLog(req.params.id, req.params.lid)
      .then((result) => res.send(result))
      .catch((error) => res.sendStatus(404));
  });

  app.delete("/logs/user/:id/all", (req, res) => {
    if (!req.params.id) {
      res.sendStatus(404);
      return;
    }
    rethinkDB
      .deleteLogs(req.params.id)
      .then(() => {
        res.sendStatus(200);
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(404);
      });
  });

  app.delete("/logs/user/:id/log/:lid", (req, res) => {
    if (!req.params.id || !req.params.lid) {
      res.sendStatus(404);
      return;
    }
    rethinkDB
      .deleteLog(req.params.id, req.params.lid)
      .then(() => {
        res.sendStatus(200);
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(404);
      });
  });
};
