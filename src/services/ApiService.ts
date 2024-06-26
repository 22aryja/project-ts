import { News } from "../pages/RootPage";
import { TComment, TNewComment } from "../components/Comment/Comments";
import { Post } from "../forms/AddArticleForm";

// const BASE_URL = "https://jsonplaceholder.org";
const BASE_URL = "http://156.67.82.204:3000/api";

interface APIPaginatedData<DataType> {
  pages: number;
  count: number;
  records: DataType[];
}

export const ApiService = {
  getAllPosts: async (
    page: number = 1,
    limit: number = 10
  ): Promise<APIPaginatedData<News>> => {
    try {
      const response = await fetch(
        BASE_URL + "/posts?" + `limit=${limit}&page=${page}`,
        {
          method: "GET",
        }
      );
      return response.json();
    } catch (e) {
      throw e;
    }
  },
  getArticle: async (id: number): Promise<News> => {
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
  addArticle: async (article: Post): Promise<News> => {
    // было async (article: News)
    try {
      const response = await fetch(BASE_URL + "/posts/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ post: article }),
      });
      return response.json();
    } catch (e) {
      throw e;
    }
  },
  editArticle: async (news: News): Promise<News> => {
    try {
      const response = await fetch(BASE_URL + `/posts/${news.id}`, {
        method: "PUT", //был PUT
        body: JSON.stringify(news),
      });
      return response.json();
    } catch (e) {
      throw e;
    }
  },
  getComments: async (id: string): Promise<TComment[]> => {
    try {
      const response = await fetch(BASE_URL + `/posts/${id}/comments`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      return response.json();
    } catch (e) {
      throw e;
    }
  },
  editComment: async (comment: TComment): Promise<TComment> => {
    try {
      const response = await fetch(BASE_URL + `/posts/${comment.id}/comments`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(comment),
      });
      return response.json();
    } catch (e) {
      throw e;
    }
  },
  deleteComment: async (commentId: number): Promise<TComment> => {
    try {
      const response = await fetch(BASE_URL + `/posts/${commentId}/comments`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      return await response.json();
    } catch (e) {
      throw e;
    }
  },
  addComment: async (
    newComment: TNewComment,
    id: string
  ): Promise<TComment> => {
    try {
      const response = await fetch(BASE_URL + `/posts/${id}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ comment: newComment }),
      });
      return response.json();
    } catch (e) {
      throw e;
    }
  },
};
