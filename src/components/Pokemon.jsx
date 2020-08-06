import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import grass from '../assets/img/hoja.svg';

const PokemonContainer = styled.div`
    position: relative;
    width: 100%;
    max-width: 25rem;
    height: 6rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 2rem;
    padding-right: 1rem;
    border-radius: 15px;
    cursor: pointer;
    background-color: ${(props) => props.theme[`${props.type}`]};

    @media screen and (min-width: 400px){
      padding-right: 2rem;
    }
  `;

const ContainerLeftSide = styled.div`
    position: relative;
    height: 100%;
    width: 70%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-left: 1rem;
    overflow: hidden;

    @media screen and (min-width: 400px){
      padding-left: 2rem;
    }
  `;
const PokemonName = styled.h3`
    position: relative;
    font-size: 1.6rem;
    font-weight: 400;
    text-transform: capitalize; 
    color: ${(props) => props.theme.whiteTone};
  `;

const PokemonNumber = styled.p`
    position: relative;
    font-size: 0.8rem;
    margin-top: 0.1rem;
    color: ${(props) => props.theme.mainFontColor};
  `;

const PokemonImage = styled.img`
    position: relative;
    bottom: 0.8rem;
    width: 6rem;
    
    @media screen and (min-width: 400px){
      bottom: 0.9rem;
      width: 7rem;
    }
  `;

const PokemonTypeIcon = styled.img`
    position: absolute;
    height: 8rem;
    bottom: -1rem;
    left: 0px;
    filter: invert(1);
    opacity: 0.2;
  `;

const Pokemon = (props) => {
  console.log(props.data)

  return( 
    <PokemonContainer type={props.data.types[0].type.name}>
      <ContainerLeftSide>
        <PokemonTypeIcon src={grass}/>
        <PokemonName>{props.data.name}</PokemonName>
        <PokemonNumber>#{props.data.order}</PokemonNumber>
      </ContainerLeftSide>
      <PokemonImage src={`https://pokeres.bastionbot.org/images/pokemon/${props.data.order}.png`}/>
    </PokemonContainer>
  );
}

export default Pokemon;