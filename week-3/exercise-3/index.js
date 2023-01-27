const express = require("express");
const cars = require("./cars.js");

const app = express();

app.use(express.json()); //to read request.body

app.get("/api/cars", (req, res) => {
  res.status(200).json({ data: cars });
});

app.get("/api/cars/:carId", (req, res) => {
  const car = cars.find((car) => car.id === parseInt(req.params.carId));
  res.send({ data: car });
});

app.post("/api/cars", (req, res) => {
  const { make, model, colour } = req.body;
  const newCar = {
    id: Date.now(),
    make,
    model,
    colour,
  };
  cars.push(newCar);
  res.status(201).send({ data: newCar });
});

app.patch("/api/cars/:carId", (req, res) => {
  const id = parseInt(req.params.carId);
  const index = cars.findIndex((car) => car.id === id);
  if (index < 0) {
    res.status(404).send({
      errors: [
        {
          status: "Not found",
          code: "404",
          title: "Resource does not exist",
          description: `We could not find a car with id: ${id}`,
        },
      ],
    });
  } else {
    const { id, ...theRest } = req.body;
    const updatedCar = Object.assign({}, cars[index], theRest);
    cars[index] = updatedCar;
    res.send({ data: updatedCar });
  }
});

app.put("/api/cars/:carId", (req, res) => {
  const id = parseInt(req.params.carId);
  const index = cars.findIndex((car) => car.id === id);
  if (index < 0) {
    res.status(404).send({
      errors: [
        {
          status: "Not found",
          code: "404",
          title: "Resource does not exist",
          description: `We could not find a car with id: ${id}`,
        },
      ],
    });
  } else {
    const { make, model, colour } = req.body;
    const updatedCar = { id, make, model, colour };
    cars[index] = updatedCar;
    res.send({ data: updatedCar });
  }
});

app.delete("/api/cars/:carId", (req, res) => {
  const id = parseInt(req.params.carId);
  const index = cars.findIndex((car) => car.id === id);
  if (index < 0) {
    res.status(404).send({
      errors: [
        {
          status: "Not found",
          code: "404",
          title: "Resource does not exist",
          description: `We could not find a car with id: ${id}`,
        },
      ],
    });
  } else {
    // const { make, model, colour } = req.body;
    // const updatedCar = { id, make, model, colour };
    const deleted = cars.splice(index, 1);
    res.send({ data: deleted[0] });
  }
});

const port = process.env.port || 3000;
app.listen(port, () => console.log(`Server listening on port ${port} ...`));
