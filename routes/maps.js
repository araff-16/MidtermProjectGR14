const { response, json } = require("express");
const express = require("express");
const router = express.Router();

module.exports = (db) => {

  //RENDERS VIEW MAP PAGE
  router.get("/view/:id", (req, res) => {
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

      res.render('map_view', templateVars)
    })
    .catch(error=>console.log(error))
  });

  // RENDERS THE INITIALIZE MAP FORM
  router.get("/initialize", (req, res) => {
    const templateVars = { user_email: req.session.email };
    res.render("map_initialize", templateVars);
  });

  // COLLECTS DATA FROM MAP INITIALIZE FORM AND CREATES DB ENTRY
  router.post("/initialize", (req, res) => {
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
      res.render("map_create", templateVars);
    });
  });

  //RENDERS CREATE MAP PAGE
  // NOT REALLY NEEDED - WE DIRECT STRAIGHT FROM INITIALIZE
  router.get("/create", (req, res) => {
    const templateVars = { user_email: req.session.email };
    res.render("map_create", templateVars);
  });

  // INSERT ALL POIS INTO DB AFTER MAP IS CREATED
  router.post("/create", (req, res) => {
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

  // RENDERS MAP LIST VIEW
  router.get("/list", (req, res) => {
    const queryString = `
    SELECT *
    FROM maps
    `;
    db.query(queryString)
      .then((mapData) => {
        // mapObject will be an array of Objects, loop through in the ejs file
        let mapObject = mapData.rows;


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
                const mapCopy = { ...map };
                mapCopy["favorited"] = false;
                return mapCopy;
              }
            });
            const templateVars = {
              user_email: req.session.email,
              maplistObject: mapsWithFavoriteData,
            };
            res.render("map_list", templateVars);
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

  router.get("/edit/:id", (req, res) => {
    const mapId = req.params.id;

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
          res.render("map_edit", templateVars)
        })

      })

    })
    .catch(error=>console.log(error))
  });

  return router;
};
