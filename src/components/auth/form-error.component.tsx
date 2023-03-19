import styled from 'styled-components';

const SFormError = styled.div`
   color: tomato;
   font-weight: 600;
   font-size: 12px;
   margin: 4% 0px 2% 0px;
`;

const FormError = ({ message }: { message?: string }) => {
   return message === '' || !message ? null : <SFormError>{message}</SFormError>;
};

export default FormError;
