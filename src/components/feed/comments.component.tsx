import styled from 'styled-components';
import { ICommentData } from '../shared';
import Comment from './comment.component';

interface IComments {
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

const Comments = ({ author, caption, commentNumber, comments }: IComments) => {
   return (
      <CommentContainer>
         <Comment author={author} payload={caption} />
         <CommentCount>{commentNumber > 1 ? `${commentNumber} comments` : `${commentNumber} comment`}</CommentCount>
         {comments?.map((comment) => {
            return <Comment key={comment.id} author={comment.user.username} payload={comment.payload} />;
         })}
      </CommentContainer>
   );
};

export default Comments;
