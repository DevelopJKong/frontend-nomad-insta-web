import React from 'react';
import styled from 'styled-components';
import { FatText } from '../shared';
import { Link } from 'react-router-dom';

// ! 코드 챌린지
// ! 만약에 @username 이라는 단어가 들어오면, Link 컴포넌트를 사용해서 해당
// ! 유저의 프로필로 이동할 수 있도록 만들어보세요.

interface IComment {
   author: string;
   payload: string;
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

const Comment = ({ author, payload }: IComment) => {
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
      </CommentContainer>
   );
};

export default Comment;
