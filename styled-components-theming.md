# Functional styled-components Theme Helpers

One of the most popular CSS-in-JS solutions out there is [styled-components](https://github.com/styled-components/styled-components), and one of its killer features is the ability to easily create themes for your React applications. There are many ways to work with themes, and in this article I'll share my method that revolves around creating reusable helper functions to simplify the process and reduce the amount of code involved in styling. We'll also touch on using the [polished](https://github.com/styled-components/polished) library to add some pizzazz and further functionality to a `styled-components` theme.

My motivation for this pattern was to achieve the same ease that Sass and Stylus offer for writing functional CSS; I believe that the combination of `styled-components` and `polished` comes really close.

## Project Setup

Set up a new `create-react-app` project and add the dependencies (or add to an existing project) - go ahead and delete everything except `App.js` and `index.js` in _/src_:

```

yarn create react-app my-cool-project
yarn add styled-components polished
```

`styled-components` themes work with the Context API via a `<ThemeProvider />` component. In `index.js`, import the component and theme and wrap `<App />`:

```

import { ThemeProvider } from 'styled-components';
import theme from './theme';

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>,
  document.getElementById('root')
);
```

`<ThemeProvider /> takes one prop, an object called`theme`; create the`theme.js` file that was imported and set up the values:

```

const theme = {
  colors: {
    primary: '#248f8d',
    secondary: '#61ada0',
    accent: '#605063',
    white: '#fafafa',
  },
  sizes: {
    sm: '1rem',
    md: '2rem',
    lg: '3rem',
  },
};

export default theme;
```

Let's use our theme colors and sizes in `<App />` in a styled component:

```

import React, { Component } from 'react';
import styled from 'styled-components';

const Title = styled.h1`
  background-color: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.white};
  font-size: ${props => props.theme.sizes.lg};

  padding: 25px;
`;

class App extends Component {
  render() {
    return (
      <div>
        <Title>styled-components Is Awesome</Title>
      </div>
    );
  }
}

export default App;
```

Hm. The syntax is kind of...bulky - we have the use the name of the property of the property of the theme object of the props each time. How can we simplify this?

Functions to the rescue! Let's create some reuseable helpers functions to make it easier to access theme values. In `theme.js`:

```

export const getColor = color => props => props.theme.colors[color];
```

Now we can import and use this function anytime we need a color in a styled component:

```

import { getColor } from './theme';

const Title = styled.h1`
  background-color: ${getColor('primary')};
  color: ${getColor('white')};
  font-size: ${props => props.theme.sizes.lg};

  padding: 25px;
`;
```

Let's do the same for sizes:

```

export const getSize = size => props => props.theme.sizes[size];
```

```

import { getColor, getSize } from './theme';

const Title = styled.h1`
  background-color: ${getColor('primary')};
  color: ${getColor('white')};
  font-size: ${getSize('lg')};

  padding: 25px;
`;
```

![title](https://s3-us-west-1.amazonaws.com/random-pictures/styled-components+theming+article/title.png)

Alright, maybe it's not **that** much less code right now, but this pattern really shines when you're dealing with complex themes and nested theme objects. It puts the power of JavaScript functions in your hands for managing theme styling.

Lastly let's use some `polished` features via helper functions in `theme.js`:

```

import { lighten, rgba } from 'polished';

export const lightenColor = (color, amount) => props => lighten(amount, props.theme.colors[color]);
```

In `<App />` let's use this on a new styled component:

```

const Content = styled.p`
  background-color: ${lightenColor('secondary', 0.2)};
  color: ${getColor('white')};
  font-size: ${getSize('md')};

  padding: 25px;
`;
```

If you've used Sass's lighten feature, this should feel familiar.

Why can't we just import `lighten` directly into the component? Try it - `${lighten(getColor('secondary'), '0.2')}` - it isn't parsed correctly. Keeping it in the theme means it's only imported from `polished` once, and doesn't rely on having direct access to `getColor` in the component.

One more - let's utilize the `rgba` feature from polished for easily controllable text shadows:

```

export const textShadow = (h = 0, v = 0, blur = 0, color = 'black', amount = 1) => props =>
  `${h}px ${v}px ${blur}px ${rgba(props.theme.colors[color], amount)}`;
```

`rgba` automatically converts hex values to rgb values (exactly like the Sass function of the same name). This is great because it means we don't have to re-declare color values in different formats; the availability of default parameters is also a nice tool for setting base values. Add to `<Content />`:

```

const Content = styled.p`
  background-color: ${lightenColor('secondary', 0.2)};
  color: ${getColor('white')};
  font-size: ${getSize('md')};
  text-shadow: ${textShadow(2, 2, 3, 'accent', 0.5)};

  padding: 25px;
`;
```

![content](https://s3-us-west-1.amazonaws.com/random-pictures/styled-components+theming+article/content.png)

That wraps up my method of theming `styled-components`; functions make for a powerful, infinitely expandable system. In the example project you'll also find a simple grid component created with breakpoint values in the theme.
