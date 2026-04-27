import { useState, useCallback } from 'react';
import { Tabs, Typography } from 'antd';
import HomePage from './components/HomePage';
import PostDetail from './components/PostDetail';
import AboutPage from './components/AboutPage';
import PostManager from './components/PostManager';
import TagManager from './components/TagManager';
import { initialPosts, initialTags, authorInfo } from './utils/storage';
import type { BlogPost, Tag } from './types';

const { Title } = Typography;

function TH07Page() {
  const [posts, setPosts] = useState<BlogPost[]>(initialPosts);
  const [tags, setTags] = useState<Tag[]>(initialTags);
  const [viewingPost, setViewingPost] = useState<BlogPost | null>(null);
  const [activeTab, setActiveTab] = useState('1');

  const handleViewPost = useCallback(
    (post: BlogPost) => {
      const updated = posts.map((p) =>
        p.id === post.id ? { ...p, views: p.views + 1 } : p,
      );
      setPosts(updated);
      const updatedPost = updated.find((p) => p.id === post.id)!;
      setViewingPost(updatedPost);
    },
    [posts],
  );

  const handleBack = useCallback(() => {
    setViewingPost(null);
  }, []);

  const handleSavePost = useCallback(
    (post: BlogPost) => {
      const exists = posts.find((p) => p.id === post.id);
      if (exists) {
        setPosts((current) => current.map((p) => (p.id === post.id ? post : p)));
      } else {
        setPosts((current) => [post, ...current]);
      }
    },
    [posts],
  );

  const handleDeletePost = useCallback((id: string) => {
    setPosts((current) => current.filter((p) => p.id !== id));
  }, []);

  const handleSaveTag = useCallback(
    (tag: Tag) => {
      const exists = tags.find((t) => t.id === tag.id);
      if (exists) {
        setTags((current) => current.map((t) => (t.id === tag.id ? tag : t)));
      } else {
        setTags((current) => [...current, tag]);
      }
    },
    [tags],
  );

  const handleDeleteTag = useCallback((id: string) => {
    setTags((current) => current.filter((t) => t.id !== id));
  }, []);

  const handleTabChange = (key: string) => {
    setActiveTab(key);
    setViewingPost(null);
  };

  return (
    <div style={{ padding: 20 }}>
      <Title level={2}>Blog Cá Nhân</Title>
      <Tabs activeKey={activeTab} onChange={handleTabChange} type="line">
        <Tabs.TabPane tab="Trang chủ" key="1">
          {viewingPost ? (
            <PostDetail
              post={viewingPost}
              posts={posts}
              tags={tags}
              onBack={handleBack}
              onViewPost={handleViewPost}
            />
          ) : (
            <HomePage posts={posts} tags={tags} onViewPost={handleViewPost} />
          )}
        </Tabs.TabPane>
        <Tabs.TabPane tab="Giới thiệu" key="2">
          <AboutPage author={authorInfo} />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Quản lý bài viết" key="3">
          <PostManager
            posts={posts}
            tags={tags}
            onSave={handleSavePost}
            onDelete={handleDeletePost}
          />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Quản lý thẻ" key="4">
          <TagManager
            tags={tags}
            posts={posts}
            onSave={handleSaveTag}
            onDelete={handleDeleteTag}
          />
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
}

export default TH07Page;