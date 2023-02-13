import styled from "styled-components";

export const BaseBox = styled.div`
   background-color: white;
   border: 1px solid ${(props) => props.theme.borderColor};
   width: 100%;
`;

export const FatLink = styled.span`
   font-weight: 600;
   color: rgb(142, 142, 142);
`;

export const Input = styled.input`
   width: 100%;
   border-radius: 3px;
   padding: 7px;
   background-color: #fafafa;
   border: 0.5px solid ${(props) => props.theme.borderColor};
   margin-top: 5px;
   box-sizing: border-box;
   &::placeholder {
      font-size: 12px;
   }
`;
