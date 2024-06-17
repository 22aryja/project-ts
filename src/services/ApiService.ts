import { News } from "../pages/RootPage";
import { TComment } from "../components/Comments";

export const ApiService = {
  getAllPosts: async (): Promise<News[]> => {
    try {
      const response = await fetch("https://jsonplaceholder.org/posts", {
        method: "GET",
      });
      return response.json();
    } catch (e) {
      throw e;
    }
  },
  getArticle: async (id: any): Promise<News> => {
    try {
      const response = await fetch(`https://jsonplaceholder.org/posts/${id}`, {
        method: "GET",
      });
      return response.json();
    } catch (e) {
      throw e;
    }
  },
  getComments: async (): Promise<TComment[]> => {
    try {
      const response = await fetch("https://jsonplaceholder.org/comments", {
        method: "GET",
      });
      return response.json();
    } catch (e) {
      throw e;
    }
  },
  editArticle: async (news: News): Promise<News> => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.org/posts/" + news.id,
        {
          method: "PUT",
          body: JSON.stringify(news),
        }
      );
      return response.json();
    } catch (e) {
      throw e;
    }
  },
};
