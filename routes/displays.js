/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const { response } = require("express");
const express = require("express");
const router = express.Router();

module.exports = (db) => {
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

        // for (let mapInfo of data.rows) {
        //   console.log("test1", mapInfo.name);
        //   console.log("test2", mapInfo.id);
        // }
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  //RENDER FAVORITES FOR PARTICULAR USER
  router.get("/favorites", (req, res) => {
    //NEED TO QUERY TO THE DATABASE TO GET ALL favorited maps for user
    //WILL STORE IN TEMPLATVARS AND SEND WITH RENDER

    db.query(
      `
    SELECT * FROM maps
    JOIN favorites ON maps.id = map_id
    WHERE favorites.user_id = 1`
    )
      .then((data) => {
        let favoriteObject = data.rows;
        const templateVars = {
          user_email: req.session.email,
          userFavorites: favoriteObject,
        };
        console.log("test1", favoriteObject);
        res.render("favorites", templateVars);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  //RENDERS CREATE MAP PAGE
  router.get("/createmap", (req, res) => {
    const templateVars = { user_email: req.session.email };
    res.render("create", templateVars);
  });

  //RENDERS VIEW MAP PAGE
  // router.get("/viewmap/:id", (req, res) => {
  //   req.params.id;
  //   res.send("<p>VIEW MAP PAGE</p>");
  // });
  // ------------------------------------------------------------------Post
  //RENDERS MY PROFILE PAGE
  router.get("/profile", (req, res) => {
    if (!req.session.user_id) {
      res.redirect("/displays");
      return;
    }

    let templateVars = { user_email: req.session.email };

    db.query(
      `
    SELECT maps.name FROM maps
    JOIN favorites ON maps.id = favorites.map_id
    JOIN users ON users.id = favorites.user_id
    WHERE users.id = $1;
    `,
      [req.session.user_id]
    )
      .then((response) => {
        templateVars.fav_maps = response.rows;

        db.query(
          `
      SELECT name, id FROM maps
      WHERE user_id = $1;
      `,
          [req.session.user_id]
        )
          .then((response) => {
            templateVars.created_maps = response.rows;
            res.render("displays_profile", templateVars);
          })
          .catch((err) => err.message);
      })
      .catch((err) => err.message);
  });

  router.get("/initialize_map", (req, res) => {
    const templateVars = { user_email: req.session.email };
    res.render("map_initialize", templateVars);
  });

  router.post("/initialize_map", (req, res) => {
    let title = req.body.title;
    let description = req.body.description;
    let image = req.body.image;
    let food_category = req.body.category;

    db.query(
      `INSERT INTO maps (name, description, pic_URL, category, user_id)
    VALUES ($1,$2,$3,$4,$5) RETURNING *`,
      [title, description, image, food_category, req.session.user_id]
    ).then((response) => {
      let map_id = response.rows[0].id;
      const templateVars = { user_email: req.session.email, title, map_id };
      res.render("create", templateVars);
    });
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
