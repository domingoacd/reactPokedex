import React, {useState, useEffect} from 'react';
import Pokemon from './Pokemon';
import styled from 'styled-components';

const HomeWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 auto;
  `;

const MainTitle = styled.h1`
    text-align: center;
    font-size: 3.5rem;
    font-weight: 400;
    color: ${(props) => props.theme.mainTitleColor};
  `;

const SearchBar = styled.input`
    width: 90%;
    max-width: 30rem;
    height: 2.8rem;
    margin-top: 2rem;
    padding: 0 1rem;
    border-radius: 20px;
    font-size: 1.2rem;
    color: ${(props) => props.theme.mainFontColor};
    border: 2px solid ${(props) => props.theme.lightBlue};
    background-color: ${(props) => props.theme.whiteTone};
    :focus {
      outline: none;
    }
  `;

const TypesContainer = styled.div`
    width: 100%;
    max-width: 40rem;
    height: 2.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 20px;
    font-size: 1.5rem;
    margin-top: 1.5rem;
    padding: 0 1.5rem;
    color: ${(props) => props.theme.whiteTone};
    background-color: ${(props) => props.theme.blue};
  `;

const Home = ({ pokemonsToFetch }) => {

  const [pokemonsData, setPokemonsData] = useState([]);

  useEffect(() => {
    const allPokemonData = [];
    let cont = 0;
    if (pokemonsToFetch) {
      pokemonsToFetch.forEach(async pokemon => {
        await fetch(pokemon.url)
          .then(res => res.json())
          .then(data => {
            cont++;
            allPokemonData.push(data)
            if(cont === 20) {
              setPokemonsData(allPokemonData);
            }
          });
      });
    }
  }, [pokemonsToFetch]);

  function handlePokemons() {
    console.log(pokemonsData)
    return pokemonsData.map( pokemon => <Pokemon key={pokemon.name} data={pokemon}/>)
    
  }
  return(
    <HomeWrapper>
      <MainTitle>
        POKEDEX
      </MainTitle>
      <SearchBar placeholder="Search pokemon"/>
      <TypesContainer>
        Types
      </TypesContainer>
      {handlePokemons()}

    </HomeWrapper>
  );
}

export default Home;