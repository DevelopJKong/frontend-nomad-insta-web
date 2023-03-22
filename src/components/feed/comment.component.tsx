import styled from 'styled-components';
import { FatText } from '../shared';

interface IComment {
   author: string;
   payload: string;
}

const CommentContainer = styled.div`
   margin-top: 10px;
`;

const CommentCaption = styled.div`
   margin-top: 10px;
`;

const Comment = ({ author, payload }: IComment) => {
   return (
      <CommentContainer>
         <FatText>{author}</FatText>
         <CommentCaption>{payload}</CommentCaption>
      </CommentContainer>
   );
};

export default Comment;
