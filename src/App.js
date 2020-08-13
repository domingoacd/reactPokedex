import React, {useState, useEffect} from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import styled from 'styled-components';
import api from './api-fetcher';
import PokemonInfo from './components/PokemonInfo';
import Home from './components/Home';

const AppWrapper = styled.div`
  position: relative;
  width: 100%;
  min-width: 320px;
  max-width: 40rem;
  min-height: 100vh;
  margin: 0 auto;
  padding: 2rem;
  overflow: hidden;
  background-color: ${props => props.theme.whiteTone};
`;

function App() {

  const [pokemons, updatePokemons] = useState([]);
  const [nextPokemons, updateNextPokemons] = useState(false);
  
  useEffect(() => {
    api.getAllPokemons().then((pokemons) => {
      console.log(pokemons.next)
      updateNextPokemons(pokemons.next);
      updatePokemons(pokemons.results);
    });
  }, []);

  return (
    <BrowserRouter>
      <AppWrapper>
        <Switch>
          <Route
            exact
            path="/"
            render={props => (
              <Home {...props} pokemonsToFetch={pokemons} next={nextPokemons} />
            )}
          />
          <Route path="/pokemon" component={PokemonInfo} />
        </Switch>
      </AppWrapper>
    </BrowserRouter>
  );
}

export default App;
