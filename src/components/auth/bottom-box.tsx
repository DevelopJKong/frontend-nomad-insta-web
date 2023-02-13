import { BaseBox } from "../shared";
import styled from "styled-components";
import { Link } from "react-router-dom";

const SBottomBox = styled(BaseBox)`
   padding: 20px 0px;
   text-align: center;
   a {
      font-weight: 600;
      margin-left: 5px;
      color: ${(props) => props.theme.accent};
   }
`;
const BottomBox = ({ cta, link, linkText }: { cta: string; link: string; linkText: string }) => {
   return (
      <SBottomBox>
         <span>{cta}</span>
         <Link to={link}>{linkText}</Link>
      </SBottomBox>
   );
};

export default BottomBox;
