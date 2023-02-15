import styled from "styled-components";

export const BaseBox = styled.div`
   background-color: ${({ theme }) => theme.bgColor};
   border: 1px solid ${({ theme }) => theme.borderColor};
   width: 100%;
`;

export const FatLink = styled.span`
   font-weight: 600;
   color: rgb(142, 142, 142);
`;

export const Input = styled.input<{ hasError: boolean }>`
   width: 100%;
   border-radius: 3px;
   padding: 7px;
   background-color: ${({ theme }) => theme.bgColor};
   border: 0.5px solid ${({ theme, hasError }) => (hasError ? "tomato" : theme.borderColor)};
   margin-top: 5px;
   box-sizing: border-box;
   &::placeholder {
      font-size: 12px;
      color: ${({ theme }) => theme.fontColor};
   }
   &:focus {
      border-color: ${({ theme }) => theme.accent};
   }
`;

export interface IForm {
   email: string;
   password: string;
   wrongPassword?: string;
   result?: string;
}

export interface ISignUpForm extends IForm {
   firstName: string;
   lastName: string;
   username: string;
   confirmationPassword: string;
}
