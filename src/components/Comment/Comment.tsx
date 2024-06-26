import "./comment.scss"
import { useState } from "react";
import trashIcon from "../../assets/icons8-trash.svg";
import { TComment } from "./Comments";
import EditCommentForm from "../../forms/EditCommentForm";

type CommentProps = {
  comment: TComment;
  onDelete: (id: number) => void;
};

export const Comment = ({ comment, onDelete }: CommentProps) => {
  const [isEditClicked, setIsEditClicked] = useState<boolean>(false);

  return (
    <div className="comment">
      <div className="comment-edit">
        <button onClick={() => setIsEditClicked(!isEditClicked)}>
          {isEditClicked ? "Close" : "Edit"}
        </button>
      </div>
      <div className="comment-data">
        <p>ID: {comment.id}</p>
        <p>PostID: {comment.post_id}</p>
        <p>UserID: {comment.user_id}</p>
      </div>
      {isEditClicked ? (
        <EditCommentForm
          commentData={comment}
          onClose={() => setIsEditClicked(false)}
        />
      ) : (
        <div className="comment-content">
          <p>{comment.text}</p>
        </div>
      )}

      <button className="delete-button" onClick={() => onDelete(comment.id)}>
        <img className="trash" src={trashIcon}></img>
      </button>
    </div>
  );
};
