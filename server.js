let express = require("express");
let app = express();
let jwt = require("express-jwt");
let jwks = require("jwks-rsa");
let mysql = require("mysql");

const connection = mysql.createConnection({
  host: process.env.DATABASE_IP,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_TABLE,
});

var port = process.env.API_PORT;

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

app.use(jwtCheck);

app.post("/complaint", function (req, res) {
  res.send("Secured Resource");
  console.log("complaint posted");
});

app.listen(port);
