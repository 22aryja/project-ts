import { News } from "../pages/RootPage";
import { TComment } from "../components/Comments";

const BASE_URL = "https://jsonplaceholder.org";

export const ApiService = {
  getAllPosts: async (): Promise<News[]> => {
    try {
      const response = await fetch(BASE_URL + "/posts", {
        method: "GET",
      });
      return response.json();
    } catch (e) {
      throw e;
    }
  },
  getArticle: async (id: any): Promise<News> => {
    try {
      const response = await fetch(BASE_URL + `/posts/${id}`, {
        method: "GET",
      });
      return response.json();
    } catch (e) {
      throw e;
    }
  },
  getComments: async (): Promise<TComment[]> => {
    try {
      const response = await fetch(BASE_URL + "/comments", {
        method: "GET",
      });
      return response.json();
    } catch (e) {
      throw e;
    }
  },
  editArticle: async (news: News): Promise<News> => {
    try {
      const response = await fetch(BASE_URL + `/posts/${news.id}`, {
        method: "PUT",
        body: JSON.stringify(news),
      });
      return response.json();
    } catch (e) {
      throw e;
    }
  },
  deleteComment: async (commentId: number): Promise<TComment> => {
    try {
      const response = await fetch(BASE_URL + `/comments/${commentId}`, {
        method: "DELETE",
      });
      return response.json();
    } catch (e) {
      throw e;
    }
  },
  addComment: async (newComment: TComment): Promise<TComment> => {
    try {
      const response = await fetch(BASE_URL + "/comments/", {
        method: "POST",
        body: JSON.stringify(newComment),
      });
      return response.json();
    } catch (e) {
      throw e;
    }
  },
};
