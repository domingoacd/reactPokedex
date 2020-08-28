import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NotFound = () => {
  return(
    <Container>
      Oops! Page not found.
    </Container>

  );
}

export default NotFound;