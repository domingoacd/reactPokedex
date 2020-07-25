import React from 'react';
import {BrowserRouter, Link, Switch, Route} from 'react-router-dom';
import styled from 'styled-components';
import Home from './components/Home';

function App() {
  const AppWrapper = styled.div`
    width: 100%;
    min-height: 100vh;
    background-color: ${props=> props.theme.whiteTone}
  `;

  return (
    <BrowserRouter>
      <AppWrapper>
        <Switch>
          <Route exact path="/" component={Home}/>
        </Switch>
      </AppWrapper>    
    </BrowserRouter>
  );
}

export default App;
