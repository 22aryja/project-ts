import { useContext } from "react";
import { NewsContext } from "../pages/Layout";
import { useTranslation } from "react-i18next";

export function countTime(time: string): number {
  const day: number = 10 * Number(time[0]) + Number(time[1]);
  const month: number = (10 * Number(time[3]) + Number(time[4])) * 30;
  const year: number = Number(time[6] + time[7] + time[8] + time[9]) * 365;
  return day + month + year;
}

export function Sorting() {
  const { t } = useTranslation();
  const { initialNews, news, setNews } = useContext(NewsContext);
  // const initalNews: News[] = news;

  const sortNewsByDate = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === "default") {
      setNews(initialNews);
    } else if (e.target.value === "publishedAt") {
      const sortedNews = [...news].sort((a, b) => {
        return countTime(a.publishedAt) - countTime(b.publishedAt);
      });
      setNews(sortedNews);
    } else {
      const sortedNews = [...news].sort((a, b) => {
        return countTime(a.updatedAt) - countTime(b.updatedAt);
      });
      setNews(sortedNews);
    }
  };

  return (
    //onSelect оказ не робит
    <select className="nav-select" onChange={sortNewsByDate}>
      <option value="default">{t("sort_by")}</option>
      <option value="updatedAt">updatedAt</option>
      <option value="publishedAt">publishedAt</option>
    </select>
  );
}
