export interface BlogPost {
  id: string;
  title: string;
  content: string;
  author: string;
  created_at: string;
  updated_at: string;
}

export interface CreateBlogPost {
  title: string;
  content: string;
  author: string;
}

export interface UpdateBlogPost {
  title?: string;
  content?: string;
  author?: string;
}