const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const {getDb} = require("../helpers/db");

router.post('/', function(req, res, next) {


  //  TODO: Probs should store somewhere else
  const accessTokenSecret = 'youraccesstokensecret';

  // Read username and password from request body
  const { email, password } = req.body;

  const db = getDb();
  let user = undefined
  //TODO: This is using a callback function, while it works it should be using async/await notation
  db.query(
    `SELECT username, role FROM project_tracker.user WHERE username="${email}" AND password="${password}" LIMIT 1;`,
    (err, rows) => {
      if (err) throw err
      if(rows.length>0) {
        console.log('User found ', rows[0])
        user = {
          email: rows[0].username,
          role: rows[0].role
        }
        console.log("User",user)
      }else{
        console.log(`No User found with username: '${email}' and password: '${password}'`)
      }
      if (user) {
        // Generate an access token
        const accessToken = jwt.sign({ username: user.email,  role: user.role }, accessTokenSecret);

        res.json({
          accessToken: accessToken,
          email: user.email,
          role: user.role
        });
      } else {
        res.status(403);
        res.send('Username or password incorrect');
      }
  });
});

module.exports = router;
