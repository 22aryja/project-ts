import { useEffect, useContext, useState } from "react";
import NewsCard from "../components/NewsCard/NewsCard";
import "../App.scss";
import { Link, useSearchParams } from "react-router-dom";
import { HeaderContext, NewsContext } from "./Layout";
import { ApiService } from "../services/ApiService";
import EmptyData from "../components/EmptyData/EmptyData";
import Modal from "../components/modal/Modal";
import AddArticleForm from "../forms/AddArticleForm";
import { DateUtils } from "./../utils/dateTime";
import Datepicker from "../components/Datepicker/Datepicker";
import Paginator from "../components/Paginator/Paginator";

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
  created_at: string;
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

// для пагинации
export type Pagination = {
  currentPage: number;
};

const emptyActive: Pagination = {
  currentPage: 1,
};

// const getNewsForCurrentPage = (
//   news: News[],
//   currentPage: number,
//   itemsPerPage: number
// ) => {
//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const endIndex = startIndex + itemsPerPage;
//   return news.slice(startIndex, endIndex);
// };
//

export const RootPage = () => {
  const { initialNews, setInitialNews, news, setNews } =
    useContext(NewsContext);
  const { searchText } = useContext(HeaderContext); //teleporting "searchText"
  const [addArticleFormVisible, setAddArticleFormVisible] =
    useState<boolean>(false);

  const [dates, setDates] = useState<Dates>(emptyCalendars);

  // для пагинации
  const [active, setActive] = useState<number>(1);
  const [maxPages, setMaxPages] = useState<number>(0);

  const itemsPerPage = 5; //установлено количество артиклов на страницу

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
        const articleDate = new Date(DateUtils.splitDate(article.created_at));
        return articleDate >= dates.left! && articleDate <= dates.right!;
      });
      setNews(filteredNews);
    } else {
      setNews(initialNews);
    }
  }, [dates]);

  const loadNews = (page?: number) => {
    if (page)
      ApiService.getAllPosts(page, itemsPerPage).then((res) => {
        setNews(res.records);
        setInitialNews(res.records);
        setMaxPages(res.pages);
      });
  };

  const deleteNews = (newsItem: News) => {
    ApiService.deleteArticle(newsItem.id);
    const updatedArticles = news.filter(
      (article) => article.id !== newsItem.id
    );
    setNews(updatedArticles);
  };

  useEffect(() => {
    loadNews(active);
  }, [active]);

  // const newsForCurrentPage = getNewsForCurrentPage(news, active, itemsPerPage);

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
      {news.length === 0 ? (
        <EmptyData />
      ) : (
        <>
          <div className="container">
            {news.map((newsItem) => (
              <Link key={newsItem.id} to={`/details/${newsItem.id}`}>
                <NewsCard
                  news={newsItem}
                  onDelete={() => deleteNews(newsItem)}
                />
              </Link>
            ))}
          </div>
          <Paginator
            active={active}
            setActive={setActive}
            totalPages={maxPages}
          />
        </>
      )}
      {addArticleFormVisible && (
        <Modal
          visible={addArticleFormVisible}
          size="extra-large"
          header={
            <button onClick={() => setAddArticleFormVisible(false)}>X</button>
          }
          body={
            <AddArticleForm onClose={() => setAddArticleFormVisible(false)} />
          }
        />
      )}
    </>
  );
};
