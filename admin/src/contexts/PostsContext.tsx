import { createContext, useEffect, useState } from "react";
import { api, apiPost } from "../services/api";

interface PostContextProps {
  posts: PostProps;
  getAllPosts: (pageNumber: number) => void;
}

interface PostProps {
  current_page: number;
  data: [
    {
      admin_id: number;
      banner: string;
      content: string;
      created_at: string;
      id: number;
      slug: string;
      subtitle: string;
      title: string;
      updated_at: string;
    }
  ]
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: [
    {
      active: boolean;
      label: string;
      url: string;
    }
  ]
  next_page_url: string;
  path: string;
  per_page: number;
  prev_page_url: any;
  to: number;
  total: number
}

export const PostsContext = createContext<PostContextProps>({} as PostContextProps)

export function PostsProvider({ children }) {
  const [posts, setPosts] = useState<PostProps | null>(null);

  useEffect(() => {
    getAllPosts();
  }, [])

  async function getAllPosts(pageNumber = 1) {
    await apiPost.get(`posts?page=${pageNumber}`)
      .then(response => setPosts(response.data))
      .catch(error => console.log(error))
  }

  return (
    <PostsContext.Provider value={{ getAllPosts, posts }}>
      {children}
    </PostsContext.Provider>
  )
}
