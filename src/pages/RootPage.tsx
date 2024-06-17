import { useEffect, useContext } from "react";
import NewsCard from "../components/NewsCard";
import "../App.scss";
import { Link } from "react-router-dom";
import { HeaderContext, NewsContext } from "./Layout";
import { ApiService } from "../services/ApiService";

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

export const RootPage = () => {
  const { initialNews, setInitialNews, news, setNews } =
    useContext(NewsContext);
  const { searchText } = useContext(HeaderContext); //teleporting "searchText"

  useEffect(() => {
    loadNews();
  }, []);

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

  const loadNews = () => {
    ApiService.getAllPosts().then((res) => {
      setNews(res);
      setInitialNews(res);
    });
  };

  return (
    //в arrow function => {нужно писать return}(НЕ нужно писать return)
    <>
      <div className="container">
        {news.map((newsItem: any) => (
          <Link key={newsItem.id} to={`/details/${newsItem.id}`}>
            <NewsCard news={newsItem} />
          </Link>
        ))}
      </div>
    </>
  );
};
