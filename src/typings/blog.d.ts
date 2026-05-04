declare namespace Blog {
  interface Tag {
    id: string;
    name: string;
    slug: string;
  }

  interface Post {
    id: string;
    title: string;
    slug: string;
    summary: string;
    content: string;
    avatar: string;
    author: string;
    authorBio?: string;
    authorAvatar?: string;
    tags: Tag[];
    status: 'draft' | 'published';
    viewCount: number;
    createdAt: string;
    updatedAt: string;
  }

  interface Author {
    name: string;
    avatar: string;
    bio: string;
    skills: string[];
    socialLinks: {
      github?: string;
      twitter?: string;
      linkedin?: string;
      facebook?: string;
      email?: string;
    };
  }

  interface BlogState {
    posts: Post[];
    tags: Tag[];
    author: Author;
    selectedTags: string[];
    searchKeyword: string;
    filteredPosts: Post[];
  }
}
