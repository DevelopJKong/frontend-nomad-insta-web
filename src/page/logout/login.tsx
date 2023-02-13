import { faFacebookSquare, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import routes from "../../routes";
import AuthLayout from "../../components/auth/auth-layout";
import Button from "../../components/auth/button";
import Separator from "../../components/auth/separator";
import FormBox from "../../components/auth/form-box";
import BottomBox from "../../components/auth/bottom-box";
import { useForm, SubmitHandler, SubmitErrorHandler } from "react-hook-form";
import PageTitle from "../../components/page-title";
import { Input } from "../../components/shared";

interface IForm {
   username: string;
   password: string;
   wrongPassword?: string;
}

interface IError {
   [key: string]: {
      type: string;
      message: string;
      ref: HTMLInputElement;
   };
}
const FacebookLogin = styled.div`
   color: #385285;
   cursor: pointer;

   span {
      margin-left: 10px;
      font-weight: 600;
   }
`;
function Login() {
   const {
      register,
      handleSubmit,
      setError,
      clearErrors,
      formState: { errors },
   } = useForm<IForm>({
      mode: "onChange",
   });
   const onValid: SubmitHandler<IForm> = (data) => {
      console.log(data);
   };
   const onInValid: SubmitErrorHandler<IError> = (data) => {
      console.log(data);
   };
   return (
      <AuthLayout>
         <PageTitle title='Login' />
         <FormBox>
            <div>
               <FontAwesomeIcon icon={faInstagram} size='3x' />
            </div>
            <form onSubmit={handleSubmit(onValid, onInValid)}>
               <Input
                  type='text'
                  placeholder='Username'
                  {...register("username", {
                     required: "닉네임은 필수입니다.",
                     minLength: {
                        value: 5,
                        message: "닉네임은 5자 이상이어야 합니다.",
                     },
                  })}
               />
               <Input
                  type='password'
                  placeholder='Password'
                  {...register("password", {
                     required: "비밀번호는 필수입니다.",
                     minLength: {
                        value: 5,
                        message: "비밀번호는 5자 이상이어야 합니다.",
                     },
                     pattern: {
                        value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{6,}$/,
                        message: "비밀번호는 영문 대소문자, 숫자, 특수문자를 모두 포함해야 합니다.",
                     },
                  })}
               />
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
