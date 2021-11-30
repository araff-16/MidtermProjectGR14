/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

//const bcrypt = require("bcryptjs");

module.exports = (db) => {

  //SENDS ALL USER DATA
  router.get("/", (req, res) => {
    db.query(`SELECT * FROM users;`)
      .then(data => {
        const users = data.rows
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
    const {
      email,
      password
    } = req.body

    console.log(email)
    db.query(`
    SELECT * FROM users
    WHERE email = $1;
    `, [email])
    .then(response => {
      console.log(response.rows[0])
      if (!response.rows[0]) {
        res.send("THIS ACCOUNT DOES NOT EXIST")
      }
      else if (response.rows[0].password === password){
        req.session.user_id = response.rows[0].id
        req.session.email = response.rows[0].email;
        res.send("Login Successful")
      }else {
        res.send("INCORRECT PASSWORD")
      }
    })
    .catch(err => err.message)
  });

  //RENDER CREATE ACCOUNT
  router.get("/register", (req,res) => {
    res.render("users_register")
  });

  //POST NEW ACCOUNT INFO
  router.post("/register", (req,res) => {
    //NEED TO CHECK IF USER EMAIL EXITS IN DB
    const {
      fname,
      lname,
      email,
      password
    } = req.body

   db.query(`
   SELECT * FROM users
   WHERE email = $1;
    `, [email])

    .then(response => {
      if (response.rows[0]) {
        res.send("THIS ACCOUNT ACCOUNT ALREADY EXISTS")
      }
      else {
        console.log("NEW ACCOUNT CREATED****************************")
        db.query(`
        INSERT INTO users (email,first_name,last_name, password)
        VALUES ($1,$2,$3,$4)
        RETURNING *;
        `, [email,fname,lname,password])
        .then (response => {
          //Set up cookie with user ids
          req.session.user_id = response.rows[0].id;
          req.session.email = response.rows[0].email;
          res.send(`<p>NEW ACCOUNT CREATED<p>`)
        })
        .catch(err => err.message)
      }
    })
    .catch(err => err.message)
  });

  return router;
};
