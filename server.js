let express = require("express");
let app = express();
let jwt = require("express-jwt");
let jwks = require("jwks-rsa");
let mysql = require("mysql");

const connection = mysql.createConnection({
  host: "81.164.34.143",
  user: "software_security",
  password: "mm4PUZELEe*wr3^5*B1BpZ1h31b@#s",
  database: "software_security",
});

var port = process.env.PORT || 8080;

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
