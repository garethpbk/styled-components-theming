import React, { Component } from 'react';
import styled from 'styled-components';

// import styled components
import Grid from './Grid';

// import theme helpers
import { getColor, getSize, lightenColor, textShadow } from './theme';

const Title = styled.h1`
  background-color: ${getColor('primary')};
  color: ${getColor('white')};
  font-size: ${getSize('lg')};

  padding: 25px;
`;

const Content = styled.p`
  background-color: ${lightenColor('secondary', 0.2)};
  color: ${getColor('white')};
  font-size: ${getSize('md')};
  text-shadow: ${textShadow(2, 2, 3, 'accent', 0.5)};

  padding: 25px;
`;

const Info = styled.a`
  background-color: ${lightenColor('secondary', 0.5)};
  color: ${getColor('black')};
  font-size: ${getSize('sm')};
  text-decoration: none;

  display: block;

  padding: 5px;

  &:hover {
    color: ${getColor('primary')};
    text-decoration: underline;
  }
`;

class App extends Component {
  render() {
    return (
      <Grid>
        <Title>styled-components Is Awesome</Title>
        <Content>Write powerful themes with styled-components and polished! Just like the Sass of yore!</Content>
        <Info href="https://gareth.cool">By Gareth Bk</Info>
      </Grid>
    );
  }
}

export default App;
