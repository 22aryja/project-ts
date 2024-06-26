import "./newsCard.scss";
import { News } from "../../pages/RootPage";
import { useState } from "react";
import Modal from "../modal/Modal";
import DeleteArticleForm from "../../forms/DeleteArticleForm/DeleteArticleForm";
// import { TextUtils } from "../../utils/textUtils";

type NewsCardProps = {
  news: News;
  onDelete: () => void;
};

export default function NewsCard({ news, onDelete }: NewsCardProps) {
  const [isDeleteButtonClicked, setIsDeleteButtonClicked] =
    useState<boolean>(false);
  console.log(isDeleteButtonClicked);

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
                setIsDeleteButtonClicked(true);
              }}
            >
              X
            </button>

            {isDeleteButtonClicked ? (
              <Modal
                visible={isDeleteButtonClicked}
                size="medium"
                header={
                  <button onClick={() => setIsDeleteButtonClicked(false)}>
                    X
                  </button>
                }
                body={
                  <DeleteArticleForm
                    onDelete={onDelete}
                    setIsDeleteButtonClicked={setIsDeleteButtonClicked}
                  />
                }
              />
            ) : null}
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
            Title: {news.title}
            {/* было TextUtils.upper(news.title) */}
          </p>
          <p>
            {news.id} {news.slug}
          </p>
          <p>
            {news.status} at{" "}
            {news.publishedAt ? news.publishedAt : `${new Date()}`}
          </p>

          <p className="card-category">
            Category: {news.category ? news.category : "lorem"}
          </p>
        </div>
      </div>
    </>
  );
}
