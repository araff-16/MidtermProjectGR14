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
    SELECT name, description, latitude, longitude
    FROM pois
    WHERE map_id = $1
    `
    const queryParams = [mapId]

    let pois = [];

    db.query(queryString, queryParams)
    .then(results => {
      console.log('results.rows', results.rows)
      for (let row of results.rows) {
        // console.log('row',row)
        rowName = row.name
        // console.log(rowName)
        pois.push(row);
      }

      const poisString = JSON.stringify(pois)
      console.log('pois======>', pois)
      console.log('poisString======>', poisString)
      console.log(JSON.parse(poisString))
      // sessionStorage.setItem('poisString', pois.toString());

      let templateVars = {
        mapId,
        user_email: req.session.email,
        pois: poisString
      }
      console.log('templateVars--->', templateVars)
      // res.send("<p>VIEW MAP PAGE</p>");
      res.render('viewMap', templateVars)
    })
    .catch(error=>console.log(error))
  });



  // //RENDERS MY PROFILE PAGE
  // router.get("/profile", (req, res) => {
  //   if (!req.session.user_id) {
  //     res.redirect("/displays");
  //     return;
  //   }

  //   let templateVars = { user_email: req.session.email };

  //   db.query(
  //     `
  //   SELECT maps.name FROM maps
  //   JOIN favorites ON maps.id = favorites.map_id
  //   JOIN users ON users.id = favorites.user_id
  //   WHERE users.id = $1;
  //   `,
  //     [req.session.user_id]
  //   )
  //     .then((response) => {
  //       templateVars.fav_maps = response.rows;

  //       db.query(
  //         `
  //     SELECT name FROM maps
  //     WHERE user_id = $1;
  //     `,
  //         [req.session.user_id]
  //       )
  //         .then((response) => {
  //           templateVars.created_maps = response.rows;
  //           res.render("displays_profile", templateVars);
  //         })
  //         .catch((err) => err.message);
  //     })
  //     .catch((err) => err.message);
  // });







  return router;
};
