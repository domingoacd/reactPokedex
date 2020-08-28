import React, {useEffect, useState} from 'react';
import { useLocation, Link } from 'react-router-dom';
import styled from 'styled-components';
import api from '../api-fetcher';
import Pokemon from './Pokemon';
import Loader from './Loader';

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
  mask: ${props => `url("/reactPokedex/images/${props.type}.svg")`};
  mask-size: contain;
  background: ${props => props.theme[props.type]};
`

const BottomLoader = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  max-width: 20rem;
  height: 1.5rem;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  font-size: 0.7rem;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  color: ${props => props.theme.whiteTone};
  background-color: ${props => props.theme.barGray};
`;

const BottomSpinner = styled.div`
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  border: 2px solid ${props => props.theme.barGray};
  border-top: 2px solid ${props => props.theme.whiteTone};
  border-left: 2px solid ${props => props.theme.whiteTone};
  animation: spin 1s linear infinite;
`;

const TypeSection = () => {
  const typeToFetch = useLocation().pathname.split('/')[2];
  const [pokemons, setPokemons] = useState([]);
  const [showBottomLoad, setBottomLoad] = useState(false);
  const [currentOffset, setOffset] = useState(0);
  const [currentPokemons, setCurrentPokemons] = useState([]);

  useEffect(() => {
    window.addEventListener('scroll', detectScroll);
    return () => {
      window.removeEventListener('scroll', detectScroll);
    }
  }, [detectScroll]);

  function getNextPokemons() {
    let currPoks = pokemons.slice(currentOffset, currentOffset + 20);
    let cont = 0;
    let retrivedData = [];
    let sortedPokemons = [];
    currPoks.forEach(async pok => {
      await fetch(pok.pokemon.url)
        .then(res => res.json())
        .then(data => {
          cont++;
          retrivedData.push(data);
          if (cont === 20 || (currentPokemons.length + cont) === pokemons.length) {
            
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
  }

  useEffect(() => {
    api.getPokemonsByType(typeToFetch)
      .then(data => {
        setPokemons(data.pokemon);
        getNextPokemons()
      });
    
  }, [pokemons.length]) ;
  
  function detectScroll(e) {
    const isPageBottom =
      (window.pageYOffset + window.innerHeight) === document.documentElement.scrollHeight;
    let nextPokemons = [];
    if (isPageBottom && currentPokemons.length < pokemons.length) {
      setBottomLoad(true);
      getNextPokemons();
    } else {
      setBottomLoad(false);
    }
  }
  function displayBottomLoader() {
    return (
      <BottomLoader>
        <BottomSpinner></BottomSpinner>
        <p>Loading more pokemons</p>
      </BottomLoader>
    );
  }

  function insertPokemons() {
    return currentPokemons.map(pok => {
      return (
        <Link key={`link-${pok.name}`} to={`/pokemon/${pok.name}`}>
          <Pokemon key={pok.name} data={pok} />
        </Link>);
    });
  }
  
  return (
    currentPokemons.length > 0 ?
    <MainContainer>
      <TypeImage type={typeToFetch}/>
      <Title type={typeToFetch}>
        {typeToFetch}
        <br />
        <SubTitle>Pokemons</SubTitle>
      </Title>
      {insertPokemons()}
      {showBottomLoad ? displayBottomLoader() : ''}
    </MainContainer>
    : <Loader />
  )
}

export default TypeSection;