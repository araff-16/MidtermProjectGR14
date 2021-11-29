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
    res.send("<p>LOGIN PAGE</p>")
  });

  //POST LOGIN INFO
  router.post("/login", (req,res) => {
    //NEED TO CHECK IF USERNNAME AND PASSWORD IS VALID IN DB
    //IF SO WE LOG THE USER IN
  });

  //RENDER CREATE ACCOUNT
  router.get("/newaccount", (req,res) => {
    res.send("<p>CREATE ACCOUNT</p>")
  });

  //POST NEW ACCOUNT INFO
  router.post("/newaccount", (req,res) => {
    //NEED TO CHECK IF USER EMAIL EXITS IN DB
    //NEED TO INSERT NEW USER INTO DATABSE
    //AND AUTOMATICALLY LOG USER IN
  });

  return router;
};
