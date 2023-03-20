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
   export interface ThemedStyledComponentsModule<T> {
      createGlobalStyle(strings: TemplateStringsArray, ...interpolations: SimpleInterpolation[]): React.ComponentClass;
   }

   export function createGlobalStyle(strings: TemplateStringsArray, ...interpolations: SimpleInterpolation[]): React.ComponentClass;
}
