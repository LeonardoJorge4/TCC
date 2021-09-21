import { api } from "../api"

type Post = {
  id: number;
  slug: string;
  admin_id: number;
  banner: string;
  title: string;
  subtitle: string;
  content: string;
  created_at: string;
  updated_at: string;
}

type GetPostsResponse = {
  posts: Post[];
}

export async function getPosts(): Promise<GetPostsResponse> {
  const { data } = await api.get('posts')

  // const posts = data.map(user => {
  //   return {
  //     banner: data.banner,
  //     title: data.title,
  //     subtitle: data.subtitle,
  //     content: data.content,
  //     createdAt: new Date(data.created_at).toLocaleDateString('pt-BR', {
  //       day: '2-digit',
  //       month: '2-digit',
  //       year: 'numeric'
  //     }),
  //     updatedAt: new Date(data.updated_at).toLocaleDateString('pt-BR', {
  //       day: '2-digit',
  //       month: '2-digit',
  //       year: 'numeric'
  //     })
  //   }
  // })

  return { 
    data,
  }
}
