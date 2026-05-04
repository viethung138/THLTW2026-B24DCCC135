import { useState, useCallback, useEffect } from 'react';

const STORAGE_KEYS = {
  POSTS: 'blog_posts',
  TAGS: 'blog_tags',
  AUTHOR: 'blog_author',
};

const defaultAuthor: Blog.Author = {
  name: 'Nguyễn Văn A',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=blogger',
  bio: 'Full-stack developer passionate about creating beautiful and functional web applications.',
  skills: ['React', 'TypeScript', 'Node.js', 'Umi.js', 'Ant Design', 'Web Development'],
  socialLinks: {
    github: 'https://github.com',
    twitter: 'https://twitter.com',
    linkedin: 'https://linkedin.com',
    facebook: 'https://facebook.com',
    email: 'contact@example.com',
  },
};

const defaultTags: Blog.Tag[] = [
  { id: '1', name: 'React', slug: 'react' },
  { id: '2', name: 'TypeScript', slug: 'typescript' },
  { id: '3', name: 'Web Development', slug: 'web-development' },
  { id: '4', name: 'Tutorial', slug: 'tutorial' },
  { id: '5', name: 'JavaScript', slug: 'javascript' },
];

const defaultPosts: Blog.Post[] = [
  {
    id: '1',
    title: 'Getting Started with React Hooks',
    slug: 'getting-started-with-react-hooks',
    summary: 'Learn the basics of React Hooks and how to use them in your projects.',
    content: `# React Hooks Guide

React Hooks are functions that let you use state and other React features without writing a class component.

## Why Hooks?

- Simpler component logic
- Better code organization
- Easier to share stateful logic between components

## Basic Hooks

### useState

\`\`\`javascript
const [count, setCount] = useState(0);
\`\`\`

### useEffect

\`\`\`javascript
useEffect(() => {
  document.title = \`Count: \${count}\`;
}, [count]);
\`\`\`

### useContext

Context allows you to pass data through the component tree without having to pass props down manually.`,
    avatar: 'https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=500&h=300&fit=crop',
    author: 'Nguyễn Văn A',
    authorBio: 'Full-stack developer',
    authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=blogger1',
    tags: [
      { id: '1', name: 'React', slug: 'react' },
      { id: '2', name: 'TypeScript', slug: 'typescript' },
    ],
    status: 'published',
    viewCount: 150,
    createdAt: '2024-01-15',
    updatedAt: '2024-01-15',
  },
  {
    id: '2',
    title: 'TypeScript Best Practices',
    slug: 'typescript-best-practices',
    summary: 'Explore best practices for writing clean and maintainable TypeScript code.',
    content: `# TypeScript Best Practices

TypeScript is a typed superset of JavaScript that helps catch errors at compile time.

## Type Annotations

Always annotate function parameters and return types:

\`\`\`typescript
function greet(name: string): string {
  return \`Hello, \${name}!\`;
}
\`\`\`

## Use Interfaces

Define clear interfaces for your data structures:

\`\`\`typescript
interface User {
  id: number;
  name: string;
  email: string;
}
\`\`\`

## Avoid Any

Never use \`any\` type. Use \`unknown\` or specific types instead.`,
    avatar: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500&h=300&fit=crop',
    author: 'Nguyễn Văn A',
    authorBio: 'Full-stack developer',
    authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=blogger1',
    tags: [
      { id: '2', name: 'TypeScript', slug: 'typescript' },
      { id: '3', name: 'Web Development', slug: 'web-development' },
    ],
    status: 'published',
    viewCount: 120,
    createdAt: '2024-01-10',
    updatedAt: '2024-01-10',
  },
  {
    id: '3',
    title: 'Web Development Tutorial',
    slug: 'web-development-tutorial',
    summary: 'A comprehensive guide to modern web development.',
    content: `# Web Development Tutorial

## Frontend

- HTML, CSS, JavaScript
- React for UI building
- Responsive design

## Backend

- Node.js with Express
- Database management
- RESTful APIs

## Deployment

- GitHub for version control
- Docker for containerization
- Cloud platforms for hosting`,
    avatar: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=300&fit=crop',
    author: 'Nguyễn Văn A',
    authorBio: 'Full-stack developer',
    authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=blogger1',
    tags: [
      { id: '3', name: 'Web Development', slug: 'web-development' },
      { id: '4', name: 'Tutorial', slug: 'tutorial' },
    ],
    status: 'published',
    viewCount: 200,
    createdAt: '2024-01-05',
    updatedAt: '2024-01-05',
  },
];

export default () => {
  const [posts, setPosts] = useState<Blog.Post[]>([]);
  const [tags, setTags] = useState<Blog.Tag[]>([]);
  const [author, setAuthor] = useState<Blog.Author>(defaultAuthor);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [searchKeyword, setSearchKeyword] = useState<string>('');

  // Initialize data from localStorage
  useEffect(() => {
    const storedPosts = localStorage.getItem(STORAGE_KEYS.POSTS);
    const storedTags = localStorage.getItem(STORAGE_KEYS.TAGS);
    const storedAuthor = localStorage.getItem(STORAGE_KEYS.AUTHOR);

    if (storedPosts) {
      try {
        setPosts(JSON.parse(storedPosts));
      } catch {
        setPosts(defaultPosts);
      }
    } else {
      setPosts(defaultPosts);
      localStorage.setItem(STORAGE_KEYS.POSTS, JSON.stringify(defaultPosts));
    }

    if (storedTags) {
      try {
        setTags(JSON.parse(storedTags));
      } catch {
        setTags(defaultTags);
      }
    } else {
      setTags(defaultTags);
      localStorage.setItem(STORAGE_KEYS.TAGS, JSON.stringify(defaultTags));
    }

    if (storedAuthor) {
      try {
        setAuthor(JSON.parse(storedAuthor));
      } catch {
        setAuthor(defaultAuthor);
      }
    } else {
      localStorage.setItem(STORAGE_KEYS.AUTHOR, JSON.stringify(defaultAuthor));
    }
  }, []);

  // Save posts to localStorage
  const savePost = useCallback(
    (post: Blog.Post) => {
      let updatedPosts = posts;
      const existingIndex = posts.findIndex((p) => p.id === post.id);

      if (existingIndex > -1) {
        updatedPosts = [
          ...posts.slice(0, existingIndex),
          post,
          ...posts.slice(existingIndex + 1),
        ];
      } else {
        updatedPosts = [...posts, post];
      }

      setPosts(updatedPosts);
      localStorage.setItem(STORAGE_KEYS.POSTS, JSON.stringify(updatedPosts));
      return post;
    },
    [posts]
  );

  // Delete post
  const deletePost = useCallback(
    (postId: string) => {
      const updatedPosts = posts.filter((p) => p.id !== postId);
      setPosts(updatedPosts);
      localStorage.setItem(STORAGE_KEYS.POSTS, JSON.stringify(updatedPosts));
    },
    [posts]
  );

  // Update view count
  const incrementViewCount = useCallback(
    (postId: string) => {
      const updatedPosts = posts.map((p) =>
        p.id === postId ? { ...p, viewCount: p.viewCount + 1 } : p
      );
      setPosts(updatedPosts);
      localStorage.setItem(STORAGE_KEYS.POSTS, JSON.stringify(updatedPosts));
    },
    [posts]
  );

  // Save tag
  const saveTag = useCallback(
    (tag: Blog.Tag) => {
      let updatedTags = tags;
      const existingIndex = tags.findIndex((t) => t.id === tag.id);

      if (existingIndex > -1) {
        updatedTags = [
          ...tags.slice(0, existingIndex),
          tag,
          ...tags.slice(existingIndex + 1),
        ];
      } else {
        updatedTags = [...tags, tag];
      }

      setTags(updatedTags);
      localStorage.setItem(STORAGE_KEYS.TAGS, JSON.stringify(updatedTags));
      return tag;
    },
    [tags]
  );

  // Delete tag
  const deleteTag = useCallback(
    (tagId: string) => {
      const updatedTags = tags.filter((t) => t.id !== tagId);
      setTags(updatedTags);
      localStorage.setItem(STORAGE_KEYS.TAGS, JSON.stringify(updatedTags));

      // Remove tag from posts
      const updatedPosts = posts.map((p) => ({
        ...p,
        tags: p.tags.filter((t) => t.id !== tagId),
      }));
      setPosts(updatedPosts);
      localStorage.setItem(STORAGE_KEYS.POSTS, JSON.stringify(updatedPosts));
    },
    [tags, posts]
  );

  // Get filtered posts
  const getFilteredPosts = useCallback(() => {
    let filtered = posts.filter((p) => p.status === 'published');

    // Filter by selected tags
    if (selectedTags.length > 0) {
      filtered = filtered.filter((p) =>
        p.tags.some((t) => selectedTags.includes(t.id))
      );
    }

    // Search by keyword
    if (searchKeyword) {
      const keyword = searchKeyword.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(keyword) ||
          p.summary.toLowerCase().includes(keyword) ||
          p.content.toLowerCase().includes(keyword)
      );
    }

    return filtered;
  }, [posts, selectedTags, searchKeyword]);

  return {
    posts,
    tags,
    author,
    selectedTags,
    searchKeyword,
    setSelectedTags,
    setSearchKeyword,
    savePost,
    deletePost,
    incrementViewCount,
    saveTag,
    deleteTag,
    getFilteredPosts,
  };
};
