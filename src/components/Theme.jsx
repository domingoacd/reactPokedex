import React from 'react';
import { ThemeProvider } from 'styled-components';

const theme = {
  mainFontColor: '#383838',
  lightGray: '#676767',
  whiteTone: '#FFF',
  
};
const Theme = ({children}) => {
  return (
    <ThemeProvider theme={theme}>{children}</ThemeProvider>
  )
}

export default Theme;