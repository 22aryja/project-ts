import { useContext, useState } from "react";
import { AddCommentContext } from "../pages/Layout";
import { newCommentDataType } from "../pages/DetailsPage";
import { ApiService } from "../services/ApiService";
import { TComment } from "../components/Comments";
import { useTranslation } from "react-i18next";

export default function AddCommentForm() {
  const { t } = useTranslation();
  const { adding, setAdding } = useContext(AddCommentContext);
  const { comments, setComments } = useContext(AddCommentContext);
  const newComment: TComment = {
    id: 0,
    postId: 0,
    userId: 0,
    comment: "",
  };
  const [commentState, setCommentState] = useState<TComment>(newComment);

  const handleSubmit = async (event: React.FormEvent) => {
    //gpt
    event.preventDefault(); //gpt

    let { id, postId, userId, comment } = commentState;
    try {
      comments.map(
        (item) => (
          (id = comments.length > 0 ? comments[comments.length - 1].id + 1 : 1), //gpt
          (postId = item.postId),
          (userId = adding.inputUserId),
          (comment = adding.inputContent),
          setCommentState({ id, postId, userId, comment })
        )
      );
      const newComment = { id, postId, userId, comment };

      const addedComment = await ApiService.addComment(newComment);

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
