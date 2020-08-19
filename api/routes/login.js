const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

router.post('/', function(req, res, next) {

  //TODO: Pull this from Database, when it's made
  const users = [
    {
      email: 'David',
      password: 'pass',
      role: 'admin'
    }, {
      email: 'John',
      password: 'pass',
      role: 'member'
    }
  ];

  //  TODO: Probs should store somewhere else
  const accessTokenSecret = 'youraccesstokensecret';

  // Read username and password from request body
  const { email, password } = req.body;

  // Filter user from the users array by username and password
  const user = users.find(u => { return u.email === email && u.password === password });

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

module.exports = router;
