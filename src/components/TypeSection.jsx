import React, {useEffect, useState} from 'react';
import { useLocation, Link } from 'react-router-dom';
import styled from 'styled-components';
import api from '../api-fetcher';
import Pokemon from './Pokemon';

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  position: relative;
  color: ${props => props.theme[props.type]};
  text-transform: capitalize;
  font-size: 3rem;
  text-align: center;
  line-height: 1.7rem;
`;
const SubTitle = styled.span`
  color: ${props => props.theme.mainFontColor};
  font-size: 1rem;
  font-weight: 400;
`;

const TypeImage = styled.div`
  position: fixed;
  right: -5rem;
  width: 20rem;
  height: 20rem;
  opacity: 0.5;
  mask: ${props => `url("/images/${props.type}.svg")`};
  mask-size: contain;
  background: ${props => props.theme[props.type]};
`
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
    <MainContainer>
      <TypeImage type={typeToFetch}/>
      <Title type={typeToFetch}>
        {typeToFetch}
        <br />
        <SubTitle>Pokemons</SubTitle>
      </Title>
      {insertPokemons()}
    </MainContainer>
  )
}

export default TypeSection;