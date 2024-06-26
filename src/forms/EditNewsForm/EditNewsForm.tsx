import "./editNewsForm.scss";
// import { useForm } from "react-hook-form";
import { useState } from "react";
import { News } from "../../pages/RootPage";
import { ApiService } from "../../services/ApiService";
type FormProps = {
  news: News;
  onClose: () => void;
};
export default function EditNewsForm({ news, onClose }: FormProps) {
  const handleSubmit = async () => {
    try {
      news.title = title;
      news.content = content;
      ApiService.editArticle(news);
      onClose();
    } catch (e) {
      throw e;
    }
  };
  const [content, setContent] = useState<string>(news.content);
  const [title, setTitle] = useState<string>(news.title);

  return (
    <div className="details-wrapper">
      <form className="details-form" onSubmit={handleSubmit}>
        <div>
          <label className="details-label">Title:</label>
          <input
            className="details-input"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div>
          <label className="details-label">Content:</label>
          <textarea
            className="details-textarea"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>

        <button className="nav-button details-button" type="submit">
          OK
        </button>
      </form>
    </div>
  );
}
