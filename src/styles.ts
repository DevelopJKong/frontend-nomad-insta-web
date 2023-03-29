import { DefaultTheme, createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

export const lightTheme: DefaultTheme = {
   accent: '#0095f6',
   fontColor: 'rgb(38, 38, 38)',
   bgColor: '#FAFAFA',
   borderColor: 'rgb(219, 219, 219)',
   color: {
      dark: '2c2c2c',
   },
   fontSize: {
      small: '12px',
      medium: '14px',
      large: '16px',
   },
};

export const darkTheme: DefaultTheme = {
   accent: '#0095f6',
   fontColor: 'white',
   bgColor: '#353b48',
   borderColor: 'rgb(219, 219, 219)',
   color: {
      dark: '2c2c2c',
   },
   fontSize: {
      small: '12px',
      medium: '14px',
      large: '16px',
   },
};
export const GlobalStyles = createGlobalStyle`
    ${reset}
    input {
      all:unset;
    }
    * {
      box-sizing:border-box;
    }
    body {
        background-color: ${({ theme }) => theme.bgColor};
        font-size:${({ theme }) => theme.fontSize.medium};
        font-family:'Open Sans', sans-serif;
        color: ${({ theme }) => theme.fontColor};
    }
    a {
      color:inherit;
      text-decoration: none;
    }
`;
