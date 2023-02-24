import React, { useState, useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { PokemonCard } from './components/PokemonCard';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Container from 'react-bootstrap/Container';

const LIMIT = 150;
const pokeApi = `https://pokeapi.co/api/v2/pokemon/?limit=${LIMIT}`;

function App() {
  const [pokemon, setPokemon] = useState([]);
  const [filteredPokemon, setFilteredPokemon] = useState([]);

  function handleChange(ev) {
    // store input value
    const val = ev.target.value;
    // create regex to match the input value
    const regex = new RegExp(val, "gi");
    // filter pokemon matches
    const filteredPokeTemp = pokemon.filter((onePoke) => {
      return onePoke.name.match(regex);
    });
    setFilteredPokemon(filteredPokeTemp);
  }

  useEffect(() => {
    fetch(pokeApi).then((response) => response.json()).then((data) => {
      // console.log(data.results)
      setPokemon(data.results);
      setFilteredPokemon(data.results);
    });
  }, []);

  return (
    <div data-testid="app">
      <Navigation />

      {/* <h1>Pokemon should appear here</h1> */}
      <InputGroup>
        <FormControl placeholder="search for pokemon" onChange={handleChange}></FormControl>
      </InputGroup>
      <Container id="pokemonCards">
        {filteredPokemon.map((singlePoke, idx) => {
          return <PokemonCard key={idx} name={singlePoke.name} url={singlePoke.url} />;
        })}
      </Container>
    </div>
  );
}

export { App };