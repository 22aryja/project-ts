import { useContext, useState } from "react";
import { AddCommentContext } from "../pages/Layout";
import { newCommentDataType } from "../pages/DetailsPage";
import { ApiService } from "../services/ApiService";
import { TNewComment } from "../components/Comment/Comments";
import { useTranslation } from "react-i18next";

type AddCommentFormProps = {
  id: string;
};

export default function AddCommentForm({ id }: AddCommentFormProps) {
  const { t } = useTranslation();
  const { adding, setAdding } = useContext(AddCommentContext);
  const { comments, setComments } = useContext(AddCommentContext);
  const newComment: TNewComment = {
    post_id: parseInt(id),
    user_id: 1,
    text: "",
  };
  const [commentState, setCommentState] = useState<TNewComment>(newComment);

  const handleSubmit = async (event: React.FormEvent) => {
    //gpt
    event.preventDefault(); //gpt

    let { post_id, user_id, text } = commentState;
    try {
      comments.map(
        (item) => (
          // (id = comments.length > 0 ? comments[comments.length - 1].id + 1 : 1), //gpt
          (post_id = item.post_id),
          (user_id = adding.inputUserId),
          (text = adding.inputContent),// было text = adding.inputContent
          setCommentState({ post_id, user_id, text })
        )
      );
      const newComment = { post_id, user_id, text };

      const addedComment = await ApiService.addComment(newComment, id);

      setComments((prevComments) => [...prevComments, addedComment]);

      setAdding({
        isButtonClicked: false,
        inputUserId: 0,
        inputContent: "",
      });
    } catch (e) {
      throw e;
    }
  };

  return (
    <form className="details-form" onSubmit={handleSubmit}>
      <label>Enter your UserID: </label>
      <input
        type="number"
        onChange={(event: any) =>
          setAdding((prevState: newCommentDataType) => ({
            ...prevState,
            inputUserId: event.target.value,
          }))
        }
        min={0}
      ></input>
      <label>Enter a comment: </label>
      <textarea
        onChange={(event: any) =>
          setAdding((prevState: newCommentDataType) => ({
            ...prevState,
            inputContent: event?.target.value,
          }))
        }
      >
        {adding.inputContent}
      </textarea>
      <button className="nav-button" type="submit">
        {t("send")}
      </button>
    </form>
  );
}
