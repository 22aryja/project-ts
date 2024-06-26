import "./comment.scss";
import { useEffect, useContext } from "react";
import { ApiService } from "../../services/ApiService";
import { useParams } from "react-router-dom";
import { Comment } from "./Comment";
import { AddCommentContext } from "../../pages/Layout";

export type TComment = {
  id: number;
  post_id: number;
  user_id: number;
  text: string;
  created_at: string;
};

export type TNewComment = {
  post_id: number;
  user_id: number;
  text: string;
};

type CommentsProps = {
  newComments?: TComment[];
};

export default function Comments({ newComments = [] }: CommentsProps) {
  const { comments, setComments } = useContext(AddCommentContext);
  const { id } = useParams();

  //для отображения комментов, у которых postId === id страницы
  useEffect(() => {
    fetchComments();
  }, [id]);
  
  const fetchComments = () => {
    if(id){
    ApiService.getComments(id).then((res) => {
      const comments_data = res.filter(
        (comment) => comment.post_id === Number(id)
      );

      setComments(comments_data);
    });
  }
  };

  // для удаления коммента через API
  function onDelete(id: number): void {
    ApiService.deleteComment(id);
    if (comments) {
      setComments((comments) =>
        comments.filter((comment: TComment) => comment.id !== id)
      );
    }
  }

  // для обработки новых комментов
  useEffect(() => {
    if (newComments.length > 0) {
      setComments((prevComments) => [...(prevComments || []), ...newComments]);
    }
  }, [newComments]);

  return (
    <div>
      {comments && comments.length > 0 && (
        <div className="comment-wrapper">
          {comments.map((commentItem) => (
            <Comment
              key={commentItem.id}
              comment={commentItem}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
      {!comments && <div> Loading...</div>}
    </div>
  );
}
