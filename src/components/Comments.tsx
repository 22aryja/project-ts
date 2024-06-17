import { useState, useEffect } from "react";
import { ApiService } from "../services/ApiService";
import { useParams } from "react-router-dom";
import { Comment } from "./Comment";

export type TComment = {
  id: number;
  postId: number;
  userId: number;
  comment: string;
};

export default function Comments() {
  const [comments, setComments] = useState<TComment[]>();
  const { id } = useParams();

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = () => {
    ApiService.getComments().then((res) => {
      const comments_data = res.filter(
        (comment) => comment.postId === Number(id)
      );

      setComments(comments_data);
    });
  };

  function onDelete(id: number) {
    setComments(comments?.filter((comment) => comment.id !== id));
  }

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
