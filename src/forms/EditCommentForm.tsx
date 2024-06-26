import { useState } from "react";
import { TComment } from "../components/Comment/Comments";
import { ApiService } from "../services/ApiService";

type EditCommentFormProps = {
  commentData: TComment;
  onClose: () => void;
};

export default function EditCommentForm({
  commentData,
  onClose,
}: EditCommentFormProps) {
  const [comment, setComment] = useState<string>(commentData.text);

  const handleSubmit = async () => {
    try {
      commentData.text = comment;
      ApiService.editComment(commentData);
      onClose();
    } catch (e) {
      throw e;
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <textarea
        className="comment-textarea"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      ></textarea>
      <button type="submit">Done</button>
    </form>
  );
}
