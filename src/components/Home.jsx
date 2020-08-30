import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import Pokemon from './Pokemon';
import styled from 'styled-components';
import TypesBar from './TypesBar';

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

const SearchBar = styled.form`
    width: 90%;
    max-width: 30rem;
    height: 2.8rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 2rem;
    padding: 0 1rem;
    border-radius: 20px;
    color: ${(props) => props.theme.mainFontColor};
    border: 2px solid ${(props) => props.theme.lightBlue};
    background-color: ${(props) => props.theme.whiteTone};
  `;

const SearchInput = styled.input`
  width: 90%;
  height: 100%;
  font-size: 1.2rem;
  border: none;
  color: inherit;
  :focus {
    outline: none;
  }
`;

const SearchButton = styled.button`
  width: 2rem;
  height: 70%;
  border: none;
  opacity: 0.5;
  cursor: pointer;
  background-size: 100% 100%;
  background-image: url("/reactPokedex/images/buscar.svg");
  background-color: transparent;
  :focus {
    outline: none;
  }
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

const ErrorSearchBox = styled.div`
  position: fixed;
  z-index: 100;
  top: ${props => props.show ? '1rem' : '-100rem'};
  right: 2rem;
  width: 10rem;
  height: 5.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 0.5rem;
  border-radius: 10px;
  transition: top 0.5s;
  color: #fff;
  background-color: #f36262;
  box-shadow: 0px 0px 10px rgba(255,0,0,0.5);
`;

const Home = ({ pokemonsToFetch, next, pokemonsTypes }) => {

  const [pokemonsData, setPokemonsData] = useState([]);
  const [showBottomLoad, setBottomLoad] = useState(false);
  const [pokemonsLink, setPokemonsLink] = useState(false);
  const [pokemonToSearch, setPokemonToSearch] = useState('');
  const [searchError, showErrorSearch] = useState(false);

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
        <Link key={`link-${pokemon.name}`} to={`/reactPokedex/pokemon/${pokemon.name}`}>
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

  function searchPokemon(e) {
    e.preventDefault();

    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonToSearch.toLowerCase()}`)
      .then(res => res.json())
      .then(data => window.location.href = `/pokemon/${data.species.name}`)
      .catch(e => {
        showErrorSearch(true);
        setTimeout(() => {
          showErrorSearch(false)
        }, 2000);
      });
  }
  return (
    <HomeWrapper>
      <ErrorSearchBox show={searchError}> Ups! Pokemon not found.</ErrorSearchBox>
      <MainTitle>POKEDEX</MainTitle>
      <SearchBar onSubmit={searchPokemon}>
        <SearchInput placeholder="Search pokemon by name or number" onChange={e => setPokemonToSearch(e.target.value)}/>
        <SearchButton type="submit"></SearchButton>
      </SearchBar>
      <TypesBar types={pokemonsTypes}></TypesBar>
      {handlePokemons()}
      {showBottomLoad ? displayBottomLoader() : ''}
    </HomeWrapper>
  );
}

export default Home;