export type PostStatus = 'draft' | 'published';

export type Tag = {
  id: string;
  name: string;
};

export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  content: string;
  summary: string;
  coverImage: string;
  tags: string[];
  status: PostStatus;
  author: string;
  views: number;
  createdAt: string;
  updatedAt: string;
};

export type Author = {
  name: string;
  avatar: string;
  bio: string;
  skills: string[];
  social: {
    github?: string;
    facebook?: string;
    twitter?: string;
    linkedin?: string;
    email?: string;
  };
};