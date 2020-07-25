import React from 'react';
import ReactDOM from 'react-dom';
import Theme from './components/Theme';
import './base.css';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <Theme>
      <App />
    </Theme>
  </React.StrictMode>,
  document.getElementById('root')
);
