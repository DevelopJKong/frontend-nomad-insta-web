import { faInstagram, faFacebookSquare } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import routes from '../../routes';
import AuthLayout from '../../components/auth/auth-layout';
import Separator from '../../components/auth/separator';
import FormBox from '../../components/auth/form-box';
import BottomBox from '../../components/auth/bottom-box';
import styled from 'styled-components';
import { FatLink, Input, ISignUpForm } from '../../components/shared';
import Button from '../../components/auth/button';
import PageTitle from '../../components/page-title';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useMutation, gql } from '@apollo/client';
import { createUserMutation, createUserMutationVariables } from '../../__generated__/createUserMutation';
import { useNavigate } from 'react-router-dom';
import FormError from '../../components/auth/form-error';

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
   console.log('Facebook Login');
};

const CREATE_USER_MUTATION = gql`
   mutation createUserMutation($createUserInput: CreateUserInput!) {
      createUser(input: $createUserInput) {
         ok
         error
      }
   }
`;

function SignUp() {
   const {
      register,
      handleSubmit,
      setError,
      clearErrors,
      getValues,
      formState: { errors, isValid },
   } = useForm<ISignUpForm>({
      mode: 'onChange',
   });
   const navigate = useNavigate();

   const onCompleted = (data: createUserMutation) => {
      const { email, password } = getValues();
      const {
         createUser: { ok, error },
      } = data;

      if (!ok) {
         if (error) {
            return setError('result', {
               message: error,
            });
         }
      }
      navigate(routes.home, { replace: true, state: { message: '계정이 생성되었습니다. 로그인을 해 주세요.', email, password } });
   };

   const [createUserMutation, { loading }] = useMutation<createUserMutation, createUserMutationVariables>(CREATE_USER_MUTATION, {
      onCompleted,
   });

   const onValid: SubmitHandler<ISignUpForm> = (data: ISignUpForm) => {
      if (loading) {
         return;
      }
      if (data) {
         const { password, confirmationPassword } = data;
         if (password !== confirmationPassword) {
            setError('confirmationPassword', {
               message: 'Password does not match',
            });

            setError('password', {
               message: 'Password does not match',
            });
            return;
         }
         createUserMutation({
            variables: {
               createUserInput: {
                  firstName: data.firstName,
                  lastName: data.lastName,
                  username: data.username,
                  email: data.email,
                  password: data.password,
               },
            },
         });
      }
   };

   return (
      <AuthLayout>
         <PageTitle title='Sign Up' />
         <FormBox type={'SIGN_UP'}>
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
            <form onSubmit={handleSubmit(onValid)} onClick={() => clearErrors()}>
               <Input
                  type='text'
                  placeholder='Username'
                  hasError={Boolean(errors?.username?.message)}
                  {...register('username', {
                     required: '닉네임은 필수 입니다.',
                     minLength: {
                        value: 5,
                        message: '닉네임은 5자 이상이어야 합니다.',
                     },
                  })}
               />
               <FormError message={errors?.username?.message} />
               <Input
                  type='text'
                  placeholder='First Name'
                  hasError={Boolean(errors?.firstName?.message)}
                  {...register('firstName', {
                     required: '이름은 필수 입니다.',
                  })}
               />
               <FormError message={errors?.firstName?.message} />
               <Input
                  type='text'
                  placeholder='Last Name'
                  hasError={Boolean(errors?.lastName?.message)}
                  {...register('lastName', {
                     required: '성은 필수 입니다.',
                  })}
               />
               <FormError message={errors?.lastName?.message} />
               <Input
                  type='email'
                  placeholder='Email'
                  hasError={Boolean(errors?.email?.message)}
                  {...register('email', {
                     required: '이메일은 필수 입니다.',
                     minLength: {
                        value: 5,
                        message: '이메일은 5자 이상이어야 합니다.',
                     },
                     pattern: {
                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                        message: '이메일 형식이 아닙니다.',
                     },
                  })}
               />
               <FormError message={errors?.email?.message} />
               <Input
                  type='password'
                  placeholder='Password'
                  hasError={Boolean(errors?.password?.message)}
                  {...register('password', {
                     required: '비밀번호는 필수 입니다.',
                     minLength: {
                        value: 5,
                        message: '비밀번호는 5자 이상이어야 합니다.',
                     },
                     pattern: {
                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
                        message: '대문자,소문자,숫자,특수문자를 포함해야 합니다.',
                     },
                  })}
               />
               <FormError message={errors?.password?.message} />
               <Input
                  type='password'
                  placeholder='Confirmation Password'
                  hasError={Boolean(errors?.confirmationPassword?.message)}
                  {...register('confirmationPassword', {
                     required: '비밀번호 확인은 필수 입니다.',
                     minLength: {
                        value: 5,
                        message: '비밀번호 확인은 5자 이상이어야 합니다.',
                     },
                     pattern: {
                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
                        message: '대문자,소문자,숫자,특수문자를 포함해야 합니다.',
                     },
                  })}
               />
               <FormError message={errors?.confirmationPassword?.message} />
               <Button type='submit' value='Sign in' disabled={!isValid} />
               <FormError message={errors?.result?.message} />
            </form>
         </FormBox>
         <BottomBox cta={'Have an account?'} link={routes.login} linkText={'Login'} />
      </AuthLayout>
   );
}
export default SignUp;
