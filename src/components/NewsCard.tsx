import { News } from "../pages/RootPage";
import { TextUtils } from "./../utils/textUtils";

type NewsCardProps = {
  news: News;
};

export default function NewsCard({ news }: NewsCardProps) {
  return (
    <>
      <div key={news.id} className="card">
        <div className="card-top">
          <div className="card-top-image-wrapper">
            <img className="card-top-image" src={news.thumbnail} />
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
            {news.status} at {news.publishedAt}
          </p>
          <p className="card-category">Category: {news.category}</p>
        </div>
      </div>
    </>
  );
}
