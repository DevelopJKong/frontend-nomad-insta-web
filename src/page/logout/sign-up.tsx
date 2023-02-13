import { faInstagram, faFacebookSquare } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import routes from "../../routes";
import AuthLayout from "../../components/auth/auth-layout";
import Separator from "../../components/auth/separator";
import Input from "../../components/auth/input";
import FormBox from "../../components/auth/form-box";
import BottomBox from "../../components/auth/bottom-box";
import styled from "styled-components";
import { FatLink } from "../../components/shared";
import Button from "../../components/auth/button";
import { Helmet } from "react-helmet-async";
import PageTitle from "../../components/page-title";

const HeaderContainer = styled.div`
   display: flex;
   flex-direction: column;
   align-items: center;
`;

const SubTitle = styled(FatLink)`
   margin-top: 10px;
   font-size: 16px;
   text-align: center;
`;

const FacebookLogin = styled.div`
   margin-top: 10px;
   width: 100%;
   height: 30px;
   color: white;
   background-color: ${(props) => props.theme.accent};
   border-radius: 3px;
   p {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      margin-left: 10px;
      font-weight: 600;
   }
`;

const FacebookWrapper = styled.div`
   display: flex;
   align-items: center;
   justify-content: center;
   height: 100%;
   font-weight: 600;
   cursor: pointer;
`;

const onFacebookSignUp = () => {
   console.log("Facebook Login");
};

function SignUp() {
   return (
      <AuthLayout>
         <PageTitle title='Sign Up' />
         <FormBox type={"SIGN_UP"}>
            <HeaderContainer>
               <FontAwesomeIcon icon={faInstagram} size='3x' />
               <SubTitle>Sign up to see photos and videos from your friends.</SubTitle>
            </HeaderContainer>
            <FacebookLogin>
               <FacebookWrapper onClick={onFacebookSignUp}>
                  <FontAwesomeIcon icon={faFacebookSquare} />
                  <p>&nbsp;Sign up with Facebook</p>
               </FacebookWrapper>
            </FacebookLogin>
            <Separator>
               <div></div>
               <span>Or</span>
               <div></div>
            </Separator>
            <form>
               <Input type='text' placeholder='Name' />
               <Input type='email' placeholder='Email' />
               <Input type='text' placeholder='Username' />
               <Input type='password' placeholder='Password' />
               <Button type='submit' value='Sign in' />
            </form>
         </FormBox>
         <BottomBox cta={"Have an account?"} link={routes.login} linkText={"Sign up"} />
      </AuthLayout>
   );
}
export default SignUp;
