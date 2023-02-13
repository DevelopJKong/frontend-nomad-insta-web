import { faFacebookSquare, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import routes from "../../routes";
import AuthLayout from "../../components/auth/auth-layout";
import Button from "../../components/auth/button";
import Separator from "../../components/auth/separator";
import Input from "../../components/auth/input";
import FormBox from "../../components/auth/form-box";
import BottomBox from "../../components/auth/bottom-box";

const FacebookLogin = styled.div`
   color: #385285;
   span {
      margin-left: 10px;
      font-weight: 600;
   }
`;
function Login() {
   return (
      <AuthLayout>
         <FormBox>
            <div>
               <FontAwesomeIcon icon={faInstagram} size='3x' />
            </div>
            <form>
               <Input type='text' placeholder='Username' />
               <Input type='password' placeholder='Password' />
               <Button type='submit' value='Log in' />
            </form>
            <Separator>
               <div></div>
               <span>Or</span>
               <div></div>
            </Separator>
            <FacebookLogin>
               <FontAwesomeIcon icon={faFacebookSquare} />
               <span>Log in with Facebook</span>
            </FacebookLogin>
         </FormBox>
         <BottomBox cta={"Dont have an account?"} link={routes.signUp} linkText={"Sign up"} />
      </AuthLayout>
   );
}
export default Login;
