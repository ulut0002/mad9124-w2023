"use strict";
const express = require("express");
const cars = require("./data.js");

const app = express();

app.get("/", (req, res) => {
  res.send(
    `<p>This is main page. 
        Go to <a href="http://localhost:3000/api/cars">localhost:3000/api/cars</a>
    
    </p>`
  );
});
app.get("/api/cars", (req, res) => {
  //   res.json({ data: cars });
  res.send({ data: cars });
});

app.listen(3000, () => {
  console.log("Listening port 3000 for requests");
});
