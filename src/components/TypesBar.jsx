import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const TypesContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 40rem;
  height: ${props => props.stretch ? '20rem' : '2.5rem'};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  border-radius: 20px;
  font-size: 1.5rem;
  margin-top: 1.5rem;
  padding: 0 1.5rem;
  transition: height 0.5s;
  color: ${props => props.theme.whiteTone};
  background-color: ${props => props.theme.blue};
`;

const ArrowIcon = styled.img`
  width: 1.2rem;
  height: 1.2rem;
  filter: invert(1);
  transform: ${props => props.stretchIsActive ? 'rotate(90deg)' : 'rotate(-90deg)'};
  transition: transform 0.5s;
`;

const Upper = styled.div`
  width: 100%;
  height: ${props => (props.stretchIsActive ? '20%' : '100%')};
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`;

const Lower = styled.div`
  width: 100%;
  height: ${props => (props.stretchIsActive ? '80%' : '0%')};
  visibility: ${props => (props.stretchIsActive ? 'visible' : 'hidden')};
  display: flex;
  flex-wrap: wrap;
  overflow: hidden;
  transition: height 0.5s;
`;

const Type = styled.div`
  height: 1.2rem;
  display: grid;
  place-content: center;
  text-align: center;
  border-radius: 20px;
  padding: 0.7rem;
  margin: 0.4rem;
  font-size: 1rem;
  color: ${(props) => props.theme.whiteTone};
  background-color: ${(props) => props.theme[`${props.type}`]};
`;
const TypesBar = ({types}) => {
  const [show, showTypes] = useState(false);

  function changeContainerHeight(e) {
    showTypes(!show);
  }

  function getTypes() {
    let allTypes;
    if (types.results) {
      allTypes = types.results.map(type => {
        return (
          <Link to={`types/${type.name}`} key={`tp-${type.name}`}>
            <Type type={type.name}>{type.name}</Type>
          </Link>
        );
      });
    } else {
      allTypes = 'Error - there are no pokemon types';
    }

    return allTypes;

  }

  console.log(types);
  return (
    <TypesContainer stretch={show}>
      <Upper onClick={changeContainerHeight} stretchIsActive={show}>
        <p>Pokemon types</p>
        <ArrowIcon src="./images/next.svg" stretchIsActive={show}></ArrowIcon>
      </Upper>
      <Lower stretchIsActive={show}>
        {getTypes()}
      </Lower>
    </TypesContainer>
  );
}

export default TypesBar;