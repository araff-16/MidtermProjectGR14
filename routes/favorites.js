const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.post("/", (req, res) => {
    const { mapId } = req.body;
    const { user_id } = req.session;
    const queryString = `
        INSERT INTO FAVORITES (user_id, map_id)
        VALUES ($1, $2)
        `;
    const queryValues = [user_id, mapId];
    db.query(queryString, queryValues)
      .then(function (response) {
        console.log("response.rows");

        console.log(response.rows);
        res.status(200).json({
          success: true,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  });

  return router;
};
