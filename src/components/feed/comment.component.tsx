import React from 'react';
import styled from 'styled-components';
import { FatText } from '../shared';
import { Link } from 'react-router-dom';
import { gql, useMutation, ApolloCache, FetchResult } from '@apollo/client';
import { deleteCommentVariables, deleteComment } from '../../__generated__/deleteComment';

// ! 코드 챌린지
// ! 만약에 @username 이라는 단어가 들어오면, Link 컴포넌트를 사용해서 해당
// ! 유저의 프로필로 이동할 수 있도록 만들어보세요.

interface IComment {
   id?: number;
   author: string;
   payload: string;
   isMine?: boolean;
   photoId?: number;
}

const CommentContainer = styled.div`
   margin-top: 10px;
   display: flex;
   align-items: center;
   a {
      background-color: inherit;
      color: ${({ theme }) => theme.accent};
      cursor: pointer;
      &:hover {
         text-decoration: underline;
      }
   }
`;

const CommentCaption = styled.div`
   margin-left: 5px;
`;

const DELETE_COMMENT_MUTATION = gql`
   mutation deleteComment($deleteCommentInput: DeleteCommentInput!) {
      deleteComment(input: $deleteCommentInput) {
         ok
         error
         message
      }
   }
`;

const Comment = ({ id, author, payload, isMine, photoId }: IComment) => {
   const updateDeleteComment = (cache: ApolloCache<any>, result: Omit<FetchResult<deleteComment>, 'context'>) => {
      if (!result.data) return;
      const {
         data: {
            deleteComment: { ok },
         },
      } = result;
      if (ok) {
         cache.evict({ id: `Comment:${id}` });
         cache.modify({
            id: `Photo:${photoId}`,
            fields: {
               commentNumber(prev) {
                  return prev - 1;
               },
            },
         });
      }
   };

   const [deleteCommentMutation, { loading }] = useMutation<deleteComment, deleteCommentVariables>(DELETE_COMMENT_MUTATION, {
      variables: {
         deleteCommentInput: {
            id: id!, // eslint-disable-line
         },
      },
      update: updateDeleteComment,
   });
   const onDeleteClick = () => {
      deleteCommentMutation();
   };
   return (
      <CommentContainer>
         <FatText>{author}</FatText>
         <CommentCaption>
            {payload.split(' ').map((word: string, index: number) =>
               /#[\w]+/.test(word) ? (
                  <React.Fragment key={index}>
                     <Link to={`/hashtags/${word}`}>{word}</Link>
                  </React.Fragment>
               ) : (
                  <React.Fragment key={index}>{word}</React.Fragment>
               ),
            )}
         </CommentCaption>
         {isMine && <button onClick={onDeleteClick}>{loading ? 'Deleting...' : '❌'}</button>}
      </CommentContainer>
   );
};

export default Comment;
