import { News } from "../pages/RootPage";
import { TextUtils } from "./../utils/textUtils";

type NewsCardProps = {
  news: News;
  onDelete: () => void;
};

export default function NewsCard({ news, onDelete }: NewsCardProps) {
  return (
    <>
      <div key={news.id} className="card">
        <div className="card-top">
          <div className="delete-article">
            <button
              className="delete-article-button"
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                onDelete();
              }}
            >
              X
            </button>
          </div>
          <div className="card-top-image-wrapper">
            <img
              className="card-top-image"
              src={
                news.thumbnail
                  ? news.thumbnail
                  : "https://dummyimage.com/200x200/3822ff/lorem-ipsum.png&text=default"
              }
            />
          </div>
        </div>
        <div className="card-bottom">
          <p className="card-bottom-title">
            Title: {TextUtils.upper(news.title)}
          </p>
          <p>
            {news.id} {news.slug}
          </p>
          <p>
            {news.status} at{" "}
            {news.publishedAt ? news.publishedAt : `${new Date()}`}
          </p>

          <p className="card-category">Category: {news.category}</p>
        </div>
      </div>
    </>
  );
}
