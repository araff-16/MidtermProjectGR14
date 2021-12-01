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
    db.query(`SELECT * FROM maps;`)
      .then((data) => {
        //mapObject will be an array of Objects, loop through in the ejs file
        let mapObject = data.rows;
        const templateVars = {
          user_email: req.session.email,
          maplistObject: mapObject,
        };
        // console.log(data.rows);
        console.log("test4", mapObject);

        // for (let mapInfo of data.rows) {
        //   console.log("test1", mapInfo.name);
        //   console.log("test2", mapInfo.id);
        // }
        res.render("maplist", templateVars);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  //RENDER FAVORITES FOR PARTICULAR USER
  router.get("/favorites", (req, res) => {
    //NEED TO QUERY TO THE DATABASE TO GET ALL favorited maps for user
    //WILL STORE IN TEMPLATVARS AND SEND WITH RENDER
    const templateVars = { user_email: req.session.email };
    res.render("favorites", templateVars);
  });

  //RENDERS CREATE MAP PAGE
  router.get("/createmap", (req,res) => {

    //CREATE TABLE IN DB AND PASS in template vars
    const templateVars = {user_email: req.session.email}
    res.render("create", templateVars);
  });

  //RENDERS VIEW MAP PAGE
  router.get("/viewmap/:id", (req, res) => {
    req.params.id;
    res.send("<p>VIEW MAP PAGE</p>");
  });
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
      SELECT name FROM maps
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


  router.get("/initialize_map", (req,res) => {
    const templateVars = {user_email: req.session.email}
    res.render("map_initialize", templateVars);
  })

  router.post("/initialize_map", (req,res) => {


    const templateVars = {user_email: req.session.email,title: req.body.title}
    res.render("create", templateVars);
  })



  router.post("/submit_map", (req,res) => {

    console.log(req.body.text)

    res.redirect('/displays')


  })




  return router;
};
