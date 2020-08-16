import React, {useEffect, useState} from 'react';
import { useLocation, Link } from 'react-router-dom';
import api from '../api-fetcher';
import Pokemon from './Pokemon';

const TypeSection = () => {
  const typeToFetch = useLocation().pathname.split('/')[2];
  const [pokemons, setPokemons] = useState([]);
  const [currentOffset, setOffset] = useState(0);
  const [currentPokemons, setCurrentPokemons] = useState([]);
  
  useEffect(() => {
    api.getPokemonsByType(typeToFetch)
      .then(data => {
        setPokemons(data.pokemon);

        let currPoks = data.pokemon.slice(currentOffset, currentOffset + 20);
        let cont = 0;
        let retrivedData = [];
        let sortedPokemons = [];

        currPoks.forEach(async pok => {
          await fetch(pok.pokemon.url)
            .then(res => res.json())
            .then(data => {
              cont++;
              retrivedData.push(data);
              if (cont === 20) {
                sortedPokemons = currentPokemons.concat(retrivedData.sort((a, b) => {
                  if (a.id > b.id) {
                    return 1;
                  } else if (a.id === b.id) {
                    return 0;
                  } else {
                    return -1;
                  }
                }));
                setCurrentPokemons(sortedPokemons);
                setOffset(currentOffset + 20);
              }
            });
        });
      });

    
  }, []) ;

  function getPokemons() {}

  function insertPokemons() {
    return currentPokemons.map(pok => {
      return (
        <Link key={`link-${pok.name}`} to={`/pokemon/${pok.name}`}>
          <Pokemon key={pok.name} data={pok} />
        </Link>);
    });
  }

  return (
    <div>{insertPokemons()}</div>
  )
}

export default TypeSection;