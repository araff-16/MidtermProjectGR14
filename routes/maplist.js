/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();

module.exports = (db) => {
  //SENDS ALL USER DATA
  //RENDER LIST VIEW OF ALL MAPS
  router.get("/", (req, res) => {
    const queryString = `
    SELECT *
    FROM maps
    `;
    db.query(queryString)
      .then((mapData) => {
        console.log(mapData.rows);
        // mapObject will be an array of Objects, loop through in the ejs file
        let mapObject = mapData.rows;

        console.log("test4", mapObject);

        const { user_id } = req.session;

        const favoritesQueryString = `
        SELECT * FROM favorites
        WHERE user_id = $1
        `;
        const favoritesQueryValues = [user_id];

        db.query(favoritesQueryString, favoritesQueryValues)
          .then((favoritesData) => {
            // console.log(favoritesData.rows);
            const mapsWithFavoriteData = mapObject.map((map) => {
              const mapExistInFavorite = favoritesData.rows.some((fav) => {
                return fav.map_id === map.id;
              });
              if (mapExistInFavorite) {
                const mapCopy = { ...map };
                mapCopy["favorited"] = true;
                return mapCopy;
              } else {
                return map;
              }
            });
            const templateVars = {
              user_email: req.session.email,
              maplistObject: mapsWithFavoriteData,
            };
            console.log(mapsWithFavoriteData);
            res.render("maplist", templateVars);
            // favoritesData.rows.forEach((fav) => {});
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  //STORE DATA WHEN SOMEONE FAVORITED
  router.delete("/", (req, res) => {
    const { user_id } = req.session;
    const mapId = req.body.mapId;

    // console.log("test1", req.body);

    const queryString = `
    DELETE FROM favorites
    WHERE user_id = $1 AND map_id = $2
    `;
    const queryValues = [user_id, mapId];
    db.query(queryString, queryValues).then(() => {
      console.log("deleted");
      res.status(200);
    });
  });
  //POST TO UPDATE FAVORITES TABLE
  router.post("/", (req, res) => {
    console.log("test6", "hello");

    const { user_id } = req.session;
    console.log("test8", user_id);
    const mapId = Number(req.body.mapId);
    console.log("mapid", mapId);
    console.log("post reqbody", req.body);

    const queryString = `
    INSERT INTO favorites (user_id, map_id)
    VALUES ($1, $2)
    `;
    // UPDATE table_name SET column1 = value1, column2 = value2, ... WHERE condition;
    const queryValues = [user_id, mapId];
    db.query(queryString, queryValues).then((data) => {
      console.log(data);
      console.log("update");
      res.status(200);
    });
  });

  //DELETE DATA FOR FAVORITED
  router.delete("/", (req, res) => {
    db.query;
  });

  // RENDER Maplist
  router.get("/maplist", (req, res) => {
    res.render("maplist", templateVars);
  });

  //POST LOGIN INFO
  router.post("/login", (req, res) => {
    res.send("HELLO YOU HAVE LOGGED IN");
  });

  //RENDER CREATE ACCOUNT
  router.get("/register", (req, res) => {
    res.render("users_register");
  });

  //POST NEW ACCOUNT INFO
  router.post("/register", (req, res) => {
    //NEED TO CHECK IF USER EMAIL EXITS IN DB
    //NEED TO INSERT NEW USER INTO DATABSE
    //AND AUTOMATICALLY LOG USER IN
    res.send("HELLO YOU HAVE CREATED AN ACCOUNT");
  });

  //render
  return router;
};
