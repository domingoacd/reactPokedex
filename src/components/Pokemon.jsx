import React, {useState} from 'react';
import styled from 'styled-components';

const PokemonContainer = styled.div`
    position: relative;
    width: 80vw;
    max-width: 25rem;
    height: 6rem;
    display: ${props => props.show ? 'flex' : 'none'};
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
  const [show, showPokemon] = useState(true);

  function getPokemonImage() {
    const img = new Image();
    img.src = `https://pokeres.bastionbot.org/images/pokemon/${props.data.id}.png`;
    img.onerror = () =>  showPokemon(false);
    return <PokemonImage src={`https://pokeres.bastionbot.org/images/pokemon/${props.data.id}.png`} />;
  }

  return( 
    <PokemonContainer type={props.data.types[0].type.name} show={show}>
      <ContainerLeftSide>
        <PokemonTypeIcon src={`/reactPokedex/images/${props.data.types[0].type.name}.svg`}/>
        <PokemonName>{props.data.name}</PokemonName>
        <PokemonNumber>#{props.data.id}</PokemonNumber>
      </ContainerLeftSide>
      {getPokemonImage()}
    </PokemonContainer>
  );
}

export default Pokemon;