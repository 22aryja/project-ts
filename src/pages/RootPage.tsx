import { useEffect, useContext, useState } from "react";
import NewsCard from "../components/NewsCard";
import "../App.scss";
import { Link } from "react-router-dom";
import { HeaderContext, NewsContext } from "./Layout";
import { ApiService } from "../services/ApiService";
import Modal from "../components/modal/Modal";
import AddArticleFrom from "../forms/AddArticleForm";
import { DateUtils } from "./../utils/dateTime";
import Datepicker from "../components/Datepicker/Datepicker";

//npm run dev
export type News = {
  id: number;
  slug: string;
  url: string;
  title: string;
  content: string;
  image: string;
  thumbnail: string;
  status: string;
  category: string;
  publishedAt: string;
  updatedAt: string;
  userId: number;
};

export type Dates = {
  left: Date | null;
  right: Date | null;
};

const emptyCalendars = {
  left: new Date(),
  right: new Date(),
};

export const RootPage = () => {
  const { initialNews, setInitialNews, news, setNews } =
    useContext(NewsContext);
  const { searchText } = useContext(HeaderContext); //teleporting "searchText"
  const [addArticleFormVisible, setAddArticleFormVisible] =
    useState<boolean>(false);

  const [dates, setDates] = useState<Dates>(emptyCalendars);

  // достает все Article с API
  useEffect(() => {
    loadNews();
  }, []);

  // поиск Article по категориям
  useEffect(() => {
    if (searchText && searchText.length > 0) {
      const filteredNews = initialNews.filter((newsItem) =>
        newsItem.category.includes(searchText)
      );

      setNews(filteredNews);
    }
    if (!searchText || searchText.length == 0) {
      setNews(initialNews);
    }
  }, [searchText]);

  // сортировка Article по датам
  useEffect(() => {
    if (dates.left && dates.right) {
      const filteredNews = initialNews.filter((article) => {
        const articleDate = new Date(DateUtils.splitDate(article.publishedAt));
        return articleDate >= dates.left! && articleDate <= dates.right!;
      });
      setNews(filteredNews);
    } else {
      setNews(initialNews);
    }
  }, [dates]);

  const loadNews = () => {
    ApiService.getAllPosts().then((res) => {
      setNews(res);
      setInitialNews(res);
    });
  };

  const deleteNews = (newsItem: News) => {
    ApiService.deleteArticle(newsItem.id);
    const updatedArticles = news.filter(
      (article) => article.id !== newsItem.id
    );
    setNews(updatedArticles);
  };

  return (
    //в arrow function => {нужно писать return}(НЕ нужно писать return)
    <>
      <div className="edit-article">
        <button
          className="nav-button"
          onClick={() => setAddArticleFormVisible(true)}
        >
          Add Article
        </button>
        <div>
          <Datepicker dates={dates} setDates={setDates} />
          {/* <input
            type="date"
            onChange={(e) =>
              setDates((prevCalendars) => ({
                ...prevCalendars,
                left: new Date(e.target.value),
              }))
            }
          />
          <input
            type="date"
            onChange={(e) =>
              setDates((prevCalendars) => ({
                ...prevCalendars,
                right: new Date(e.target.value),
              }))
            }
          /> */}
        </div>
      </div>
      <div className="container">
        {news.map((newsItem: any) => (
          <Link key={newsItem.id} to={`/details/${newsItem.id}`}>
            <NewsCard news={newsItem} onDelete={() => deleteNews(newsItem)} />
          </Link>
        ))}
      </div>
      {addArticleFormVisible && (
        <Modal
          visible={addArticleFormVisible}
          size="extra-large"
          header={
            <button onClick={() => setAddArticleFormVisible(false)}>X</button>
          }
          body={
            <div className="article-wrapper">
              <AddArticleFrom onClose={() => setAddArticleFormVisible(false)} />
            </div>
          }
        />
      )}
    </>
  );
};
