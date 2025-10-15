#!/usr/bin/env node

const inquirer = require("inquirer");

const printFiveMoves = async (pokemonName) => {
    const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
    );
    
    if (!response.ok) {
        console.error(`Error: Could not find Pokémon named "${pokemonName}".`);
        return; 
    }

    const pokemon = await response.json();
    
    const moves = pokemon.moves.map(({ move }) => move.name);
    
    console.log(`\nFirst 5 moves for ${pokemonName}:`);
    console.log(moves.slice(0, 5));
};

const prompt = inquirer.createPromptModule();

prompt([
    {
        type: "input",
        name: "pokemon",
        message: "Enter a pokemon name to view its first 5 moves (e.g., pikachu):",
    },
]).then((answers) => {
    const pokemon = answers.pokemon.toLowerCase();
    printFiveMoves(pokemon);
});