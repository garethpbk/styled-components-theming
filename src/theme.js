import { lighten, rgba } from 'polished';

const theme = {
  colors: {
    primary: '#248f8d',
    secondary: '#1e6075',
    accent: '#605063',
    white: '#fafafa',
    black: '#323232',
  },
  sizes: {
    sm: '1rem',
    md: '2rem',
    lg: '3rem',
  },
  breakpoints: {
    sm: '576px',
    md: '768px',
    lg: '992px',
    xl: '1200px',
  },
};

export const getBreakpoint = breakpoint => props => props.theme.breakpoints[breakpoint];

export const getColor = color => props => props.theme.colors[color];

export const getSize = size => props => props.theme.sizes[size];

export const lightenColor = (color, amount) => props => lighten(amount, props.theme.colors[color]);

export const textShadow = (h = 0, v = 0, blur = 0, color = 'black', amount = 1) => props =>
  `${h}px ${v}px ${blur}px ${rgba(props.theme.colors[color], amount)}`;

export default theme;
