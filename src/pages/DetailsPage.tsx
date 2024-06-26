import { useState, useEffect, useContext } from "react";
import { News } from "./RootPage";
import { useParams } from "react-router-dom";
import { ApiService } from "../services/ApiService";
import DetailsCard from "../components/DetailsCard";
import EditNewsForm from "../forms/EditNewsForm/EditNewsForm";
import Comments from "../components/Comment/Comments";
import { useTranslation } from "react-i18next";
import { AddCommentContext } from "./Layout";
import AddCommentForm from "../forms/AddCommentForm";
import Modal from "../components/modal/Modal";

export type newCommentDataType = {
  isButtonClicked: boolean;
  inputUserId: number;
  inputContent: string;
};

export default function DetailsPage() {
  const [article, setArticle] = useState<News>();
  const { id } = useParams();
  const { t } = useTranslation();

  useEffect(() => {
    loadArticle();
  }, [id]);

  const loadArticle = () => {
    if (id) {
      ApiService.getArticle(parseInt(id)).then((item) => {
        const data: News = {
          id: item.id,
          slug: item.slug,
          url: item.url,
          title: item.title,
          content: item.content,
          image: item.image,
          thumbnail: item.thumbnail,
          status: item.status,
          category: item.category,
          publishedAt: item.publishedAt, //было new Date()
          updatedAt: item.updatedAt, // было new Date()
          created_at: item.created_at,
          userId: item.userId,
        };
        setArticle(data);
        setContent(data.content);
      });
    }
  };

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [content, setContent] = useState<string>("");
  const { newComments, setNewComments, adding, setAdding } =
    useContext(AddCommentContext);

  const handleEditClick = () => {
    setIsEditing(!isEditing);
    if (isEditing) {
      setArticle((prevArticle: any) =>
        prevArticle ? { ...prevArticle, content } : null
      );
    }
  };

  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div className="details-page">
      <button className="nav-button details-editBtn" onClick={toggleEditing}>
        {isEditing ? t("close") : t("edit")}
      </button>
      {!article && <div>Loading...</div>}
      {article && !isEditing && (
        <>
          <DetailsCard article={article} />
        </>
      )}

      {article && isEditing && (
        <Modal
          visible={isEditing}
          size="large"
          header={<button onClick={() => setIsEditing(false)}>X</button>}
          body={<EditNewsForm news={article} onClose={toggleEditing} />}
        />
      )}
      <div className="Cancel">
        {adding.isButtonClicked && id && (
          <div>
            <AddCommentForm id={id} />
            {/* <button onClick={handleSendClick}>Send</button> */}
          </div>
        )}

        <button
          style={{ marginTop: "10px" }}
          className="nav-button"
          onClick={() =>
            setAdding((prevState: newCommentDataType) => ({
              ...prevState,
              isButtonClicked: !prevState.isButtonClicked,
            }))
          }
        >
          {adding.isButtonClicked ? t("cancel") : t("add_comment")}
        </button>
      </div>

      {article && (
        <section>
          <Comments newComments={newComments} />
        </section>
      )}
    </div>
  );
}
