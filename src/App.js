import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import styled from 'styled-components';
import PokemonInfo from './components/PokemonInfo';
import Home from './components/Home';

function App() {
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

  return (
    <BrowserRouter>
      <AppWrapper>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route exact path="/pokemon" component={PokemonInfo}/>
        </Switch>
      </AppWrapper>    
    </BrowserRouter>
  );
}

export default App;
