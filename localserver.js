var express = require("express");
var app = express();
var jwt = require("express-jwt");
var jwks = require("jwks-rsa");
var bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql");
const dotenv = require("dotenv");
let csurf = require("csurf");
const cookieParser = require("cookie-parser");

dotenv.config();

var port = process.env.PORT;

const connection = mysql.createConnection({
  host: process.env.SERVER_DATABASE_IP,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_TABLE,
});
connection.connect();
var jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: "https://final-work.eu.auth0.com/.well-known/jwks.json",
  }),
  audience: "https://api.essentialgp.org",
  issuer: "https://final-work.eu.auth0.com/",
  algorithms: ["RS256"],
});

app.use(cors());
app.use(jwtCheck);
app.use(bodyParser.json());
app.use(cookieParser());
app.use(csurf());

app.post("/klachten", function (req, res) {
  let query = "INSERT INTO klachten SET ?";
  let text = { klacht: req.body.text };
  connection.query(query, text, function (err, result) {
    if (err) console.log(err);
  });
  res.send("Sucess");
});
app.delete("/deletemyuser", function (req, res) {
  console.log(req.body);
});

app.listen(port);
