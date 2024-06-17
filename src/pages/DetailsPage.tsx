import { useState, useEffect } from "react";
import { News } from "./RootPage";
import { useParams } from "react-router-dom";
import { ApiService } from "../services/ApiService";
import DetailsCard from "../components/DetailsCard";
import EditNewsForm from "../forms/EditNewsForm";
import Comments from "../components/Comments";

export default function DetailsPage() {
  const [article, setArticle] = useState<News>();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    loadArticle();
  }, [id]);

  const loadArticle = () => {
    ApiService.getArticle(id).then((item) => {
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
        userId: item.userId,
      };
      setArticle(data);
      setContent(data.content);
    });
  };

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [content, setContent] = useState<string>("");

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
      <button className="nav-button" onClick={toggleEditing}>
        {isEditing ? "Close" : "Edit"}
      </button>
      {!article && <div>Loading...</div>}
      {article && !isEditing && (
        <>
          <DetailsCard article={article} />
        </>
      )}

      {article && isEditing && (
        <EditNewsForm news={article} onClose={toggleEditing} />
      )}
      {article && (
        <section>
          <Comments />
        </section>
      )}
    </div>
  );
}
