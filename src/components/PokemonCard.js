import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';

function PokemonCard({ url, name }) {
  const [details, setDetails] = useState({
    sprites: [],
    abilities: [],
  });

  fetch(url).then(response => response.json()).then(data => {
    setDetails({
      sprites: data.sprites,
      abilities: data.abilities,
    });
  });

  return (
    <div>
      pokemon card
      {/* <h1>pokemon card</h1> */}
      <Card id="pokemonCard">
        <Card.Img src={details.sprites.front_default} />
        <Card.Title>{name}</Card.Title>
        <Card.Text as="div">
          <ul>
            {details.abilities.map((a) => {
              return <li>{a.ability.name}</li>;
            })}
          </ul>
        </Card.Text>
      </Card>
    </div>
  );
}

export { PokemonCard };