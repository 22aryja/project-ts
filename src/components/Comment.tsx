import { useEffect, useState } from "react";
import trashIcon from "../assets/icons8-trash.svg";
import { TComment } from "./Comments";

type CommentProps = {
  comment: TComment;
  onDelete: (id: number) => void;
};

export const Comment = ({ comment, onDelete }: CommentProps) => {
  return (
    <div className="comment">
      <div className="comment-data">
        <p>ID: {comment.id}</p>
        <p>PostID: {comment.postId}</p>
        <p>UserID: {comment.userId}</p>
      </div>
      <div className="comment-content">
        <p>{comment.comment}</p>
      </div>
      <button className="delete-button" onClick={() => onDelete(comment.id)}>
        <img className="trash" src={trashIcon}></img>
      </button>
    </div>
  );
};
