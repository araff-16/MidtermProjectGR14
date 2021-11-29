/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

module.exports = (db) => {

  //SENDS ALL USER DATA
  router.get("/", (req, res) => {
    db.query(`SELECT * FROM users;`)
      .then(data => {
        const users = data.rows;
        res.json({ users });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  // RENDER LOGIN
  router.get("/login", (req,res) => {
    //JUST NEED TO RENDER THE LOGIN PAGE
    res.render("users_login")
  });

  //POST LOGIN INFO
  router.post("/login", (req,res) => {
    res.send("HELLO YOU HAVE LOGGED IN")
  });

  //RENDER CREATE ACCOUNT
  router.get("/register", (req,res) => {
    res.render("users_register")
  });

  //POST NEW ACCOUNT INFO
  router.post("/register", (req,res) => {
    //NEED TO CHECK IF USER EMAIL EXITS IN DB
    //NEED TO INSERT NEW USER INTO DATABSE
    //AND AUTOMATICALLY LOG USER IN
    res.send("HELLO YOU HAVE CREATED AN ACCOUNT")
  });

  return router;
};
