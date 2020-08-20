const express = require('express');
const router = express.Router();
const {getDb} = require("../helpers/db");

router.put('/', function(req, res, next) {


  // Read username and password from request body
  const { email, password, username } = req.body;

  // Filter user from the users array by username and password
  const db = getDb();
  //TODO: This is using a callback function, while it works it should be using async/await notation
  db.query(
    `INSERT INTO user (username, email, password, role) VALUES ('${username}', '${email}', '${password}','member');`,
    (err) => {
      let body

      if (err && err.code === 'ER_DUP_ENTRY') {
        //  If there is dupe entry in DB
        res.status(409);
        body = 'User with that email already exist'

      } else if (err){
          throw err
      }
      else{
          res.status(200);
          body = 'User successfully made'
      }

      res.send(body);
  });
});

module.exports = router;
