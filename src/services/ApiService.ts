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
  deleteArticle: async (articleId: Number): Promise<News> => {
    try {
      const response = await fetch(BASE_URL + `/posts/${articleId}`, {
        method: "DELETE",
      });
      return response.json();
    } catch (e) {
      throw e;
    }
  },
  addArticle: async (article: News): Promise<News> => {
    try {
      const response = await fetch(BASE_URL + "/posts/", {
        method: "POST",
        body: JSON.stringify(article),
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
  editComment: async (comment: TComment): Promise<TComment> => {
    try {
      const response = await fetch(BASE_URL + `/comments/${comment.id}`, {
        method: "PUT",
        body: JSON.stringify(comment),
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
      return await response.json();
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
