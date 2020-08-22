const express = require('express');
const router = express.Router();
const {getDb} = require("../helpers/db");
const {isJwtValid} = require("../helpers/jwt")

router.put('/', function(req, res, next) {


  const { jwt,
          title,
          longFormDescription,
          cardType,
          kanbanBoard,
          //TODO: Items needed can wait for now
          itemsNeeded,
          minutesToCompletion } = req.body;

  if (!isJwtValid(jwt)){
      console.log("JWT not valid")
      res.status(401);
      res.send("User not authorized");
      return;
  }
    console.log("JWT is valid")


  // Filter user from the users array by username and password
  const db = getDb();

  //TODO: This is using a callback function, while it works it should be using async/await notation
  const queryCallback = (err) => {
      console.log("DB call finished, in callback")
    let body = ""

    if (err) throw err

    res.status(200);
    body = 'Card successfully made'

    res.send(body);
  };

  console.log("About to run DB Query")

  db.query(
    `INSERT INTO card (title, description, type, kanbanBoard, timeToCompletion, owner, boardColumn) VALUES 
        ('${title}', '${longFormDescription}', '${cardType}', '${kanbanBoard}', '${parseInt(minutesToCompletion)}', 'David', 0);`,
      queryCallback);
    console.log("Finished sending call to DB")

});

module.exports = router;
