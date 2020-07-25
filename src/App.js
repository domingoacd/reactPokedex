import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import styled from 'styled-components';
import Home from './components/Home';

function App() {
  const AppWrapper = styled.div`
    width: 100%;
    min-width: 320px;
    max-width: 40rem;
    min-height: 100vh;
    margin: 0 auto;
    padding: 2rem;
    background-color: ${props => props.theme.whiteTone};
  `;

  return (
    <BrowserRouter>
      <AppWrapper>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route exact path="/pokemon" component={Home}/>
        </Switch>
      </AppWrapper>    
    </BrowserRouter>
  );
}

export default App;
