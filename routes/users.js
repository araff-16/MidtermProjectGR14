/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();

//const bcrypt = require("bcryptjs");

module.exports = (db) => {
  //SENDS ALL USER DATA
  router.get("/", (req, res) => {
    db.query(`SELECT * FROM users;`)
      .then((data) => {
        const users = data.rows;
        res.json({ users });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  // RENDER LOGIN
  router.get("/login", (req, res) => {
    if (req.session.user_id) {
      res.redirect("/displays");
      return;
    }
    const templateVars = { user_email: req.session.email };
    res.render("user_login", templateVars);
  });

  //POST LOGIN INFO
  router.post("/login", (req, res) => {
    const { email, password } = req.body;

    console.log(email);
    db.query(
      `
    SELECT * FROM users
    WHERE email = $1;
    `,
      [email]
    )
      .then((response) => {
        console.log(response.rows[0]);
        if (!response.rows[0]) {
          res.send("THIS ACCOUNT DOES NOT EXIST");
        } else if (response.rows[0].password === password) {
          req.session.user_id = response.rows[0].id;
          req.session.email = response.rows[0].email;
          res.redirect("/user/profile");
        } else {
          res.send("INCORRECT PASSWORD");
        }
      })
      .catch((err) => err.message);
  });

  //RENDER CREATE ACCOUNT
  router.get("/register", (req, res) => {
    if (req.session.user_id) {
      res.redirect("/user/profile");
      return;
    }

    const templateVars = { user_email: req.session.email };
    res.render("user_register", templateVars);
  });

  //POST NEW ACCOUNT INFO
  router.post("/register", (req, res) => {
    const { fname, lname, email, password } = req.body;

    db.query(
      `
   SELECT * FROM users
   WHERE email = $1;
    `,
      [email]
    )

      .then((response) => {
        if (response.rows[0]) {
          res.send("THIS ACCOUNT ACCOUNT ALREADY EXISTS");
        } else {
          console.log("NEW ACCOUNT CREATED****************************");
          db.query(
            `
        INSERT INTO users (email,first_name,last_name, password)
        VALUES ($1,$2,$3,$4)
        RETURNING *;
        `,
            [email, fname, lname, password]
          )
            .then((response) => {
              //Set up cookie with user ids
              req.session.user_id = response.rows[0].id;
              req.session.email = response.rows[0].email;
              res.redirect("/user/profile");
            })
            .catch((err) => err.message);
        }
      })
      .catch((err) => err.message);
  });

  router.post("/logout", (req, res) => {
    delete req.session.user_id;
    delete req.session.email;
    res.redirect("/map/list");
  });

  router.get("/profile", (req, res) => {
    if (!req.session.user_id) {
      res.redirect("/map/list");
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
            res.render("user_profile", templateVars);
          })
          .catch((err) => err.message);
      })
      .catch((err) => err.message);
  });

  router.get("/favorites", (req, res) => {
    //NEED TO QUERY TO THE DATABASE TO GET ALL favorited maps for user
    //WILL STORE IN TEMPLATVARS AND SEND WITH RENDER

    if (!req.session.user_id) {
      res.redirect("/map/list");
      return;
    }


    db.query(
      `
      SELECT * FROM maps
      JOIN favorites ON maps.id = favorites.map_id
      JOIN users ON users.id = favorites.user_id
      WHERE users.id = $1;
      `,
      [req.session.user_id]
    )
      .then((data) => {
        let favoriteObject = data.rows;
        const templateVars = {
          user_email: req.session.email,
          userFavorites: favoriteObject,
        };
        console.log('testeroo', templateVars.userFavorites)
        res.render("user_favorites", templateVars);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  //STORE DATA WHEN SOMEONE FAVORITED
  router.delete("/favorites", (req, res) => {
    const { user_id } = req.session;
    const mapId = req.body.mapId;

    console.log("AM I HITTING", user_id, parseInt(mapId))
    const queryString = `
    DELETE FROM favorites
    WHERE user_id = $1 AND map_id = $2
    `;
    const queryValues = [user_id, parseInt(mapId)];
    db.query(queryString, queryValues).then(() => {
      console.log("***********************HITTING THIS ONE FOR DELETE*********");
      res.status(200);
    });
  });
  //POST TO UPDATE FAVORITES TABLE
  router.post("/favorites", (req, res) => {
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
      console.log("***********************HITTING THIS ONE FOR ADD*********")
      res.status(200);
    });
  });




  return router;
};
