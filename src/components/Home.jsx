import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
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

const Home = ({ pokemonsToFetch, next }) => {

  const [pokemonsData, setPokemonsData] = useState([]);
  const [showBottomLoad, setBottomLoad] = useState(false);
  const [pokemonsLink, setPokemonsLink] = useState(false);
  useEffect(() => {
    window.addEventListener('scroll', detectScroll);
    return () => {
      window.removeEventListener('scroll', detectScroll);
    }
  }, [detectScroll]);

  function insertPokemons(pokemonsToInsert, nextPokemons = next) {
    const allPokemonData = [];
    let sortedPokemons =  [];
    let cont = 0;
    pokemonsToInsert.forEach(async pokemon => {
      await fetch(pokemon.url)
        .then(res => res.json())
        .then(data => {
          cont++;
          allPokemonData.push(data)
          if (cont === 20) {
            sortedPokemons = pokemonsData.concat(allPokemonData.sort((a, b) => {
              if (a.id > b.id) {
                return 1;
              } else if (a.id === b.id) {
                return 0;
              } else {
                return -1;
              }
            }));
            setPokemonsData(sortedPokemons);
            setPokemonsLink(nextPokemons);
          }
        });
    });
  }

  useEffect(() => {
    if (pokemonsToFetch) {
      insertPokemons(pokemonsToFetch);

    }
  }, [pokemonsToFetch]);
  
  function handlePokemons() {
    return pokemonsData.map(pokemon => {
      return(
        <Link key={`link-${pokemon.name}`} to={`/pokemon/${pokemon.name}`}>
          <Pokemon key={pokemon.name} data={pokemon}/>
        </Link>);
    })
    
  }

  function detectScroll(e) {
    const isPageBottom = 
      (window.pageYOffset + window.innerHeight) === document.documentElement.scrollHeight;

    if (isPageBottom) {
      setBottomLoad(true);
      fetch(pokemonsLink)
        .then(res => res.json())
        .then(data => {
          // debugger;
          insertPokemons(data.results, data.next);
          console.log(data)
        });
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
      {showBottomLoad ? 
        displayBottomLoader() 
        :
        ""
      }
    </HomeWrapper>
  );
}

export default Home;