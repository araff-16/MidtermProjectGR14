/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

module.exports = (db) => {

  //RENDER LIST VIEW OF ALL MAPS
  router.get("/", (req, res) => {

    const templateVars = {user_email: req.session.email}
    res.render("index", templateVars);
  });

  //RENDER FAVORITES FOR PARTICULAR USER
  router.get("/favorites", (req,res) => {
    //NEED TO QUERY TO THE DATABASE TO GET ALL favorited maps for user
    //WILL STORE IN TEMPLATVARS AND SEND WITH RENDER
    const templateVars = {user_email: req.session.email}
    res.send("<p>FAVORIRTES PAGE</p>")
  });

  //RENDERS CREATE MAP PAGE
  router.get("/createmap", (req,res) => {
    const templateVars = {user_email: req.session.email}
    res.render("create", templateVars);
  });

  //RENDERS VIEW MAP PAGE
  router.get("/viewmap", (req,res) => {
    res.send("<p>VIEW MAP PAGE</p>")
  });

  //RENDERS MY PROFILE PAGE
  router.post("/profile", (req,res) => {
    const templateVars = {user_email: req.session.email}
    res.send("<p>My Profile Page</p>")
  });

  return router;
};
