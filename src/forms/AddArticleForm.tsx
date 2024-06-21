import { useContext, useState } from "react";
import { NewsContext } from "../pages/Layout";
import { News } from "../pages/RootPage";
import { ApiService } from "../services/ApiService";
// "https://dummyimage.com/800x430/3822ff/lorem-ipsum.png&text=jsonplaceholder.org" для img
// "https://dummyimage.com/200x200/3822ff/lorem-ipsum.png&text=jsonplaceholder.org" для thumbnail
const URL = "https://jsonplaceholder.org/posts/";

const emptyArticle: News = {
  id: 0,
  slug: "",
  url: URL,
  title: "",
  content: "",
  image: "",
  thumbnail: "",
  status: "",
  category: "",
  publishedAt: "",
  updatedAt: "",
  userId: 0,
};

export default function AddArticleForm({ onClose }: any) {
  const { news, setNews } = useContext(NewsContext);
  const [newArticle, setNewArticle] = useState<News>(emptyArticle);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const SLUG = newArticle.slug || "default";
    const TITLE = newArticle.title || "untitled";

    const updatedNewArticle: News = {
      ...newArticle,
      id: news.length + 1,
      url: newArticle.url + newArticle.slug,
      image: `https://dummyimage.com/800x430/3822ff/${SLUG}.png&text=${TITLE}`,
      thumbnail: `https://dummyimage.com/200x200/3822ff/${SLUG}.png&text=${TITLE}`,
      status: "published",
      publishedAt: `${new Date()}`,
      updatedAt: `${new Date()}`,
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
    <form className="article-form" onSubmit={handleSubmit}>
      <label>Enter slug: </label>
      <input
        type="text"
        required
        onChange={(event: any) =>
          setNewArticle((prevData: News) => ({
            ...prevData,
            slug: event.target.value,
          }))
        }
      ></input>

      <label>Enter title: </label>
      <input
        type="text"
        required
        onChange={(event: any) =>
          setNewArticle((prevData: News) => ({
            ...prevData,
            title: event.target.value,
          }))
        }
      ></input>

      <label>Enter content: </label>
      <textarea
        required
        onChange={(event: any) =>
          setNewArticle((prevData: News) => ({
            ...prevData,
            content: event.target.value,
          }))
        }
      ></textarea>

      <label>Enter category:</label>
      <input
        type="text"
        required
        onChange={(event: any) =>
          setNewArticle((prevData: News) => ({
            ...prevData,
            category: event.target.value,
          }))
        }
      ></input>

      <label>Enter UserID: </label>
      <input
        type="number"
        min={0}
        required
        onChange={(event: any) =>
          setNewArticle((prevData: News) => ({
            ...prevData,
            userId: event.target.value,
          }))
        }
      ></input>

      <button type="submit">Create</button>
    </form>
  );
}
