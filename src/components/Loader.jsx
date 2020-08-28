import React , {useState}from 'react';
import styled, {keyframes} from 'styled-components';

const Container = styled.div`
  position: fixed;
  z-index: 500;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 4rem;
  color: #fff;
  background-color: rgba(0,0,0,0.2);
`;

const animationSpin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Image = styled.img`
  margin-top: 1rem;
  height: 15rem;
  animation: ${animationSpin} linear infinite 1s; 

`;
const Loader = ({show}) => {
  return (
    <Container>
      Loading!!
      <Image src='/reactPokedex/images/pokemon.svg'/>
    </Container>
  );
}

export default Loader;
