

const { response, json } = require("express");
const express = require("express");
const router = express.Router();

module.exports = (db) => {

  //RENDERS VIEW MAP PAGE
  router.get("/:id", (req, res) => {
    const mapId = req.params.id;

    const queryString = `
    SELECT name, description, latitude, longitude, image
    FROM pois
    WHERE map_id = $1
    `
    const queryParams = [mapId]

    db.query(queryString, queryParams)
    .then(results => {

      let templateVars = {
        mapId,
        user_email: req.session.email,
        pois: results.rows
      }

      res.render('viewMap', templateVars)
    })
    .catch(error=>console.log(error))
  });

  return router;
};
