import 'styled-components';

declare module 'styled-components' {
   export interface DefaultTheme {
      accent: string;
      bgColor: string;
      fontColor: string;
      borderColor: string;
      color: {
         dark: string;
      };
      fontSize: {
         small: string;
         medium: string;
         large: string;
      };
   }
}
