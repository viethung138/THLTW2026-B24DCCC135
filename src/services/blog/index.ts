// Blog Services - Utility functions for blog operations

/**
 * Generate slug from title
 */
export const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
};

/**
 * Generate unique ID
 */
export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

/**
 * Format date to readable string
 */
export const formatDate = (date: string | Date): string => {
  const d = new Date(date);
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  return d.toLocaleDateString('vi-VN', options);
};

/**
 * Parse markdown to HTML
 */
export const parseMarkdown = (markdown: string): string => {
  let html = markdown;

  // Headers
  html = html.replace(/^### (.*?)$/gm, '<h3>$1</h3>');
  html = html.replace(/^## (.*?)$/gm, '<h2>$1</h2>');
  html = html.replace(/^# (.*?)$/gm, '<h1>$1</h1>');

  // Bold and Italic
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
  html = html.replace(/__(.*?)__/g, '<strong>$1</strong>');
  html = html.replace(/_(.*?)_/g, '<em>$1</em>');

  // Code blocks
  html = html.replace(/```(.*?)\n([\s\S]*?)```/g, '<pre><code>$2</code></pre>');

  // Inline code
  html = html.replace(/`(.*?)`/g, '<code>$1</code>');

  // Line breaks
  html = html.replace(/\n/g, '<br />');

  // Lists
  html = html.replace(/^\- (.*?)$/gm, '<li>$1</li>');
  html = html.replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>');

  return html;
};

/**
 * Truncate text to specified length
 */
export const truncateText = (text: string, length: number = 100): string => {
  if (text.length <= length) return text;
  return text.substring(0, length) + '...';
};

/**
 * Get related posts
 */
export const getRelatedPosts = (
  posts: Blog.Post[],
  currentPost: Blog.Post,
  limit: number = 3
): Blog.Post[] => {
  const relatedPostIds = new Set<string>();
  const relatedPosts: Blog.Post[] = [];

  // Find posts with same tags
  posts.forEach((post) => {
    if (post.id !== currentPost.id && post.status === 'published') {
      const hasCommonTag = post.tags.some((tag) =>
        currentPost.tags.some((t) => t.id === tag.id)
      );
      if (hasCommonTag && !relatedPostIds.has(post.id)) {
        relatedPostIds.add(post.id);
        relatedPosts.push(post);
      }
    }
  });

  // If not enough related posts, add recent posts
  if (relatedPosts.length < limit) {
    posts.forEach((post) => {
      if (post.id !== currentPost.id && !relatedPostIds.has(post.id)) {
        relatedPostIds.add(post.id);
        relatedPosts.push(post);
      }
    });
  }

  return relatedPosts.slice(0, limit);
};
