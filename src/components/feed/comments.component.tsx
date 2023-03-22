import styled from 'styled-components';
import { ICommentData } from '../shared';
import Comment from './comment.component';
import { useForm } from 'react-hook-form';
import { gql, useMutation, ApolloCache, FetchResult } from '@apollo/client';
import useUser from '../../hooks/use-user.hook';
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
         id
      }
   }
`;

const Comments = ({ photoId, author, caption, commentNumber, comments }: IComments) => {
   const { data: userData } = useUser();
   const { register, handleSubmit, clearErrors, setValue, getValues } = useForm<ICommentInput>({
      mode: 'onChange',
   });

   const createCommentUpdate = (cache: ApolloCache<any>, result: Omit<FetchResult<createComment>, 'context'>) => {
      if (!result.data) return;
      const { payload } = getValues();
      setValue('payload', '');
      const {
         data: {
            createComment: { ok, id },
         },
      } = result;
      if (ok && userData?.me) {
         const newComment = {
            __typename: 'Comment',
            createdAt: String(Date.now()),
            id,
            isMine: true,
            payload,
            user: {
               ...userData.me,
            },
         };
         const newCacheComment = cache.writeFragment({
            data: newComment,
            fragment: gql`
               fragment BSName on Comment {
                  id
                  createdAt
                  isMine
                  payload
                  user {
                     username
                     avatar
                  }
               }
            `,
         });
         cache.modify({
            id: `Photo:${photoId}`,
            fields: {
               comments(prev) {
                  return [...prev, newCacheComment];
               },
               commentNumber(prev) {
                  return prev + 1;
               },
            },
         });
      }
   };
   const [createCommentMutation, { loading }] = useMutation<createComment, createCommentVariables>(CREATE_COMMENT_MUTATION, {
      update: createCommentUpdate,
   });

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
   };

   return (
      <CommentContainer>
         <Comment author={author} payload={caption} />
         <CommentCount>{commentNumber > 1 ? `${commentNumber} comments` : `${commentNumber} comment`}</CommentCount>
         {comments?.map((comment) => {
            return (
               <Comment
                  key={comment.id}
                  id={comment.id}
                  author={comment.user.username}
                  payload={comment.payload}
                  isMine={comment.isMine}
                  photoId={photoId}
               />
            );
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
