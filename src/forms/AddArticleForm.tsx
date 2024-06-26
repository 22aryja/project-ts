import { useContext, useState } from "react";
import { NewsContext } from "../pages/Layout";
// import { News } from "../pages/RootPage";
import { ApiService } from "../services/ApiService";
// "https://dummyimage.com/800x430/3822ff/lorem-ipsum.png&text=jsonplaceholder.org" для img
// "https://dummyimage.com/200x200/3822ff/lorem-ipsum.png&text=jsonplaceholder.org" для thumbnail
// const URL = "https://jsonplaceholder.org/posts/";

const colorGenerator = (): string => {
  const letters = "0123456789ABCDEF";
  let color = "";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

export type Post = {
  title: string;
  content: string;
  thumbnail: string;
  user_id: number;
};

const emptyArticle: Post = {
  title: "",
  content: "",
  thumbnail: "",
  user_id: 0,
};

export default function AddArticleForm({ onClose }: any) {
  const { news, setNews } = useContext(NewsContext);
  const [newArticle, setNewArticle] = useState<Post>(emptyArticle);
  let thumbnailColor: string = colorGenerator();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const TITLE = newArticle.title || "untitled";

    const updatedNewArticle: Post = {
      ...newArticle,
      thumbnail: `https://dummyimage.com/200x200/${thumbnailColor}/${TITLE}.png&text=${TITLE}`,
    };
    try {
      const addedArticle = await ApiService.addArticle(updatedNewArticle);

      setNews([...news, addedArticle]);
      setNewArticle(emptyArticle);
      onClose();
    } catch (e) {
      throw e;
    }
  };

  return (
    <div className="article-wrapper">
      <form className="article-form" onSubmit={handleSubmit}>
        <div>
          <label className="article-label">Enter title: </label>
          <input
            className="article-input"
            type="text"
            required
            onChange={(event: any) =>
              setNewArticle((prevData: Post) => ({
                ...prevData,
                title: event.target.value,
              }))
            }
          ></input>
        </div>

        <div>
          <label className="article-label">Enter content: </label>
          <textarea
            className="article-textarea"
            required
            onChange={(event: any) =>
              setNewArticle((prevData: Post) => ({
                ...prevData,
                content: event.target.value,
              }))
            }
            style={{ height: "12rem", width: "75%", fontSize: "1.25rem" }}
          ></textarea>
        </div>

        <div>
          <label className="article-label">Enter UserID: </label>
          <input
            className="article-input"
            type="number"
            min={1}
            required
            onChange={(event: any) =>
              setNewArticle((prevData: Post) => ({
                ...prevData,
                user_id: event.target.value,
              }))
            }
          ></input>
        </div>

        <button className="article-form-button" type="submit">
          Create
        </button>
      </form>
    </div>
  );
}
