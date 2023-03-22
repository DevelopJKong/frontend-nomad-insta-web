import styled from 'styled-components';
import { ICommentData } from '../shared';
import Comment from './comment.component';
import { useForm } from 'react-hook-form';
import { gql, useMutation } from '@apollo/client';
import { createComment, createCommentVariables } from '../../__generated__/createComment';

interface ICommentInput {
   payload: string;
}
interface IComments {
   photoId: number;
   author: string;
   caption: string;
   commentNumber: number;
   comments: ICommentData[];
}

const CommentContainer = styled.div`
   margin-top: 20px;
`;

const CommentCount = styled.span`
   opacity: 0.7;
   font-size: ${({ theme }) => theme.fontSize.small};
`;

const PostCommentContainer = styled.div`
   margin-top: 10px;
   padding-top: 15px;
   padding-bottom: 10px;
   border-top: 1px solid ${(props) => props.theme.borderColor};
`;

const PostCommentInput = styled.input`
   width: 100%;
   &::placeholder {
      font-size: 12px;
   }
`;

const CREATE_COMMENT_MUTATION = gql`
   mutation createComment($createCommentInput: CreateCommentInput!) {
      createComment(input: $createCommentInput) {
         ok
         error
         message
      }
   }
`;

const Comments = ({ photoId, author, caption, commentNumber, comments }: IComments) => {
   const { register, handleSubmit, clearErrors, setValue } = useForm<ICommentInput>({
      mode: 'onChange',
   });

   const [createCommentMutation, { loading }] = useMutation<createComment, createCommentVariables>(CREATE_COMMENT_MUTATION);

   const onValid = (data: ICommentInput) => {
      const { payload } = data;
      if (loading) {
         return;
      }
      createCommentMutation({
         variables: {
            createCommentInput: {
               photoId,
               payload,
            },
         },
      });
      setValue('payload', '');
   };

   return (
      <CommentContainer>
         <Comment author={author} payload={caption} />
         <CommentCount>{commentNumber > 1 ? `${commentNumber} comments` : `${commentNumber} comment`}</CommentCount>
         {comments?.map((comment) => {
            return <Comment key={comment.id} author={comment.user.username} payload={comment.payload} />;
         })}
         <PostCommentContainer>
            <form onSubmit={handleSubmit(onValid)} onClick={() => clearErrors()}>
               <PostCommentInput
                  type='text'
                  placeholder='Write a comment...'
                  {...register('payload', {
                     required: {
                        value: true,
                        message: 'Comment is required',
                     },
                  })}
               />
            </form>
         </PostCommentContainer>
      </CommentContainer>
   );
};

export default Comments;
