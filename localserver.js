var express = require("express");
var app = express();
var jwt = require("express-jwt");
var jwks = require("jwks-rsa");
var bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql");

var port = process.env.PORT || 3000;

const connection = mysql.createConnection({
  host: "192.168.0.149",
  user: "software_security",
  password: "mm4PUZELEe*wr3^5*B1BpZ1h31b@#s",
  database: "software_security",
});
connection.connect();
var jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: "https://final-work.eu.auth0.com/.well-known/jwks.json",
  }),
  audience: "http://localhost:3000",
  issuer: "https://final-work.eu.auth0.com/",
  algorithms: ["RS256"],
});

app.use(jwtCheck);
app.use(bodyParser.json());
app.use(cors());

app.post("/klachten", function (req, res) {
  console.log("ja");
  console.log(req.body.text);
  res.send("Sucess");

  let query = "INSERT INTO klachten SET ?";
  let text = { klacht: req.body.text };
  connection.query(query, text, function (err, result) {
    if (err) console.log(err);
  });
});

app.listen(port);
