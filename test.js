const mysql = require("mysql");
const bcrypt = require("bcrypt");
const axios = require("axios");
const crypto = require("crypto");

let hash = crypto.createHash("sha1");

let user = { password: "Password123!", email: "oscar.baelde@student.ehb.be" };

hash.update(user.password, "utf-8");

let hashed = hash.digest("hex");
let smallhash = hashed.slice(0, 5);
let endHash = hashed.slice(5).toUpperCase();
let result = [];

const connection = mysql.createConnection({
  host: "81.164.34.143",
  user: "software_security",
  password: "mm4PUZELEe*wr3^5*B1BpZ1h31b@#s",
  database: "software_security",
});

axios
  .get("https://api.pwnedpasswords.com/range/" + smallhash)
  .then((response) => {
    let res = response.data.split("\n");
    //console.log(res);
    res.forEach((element) => {
      result.push(element.split(":"));
    });

    result.forEach((item) => {
      if (item[1].split("\r", 1) > 300) {
        if (item[0] === endHash) {
          return callback(
            new ValidationError("password-unsafe", "This password is not safe.")
          );
        }
      }
    });

    connection.connect();

    const query = "INSERT INTO users SET ?";

    bcrypt.hash(user.password, 10, function (err, hash) {
      if (err) return callback(err);

      const insert = {
        password: hash,
        email: user.email,
      };

      connection.query(query, insert, function (err, results) {
        if (err) return callback(err);
        if (results.length === 0) return callback();
        callback(null);
      });
    });
  });
