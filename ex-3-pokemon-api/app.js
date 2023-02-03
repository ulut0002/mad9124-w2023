"use strict";

//link : https://mad9124.github.io/w2023/deliverables/assignment1.html

const express = require("express");
const data = require("./data.js");
const pokemonList = data.pokemons;

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  // main page
  res.status(200).json({ data: { message: "Server is Running" } });
});

// Get all pokemons
app.get("/api/pokemon", (_, res) => {
  res.status(200).send({ data });
});

// Get one pokemon
app.get("/api/pokemon/:id", (req, res) => {
  let { id } = req.params;
  id = parseInt(id);

  const pokemon = pokemonList.filter((item) => item.id === id);
  if (!pokemon) {
    res.status(404).json({
      error: [
        {
          message: `Pokemon with id ${id} not found`,
        },
      ],
    });
    return;
  }
  res.status(200).json({ data: pokemon });
});

// Add new pokemon to the dataset
app.post("/api/pokemon", (req, res) => {
  const { name, type, abilities } = req.body;
  if (
    !name ||
    !type ||
    !abilities ||
    !Array.isArray(abilities) ||
    abilities.length === 0
  ) {
    res.status(400).json({ error: "Name, Type and Abilities are required" });
    return;
  }

  let lastID = 0;
  if (pokemonList.length > 0) {
    lastID = pokemonList.at(-1).id;
  }
  lastID = lastID + 1;
  const newPokemon = {
    id: lastID,
    name: name,
    type: type,
    abilities: abilities,
  };

  pokemonList.push(newPokemon);
  res.status(201).json({ data: newPokemon });
});

// Replace pokemon
app.put("/api/pokemon/:id", (req, res) => {
  let { id } = req.params;
  id = parseInt(id);

  const newPokemonData = req.body;

  const newPokemonObj = {
    id,
    ...newPokemonData,
  };

  const idx = pokemonList.findIndex((pokemon) => pokemon.id === id);
  if (idx < 0) {
    res.status(404).json({
      error: [
        {
          message: `Pokemon with id ${id} not found`,
        },
      ],
    });
    return;
  }

  pokemonList[idx] = newPokemonObj;
  res.status(200).json({ data: newPokemonObj });
});

// Update pokemon name, type or abilities
app.patch("/api/pokemon/:id", (req, res) => {
  let { id } = req.params;
  const updatedFields = req.body;
  id = parseInt(id);

  const idx = pokemonList.findIndex((pokemon) => pokemon.id === id);
  if (idx < 0) {
    res.status(404).json({
      error: [
        {
          message: `Pokemon with id ${id} not found`,
        },
      ],
    });
    return;
  }

  const pokemon = { ...pokemonList[idx], ...updatedFields };
  pokemonList[idx] = pokemon;
  res.status(200).json({ data: pokemon });
});

// Delete pokemon
app.delete("/api/pokemon/:id", (req, res) => {
  let { id } = req.params;
  id = parseInt(id);
  const idx = pokemonList.findIndex((pokemon) => pokemon.id === id);
  if (idx < 0) {
    res.status(404).json({
      error: [
        {
          message: `Pokemon with id ${id} not found`,
        },
      ],
    });
    return;
  }

  const [deletedPokemon] = pokemonList.splice(idx, 1);
  res.status(200).json({ data: deletedPokemon });
});

// app.listen();
const port = 3030;
app.listen(port, () => console.log(`Express is listening on port ${port} ...`));
