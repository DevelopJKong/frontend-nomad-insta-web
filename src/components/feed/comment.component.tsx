import sanitizeHtml from 'sanitize-html';
import styled from 'styled-components';
import { FatText } from '../shared';

interface IComment {
   author: string;
   payload: string;
}

const CommentContainer = styled.div`
   margin-top: 10px;
   display: flex;
   align-items: center;
   mark {
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
   const cleanPayload = sanitizeHtml(payload.replace(/#[\w]+/g, '<mark>$&</mark>'), {
      allowedTags: ['mark'],
   });
   return (
      <CommentContainer>
         <FatText>{author}</FatText>
         <CommentCaption
            dangerouslySetInnerHTML={{
               __html: cleanPayload,
            }}
         />
      </CommentContainer>
   );
};

export default Comment;
