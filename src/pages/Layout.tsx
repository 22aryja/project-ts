import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { createContext, useState } from "react";
import { News } from "./RootPage";

type HeaderContextType = {
  searchText: string;
  setSearchText: (input: string) => void;
};

type TNewsContext = {
  initialNews: News[];
  setInitialNews: (news: News[]) => void;
  news: News[];
  setNews: (news: News[]) => void;
};

export const HeaderContext = createContext<HeaderContextType>({
  //preparing "searchText" and "setSearchText" for teleporting
  searchText: "",
  setSearchText: () => {},
});

export const NewsContext = createContext<TNewsContext>({
  initialNews: [],
  setInitialNews: () => {},
  news: [],
  setNews: () => {},
});

export const Layout = () => {
  const [searchText, setSearchText] = useState<string>("");
  const [news, setNews] = useState<News[]>([]);
  const [initialNews, setInitialNews] = useState<News[]>([]);

  return (
    <HeaderContext.Provider value={{ searchText, setSearchText }}>
      <NewsContext.Provider
        value={{ initialNews, setInitialNews, news, setNews }}
      >
        <Navbar />
        <Outlet />
      </NewsContext.Provider>
      <Footer />
    </HeaderContext.Provider>
  );
};
