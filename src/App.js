import React, {useState, useEffect} from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import styled from 'styled-components';
import api from './api-fetcher';
import TypeSection from './components/TypeSection';
import PokemonInfo from './components/PokemonInfo';
import Home from './components/Home';
import NotFound from './components/404.jsx';

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
  const [pokemonsTypes, updatePokemonsTypes] = useState([]);

  useEffect(() => {
    api.getAllPokemons().then((pokemons) => {
      updateNextPokemons(pokemons.next);
      updatePokemons(pokemons.results);
    });

    api.getAllTypes().then((types) => {
      updatePokemonsTypes(types);
    });
  }, []);

  return (
    <BrowserRouter>
      <AppWrapper>
        <Switch>
          <Route
            exact
            path="/reactPokedex"
            render={props => (
              <Home
                {...props}
                pokemonsToFetch={pokemons}
                next={nextPokemons}
                pokemonsTypes={pokemonsTypes}
              />
            )}
          />
          <Route path="/pokemon" component={PokemonInfo} />
          <Route path="/types" component={TypeSection} />
          <Route component={NotFound} />
        </Switch>
      </AppWrapper>
    </BrowserRouter>
  );
}

export default App;
