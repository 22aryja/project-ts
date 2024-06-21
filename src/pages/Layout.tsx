import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import { Dispatch, SetStateAction, createContext, useState } from "react";
import { News } from "./RootPage";
import { TComment } from "../components/Comment/Comments";
import { newCommentDataType } from "./DetailsPage";

//типы для context'ов -------------------
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

type AddCommentContextType = {
  newComments: TComment[];
  setNewComments: Dispatch<SetStateAction<TComment[]>>;
  adding: newCommentDataType;
  setAdding: Dispatch<SetStateAction<newCommentDataType>>;
  comments: TComment[];
  setComments: Dispatch<SetStateAction<TComment[]>>;
};

//context'ы ---------------------------
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

//context для добавления комментариев
let newCommentData = {
  isButtonClicked: false,
  inputUserId: 0,
  inputContent: "",
};

export const AddCommentContext = createContext<AddCommentContextType>({
  newComments: [],
  setNewComments: () => {},
  adding: newCommentData,
  setAdding: () => {},
  comments: [],
  setComments: () => {},
});

export const Layout = () => {
  //для поиска по тексту
  const [searchText, setSearchText] = useState<string>("");
  const [news, setNews] = useState<News[]>([]);
  const [initialNews, setInitialNews] = useState<News[]>([]);

  //для добавления/удаления комментов
  const [comments, setComments] = useState<TComment[]>([]);
  const [adding, setAdding] = useState<newCommentDataType>(newCommentData);
  const [newComments, setNewComments] = useState<TComment[]>([]);

  return (
    <HeaderContext.Provider value={{ searchText, setSearchText }}>
      <NewsContext.Provider
        value={{ initialNews, setInitialNews, news, setNews }}
      >
        <Navbar />
        <AddCommentContext.Provider
          value={{
            newComments,
            setNewComments,
            adding,
            setAdding,
            comments,
            setComments,
          }}
        >
          <Outlet />
        </AddCommentContext.Provider>
      </NewsContext.Provider>
      <Footer />
    </HeaderContext.Provider>
  );
};
