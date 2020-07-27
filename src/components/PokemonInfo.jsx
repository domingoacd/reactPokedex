import React from 'react';
import styled from 'styled-components';
import grass from '../assets/img/hoja.svg';

const PokemonInfo = () => {

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
    background-color: ${(props) => props.theme.grass};

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
    color: ${(props) => props.theme.whiteTone};
    background-color: ${(props) => props.theme.grass};
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
    color: ${props => props.theme.grass};
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

  const EvolutionImage= styled.img`
    width: 100%;
    height: auto;
  `;

  const EvolutionName = styled.p`
    font-size: 0.7rem;
    text-align: center;
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
    width: 50%;
    height: 100%;
    background-color: ${props => props.theme.grass};
  `;
  const NextPok = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  `;
  const PrevPok = styled.div`
    display: flex;
    visibility: hidden;
    flex-direction: column;
    align-items: flex-start;
  `;

  const NextPokImage = styled.img`
    width: 3rem;
  `;

  const NextPokeTitle = styled.p`
    color: ${props => props.theme.lightGray};
  `;

  const BottomSection = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
  `;

 
  return(
    <PokemonInfoContainer>
      <Circle>
        <PokemonIcon src={grass} />
      </Circle>

      <PokemonMainInfo>
        <PokemonName> Bulbasaur </PokemonName>
        <PokemonNumber>#001</PokemonNumber>
      </PokemonMainInfo>

      <PokemonImage src={'https://pokeres.bastionbot.org/images/pokemon/1.png'}/>

      <PokemonTypesContainer>
        <PokemonType>Grass</PokemonType>
      </PokemonTypesContainer>

      <PokemonDescription>
        Reprehenderit in adipisicing sint fugiat veniam aliquip. Culpa deserunt velit aliquip nostrud. Fugiat cupidatat adipisicing aliqua Lorem.  
      </PokemonDescription>

      <PokemonSection>
        <PokTitle>
          Evolution
        </PokTitle>
        <Container>
          <ColWrapper>
            <EvolutionImage src={'https://pokeres.bastionbot.org/images/pokemon/1.png'}/>
            <EvolutionName>Bulbasaur</EvolutionName>
            <EvolutionCondition></EvolutionCondition>
          </ColWrapper>
          <ColWrapper>
            <EvolutionImage src={'https://pokeres.bastionbot.org/images/pokemon/2.png'}/>
            <EvolutionName>Ivysaur</EvolutionName>
            <EvolutionCondition>Lv. 16</EvolutionCondition>
          </ColWrapper>
          <ColWrapper>
            <EvolutionImage src={'https://pokeres.bastionbot.org/images/pokemon/3.png'}/>
            <EvolutionName>Venasaur</EvolutionName>
            <EvolutionCondition>Lv. 32</EvolutionCondition>
          </ColWrapper>
        </Container>
      </PokemonSection>
      
      <PokemonSection>
        <PokTitle>Biology</PokTitle>
        <Container>
          <ColWrapper>
            <SizeTitle>Weight</SizeTitle>
            <Size>32.5 Kg</Size>
          </ColWrapper>
          <ColWrapper>
            <SizeTitle>Height</SizeTitle>
            <Size>0.7 m</Size>
          </ColWrapper>
        </Container>
      </PokemonSection>

      <PokemonSection>
        <PokTitle>Base Stats</PokTitle>
        <StatsContainer>
          <Stat>
            <StatName>HP</StatName>
            <StatNumber>80</StatNumber>
            <StatBar>
              <BarProgress></BarProgress>
            </StatBar>
          </Stat>
          <Stat>
            <StatName>Defense</StatName>
            <StatNumber>80</StatNumber>
            <StatBar>
              <BarProgress></BarProgress>
            </StatBar>
          </Stat>
        </StatsContainer>
      </PokemonSection>
      <BottomSection>
        <PrevPok>
          <NextPokeTitle>Previous</NextPokeTitle>
          <NextPokImage src={'https://pokeres.bastionbot.org/images/pokemon/2.png'} />
        </PrevPok>
        <NextPok>
          <NextPokeTitle>Next</NextPokeTitle>
          <NextPokImage src={'https://pokeres.bastionbot.org/images/pokemon/2.png'} />
        </NextPok>
      </BottomSection>
    </PokemonInfoContainer>
  )
}

export default PokemonInfo;