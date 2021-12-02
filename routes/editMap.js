/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const { response, json } = require("express");
const express = require("express");
const router = express.Router();

module.exports = (db) => {



  //RENDERS VIEW MAP PAGE
  router.get("/:id", (req, res) => {
    console.log(req.body)
    const mapId = req.params.id;
    console.log('mapId', mapId);

    const queryString = `
    SELECT name, description, latitude, longitude, image
    FROM pois
    WHERE map_id = $1
    `
    const queryParams = [mapId]

    let pois = [];

    db.query(queryString, queryParams)
    .then(results => {
      for (let row of results.rows) {
        pois.push(row);
      }

      const poisString = JSON.stringify(pois)

      // sessionStorage.setItem('poisString', pois.toString());

      let templateVars = {
        mapId,
        user_email: req.session.email,
        pois: poisString
      }
      // res.send("<p>VIEW MAP PAGE</p>");
      db.query(`DELETE FROM pois
      WHERE map_id = $1`, [mapId])
      .then(() => {
        db.query(`SELECT * FROM maps WHERE id = $1`, [mapId])
        .then((result) => {
          templateVars.title = result.rows[0].name
          res.render("edit_map", templateVars)
        })

      })

    })
    .catch(error=>console.log(error))
  });

  router.post("/submit_map", (req, res) => {
    const pois_array = req.body.pois;
    let count = 0;

    pois_array.forEach((poi) => {
      db.query(
        `INSERT INTO pois (name, description,latitude,longitude,map_id,image) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *`,
        [
          poi.title,
          poi.description,
          poi.latitude,
          poi.longitude,
          poi.map_id,
          poi.image,
        ]
      ).then((response) => {
        count += 1;
        if (count === pois_array.length) {
          res.send("DONE");
        }
      });
    });
  });




  return router;
};
