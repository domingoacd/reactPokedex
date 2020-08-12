import React, {useEffect, useState} from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

const PokemonInfoContainer = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
  `;

const Circle = styled.div`
    position: absolute;
    top: -11rem;
    width: 160%;
    height: 25rem;
    border-radius: 50%;
    overflow: hidden;
    background-color: ${(props) => props.theme[`${props.type}`]};

    @media screen and (min-width: 450px){
      width: 120%;
    }
  `;

const PokemonIcon = styled.img`
    position: absolute;
    bottom: 1rem;
    left: 2rem;
    width: 11rem;
    height: auto;
    opacity: 0.25;
    filter: invert(1);
  `;

const PokemonMainInfo = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    margin-bottom: 1rem;
  `;

const PokemonName = styled.h1`
    font-size: 2.5rem;
    font-weight: 400;
    text-transform: capitalize;
    color: ${(props) => props.theme.whiteTone};
  `;

const PokemonNumber = styled.p`
    font-size: 1.4rem;
    color: ${(props) => props.theme.whiteTone};
  `;

const PokemonImage = styled.img`
    position: relative;
    width: 90%;
    max-width: 18rem;
    margin-bottom: 1rem;
  `;

const PokemonTypesContainer = styled.div`
    display: flex;
    margin-bottom: 1rem;
  `;

const PokemonType = styled.a`
    width: 7rem;
    height: 2.5rem;
    display: grid;
    place-items: center;
    border-radius: 20px;
    font-size: 1.3rem;
    text-transform: capitalize;
    color: ${(props) => props.theme.whiteTone};
    background-color: ${(props) => props.theme[`${props.type}`]};
  `;

const PokemonDescription = styled.p`
    width: 90%;
    max-width: 18rem;
    margin-bottom: 2rem;
    color: ${props => props.theme.mainFontColor};
  `;

const PokemonSection = styled.section`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 2rem;
  `;

const PokTitle = styled.h2`
    font-weight: 400;
    text-align: center;
    margin-bottom: 1rem;
    filter: brightness(85%);
    color: ${props => props.theme[`${props.type}`]};
  `;

const Container = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-around;
  `;

const ColWrapper = styled.div`
    width: 30%;
    max-width: 8rem;
    display: flex;
    flex-direction: column;
    align-items: center;
  `;

const EvolutionImage = styled.img`
    width: 100%;
    height: auto;
    margin-bottom: 0.2rem;
  `;

const EvolutionName = styled.p`
    font-size: 0.8rem;
    text-align: center;
    text-transform: capitalize;
    color: ${props => props.theme.mainFontColor};
  `;

const EvolutionCondition = styled.p`
    font-size: 0.7rem;
    text-align: center;
    color: ${props => props.theme.mainFontColor};
  `;

const SizeTitle = styled.h3`
    font-size: 0.9rem;
    font-weight: 400;
    margin-bottom: 0.4rem;
    color: ${props => props.theme.mainFontColor};
  `;
const Size = styled.p`
    font-size: 1.5rem;
    color: ${props => props.theme.mainFontColor};
  `;

const StatsContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
  `;

const Stat = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
  `;

const StatName = styled.p`
    font-size: 0.8rem;
    width: 20%;
    font-weight: 400;
    text-transform: capitalize;
    color: ${props => props.theme.lightGray};
  `;

const StatNumber = styled.p`
    width: 15%;
    font-weight: bold;
    color: ${props => props.theme.mainFontColor};
  `;

const StatBar = styled.div`
    position: relative;
    width: 65%;
    height:0.8rem;
    border-radius: 20px;
    overflow: hidden;
    background-color: ${props => props.theme.barGray};
  `;

const BarProgress = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: ${props => (props.progress * 100 / 255) + '%'};
    height: 100%;
    background-color: ${props => props.theme[`${props.type}`]};
  `;
  
const PokemonInfo = (props) => {
  const location = useLocation();
  const pokemonToShow = location.pathname.split('/')[2];
  const [ pokemonData, setPokemonData ] = useState("");
  const [ pokemonEvolutions, setpokemonEvolutions ] = useState("");
  
  
  useEffect(() => {
    Promise.all([
      fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonToShow}`),
      fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonToShow}/`)
    ])
      .then(responses => Promise.all(responses.map(res => res.json())))
      .then(data => {
        const evolution_url = data[1].evolution_chain.url;
        fetch(evolution_url)
          .then(res => res.json())
          .then(evolutions => {
            setPokemonData(data[0]);
            setpokemonEvolutions(evolutions);
          });
      });
  }, [pokemonToShow]);
  
  function getPokemonTypes() {
    let types = [];
    pokemonData.types.forEach(type => {
      types.push(<PokemonType key={type.type.name} type={type.type.name}>{type.type.name}</PokemonType>);
    })

    return types;
  }

  function getEvolutionIdFromUrl(url) {
    const urlChunks = url.split('/');
    return urlChunks[urlChunks.length - 2];
  }

  function getEvolutions() {
    let evolutionToGet = [pokemonEvolutions.chain];
    let allEvolutions = [];

    
    
    do {
      let currentEvolution = evolutionToGet[0].species;
      let evolutionId = getEvolutionIdFromUrl(currentEvolution.url);
      allEvolutions.push(
        <ColWrapper key={currentEvolution.name}>
          <EvolutionImage src={`https://pokeres.bastionbot.org/images/pokemon/${evolutionId}.png`} />
          <EvolutionName>{currentEvolution.name}</EvolutionName>
          <EvolutionCondition></EvolutionCondition>
        </ColWrapper>
      );

      evolutionToGet = evolutionToGet[0].evolves_to;
    } while (evolutionToGet.length > 0);

    return allEvolutions;
  }

  function getPokemonStats() {
    const stats = pokemonData.stats;
    const statConvertion = {
      'special-attack' : 'sp. atk',
      'special-defense' : 'sp. def',
    }
    return stats.map(stat => {
     return (<Stat key={stat.stat.name}>
        <StatName>
          {statConvertion[stat.stat.name] || stat.stat.name}
        </StatName>
        <StatNumber>{stat.base_stat}</StatNumber>
        <StatBar>
          <BarProgress progress={stat.base_stat} type={pokemonData.types[0].type.name}></BarProgress>
        </StatBar>
      </Stat>)
    });
  }

  return(
    pokemonData && pokemonEvolutions?
    <PokemonInfoContainer>
      
      <Circle type={pokemonData.types[0].type.name}>
          <PokemonIcon src={`/images/${pokemonData.types[0].type.name}.svg`} />
      </Circle>

      <PokemonMainInfo>
        <PokemonName> {pokemonData.name} </PokemonName>
        <PokemonNumber>{`#${pokemonData.id}`}</PokemonNumber>
      </PokemonMainInfo>

      <PokemonImage src={`https://pokeres.bastionbot.org/images/pokemon/${pokemonData.id}.png`}/>

      <PokemonTypesContainer>
        {getPokemonTypes()}
      </PokemonTypesContainer>

      <PokemonDescription>
        Reprehenderit in adipisicing sint fugiat veniam aliquip. Culpa deserunt velit aliquip nostrud. Fugiat cupidatat adipisicing aliqua Lorem.  
      </PokemonDescription>

      <PokemonSection>
        <PokTitle type={pokemonData.types[0].type.name}>
          Evolution
        </PokTitle>
        <Container>
          {getEvolutions()}
        </Container>
      </PokemonSection>
      
      <PokemonSection>
        <PokTitle type={pokemonData.types[0].type.name}>Biology</PokTitle>
        <Container>
          <ColWrapper>
            <SizeTitle>Weight</SizeTitle>
            <Size>{(pokemonData.weight * 0.1).toFixed(1)} Kg</Size>
          </ColWrapper>
          <ColWrapper>
            <SizeTitle>Height</SizeTitle>
            <Size>{(pokemonData.height * 0.1).toFixed(1)} m</Size>
          </ColWrapper>
        </Container>
      </PokemonSection>

      <PokemonSection>
        <PokTitle type={pokemonData.types[0].type.name}>Base Stats</PokTitle>
        <StatsContainer>
          {getPokemonStats()}
        </StatsContainer>
      </PokemonSection>
      {/* <BottomSection>
        <PrevPok>
          <NextPokeTitle>Previous</NextPokeTitle>
          <NextPokImage src={'https://pokeres.bastionbot.org/images/pokemon/2.png'} />
        </PrevPok>
        <NextPok>
          <NextPokeTitle>Next</NextPokeTitle>
          <NextPokImage src={'https://pokeres.bastionbot.org/images/pokemon/2.png'} />
        </NextPok>
      </BottomSection> */}
    </PokemonInfoContainer>
    : ""
  )
}

export default PokemonInfo;