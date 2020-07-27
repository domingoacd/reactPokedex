import React from 'react';
import { ThemeProvider } from 'styled-components';

const theme = {
  mainFontColor: '#383838',
  mainTitleColor: '#8F8F8F',
  lightGray: '#676767',
  barGray: '#C4C4C4',
  whiteTone: '#FFF',
  lightBlue: '#8DDDE2',
  blue: '#00C1CD',
  grass: '#78C850',
  insect: '#A8B820',
  normal: '#A8A878',
  fire: '#F08030',
  fighting: '#C03028',
  water: '#6890F0',
  flying: '#A890F0',
  poison: '#A040A0',
  electric: '#F8D030',
  ground: '#E0C068',
  psychic: '#F85888',
  rock: '#B8A038',
  ice: '#98D8D8',
  dragon: '#7038F8',
  ghost: '#705898',
  dark: '#705848',
  steel: '#B8B8D0',
  fairy: '#EE99AC'
};
const Theme = ({children}) => {
  return (
    <ThemeProvider theme={theme}>{children}</ThemeProvider>
  )
}

export default Theme;