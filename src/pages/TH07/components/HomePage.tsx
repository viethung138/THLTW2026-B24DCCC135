import { useCallback, useMemo, useState } from 'react';
import { Card, Row, Col, Input, Tag, Pagination, Space, Typography, Empty, Avatar } from 'antd';
import { SearchOutlined, EyeOutlined, CalendarOutlined, UserOutlined } from '@ant-design/icons';
import type { BlogPost, Tag as TagType } from '../types';
import { formatDate, getTagNames } from '../utils/storage';

const { Text, Paragraph, Title } = Typography;
const { Meta } = Card;

type Props = {
  posts: BlogPost[];
  tags: TagType[];
  onViewPost: (post: BlogPost) => void;
};

export default function HomePage({ posts, tags, onViewPost }: Props) {
  const [searchText, setSearchText] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);
  const [debounceTimer, setDebounceTimer] = useState<NodeJS.Timeout | null>(null);
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const pageSize = 9;

  const handleSearch = useCallback(
    (value: string) => {
      setSearchText(value);
      if (debounceTimer) clearTimeout(debounceTimer);
      const timer = setTimeout(() => {
        setDebouncedSearch(value);
        setCurrentPage(1);
      }, 300);
      setDebounceTimer(timer);
    },
    [debounceTimer],
  );

  const publishedPosts = useMemo(() => {
    return posts.filter((p) => p.status === 'published');
  }, [posts]);

  const filteredPosts = useMemo(() => {
    return publishedPosts.filter((post) => {
      const matchesTag = !selectedTag || post.tags.includes(selectedTag);
      const matchesSearch =
        !debouncedSearch ||
        post.title.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        post.summary.toLowerCase().includes(debouncedSearch.toLowerCase());
      return matchesTag && matchesSearch;
    });
  }, [publishedPosts, selectedTag, debouncedSearch]);

  const paginatedPosts = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredPosts.slice(start, start + pageSize);
  }, [filteredPosts, currentPage]);

  const handleTagClick = (tagId: string) => {
    setSelectedTag(selectedTag === tagId ? '' : tagId);
    setCurrentPage(1);
  };

  const tagCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    publishedPosts.forEach((post) => {
      post.tags.forEach((tagId) => {
        counts[tagId] = (counts[tagId] || 0) + 1;
      });
    });
    return counts;
  }, [publishedPosts]);

  return (
    <div>
      <div style={{ textAlign: 'center', marginBottom: 32 }}>
        <Title level={2} style={{ marginBottom: 8 }}>
          Blog Cá Nhân
        </Title>
        <Paragraph type="secondary" style={{ fontSize: 16 }}>
          Chia sẻ kiến thức lập trình và công nghệ web
        </Paragraph>
      </div>

      <div style={{ maxWidth: 500, margin: '0 auto 24px' }}>
        <Input
          prefix={<SearchOutlined />}
          placeholder="Tìm kiếm bài viết theo từ khóa..."
          allowClear
          size="large"
          value={searchText}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>

      <div style={{ textAlign: 'center', marginBottom: 24 }}>
        <Space wrap>
          <Tag
            color={!selectedTag ? '#1890ff' : undefined}
            style={{ cursor: 'pointer', padding: '4px 12px', fontSize: 14 }}
            onClick={() => handleTagClick('')}
          >
            Tất cả ({publishedPosts.length})
          </Tag>
          {tags.map((tag) => (
            <Tag
              key={tag.id}
              color={selectedTag === tag.id ? '#1890ff' : undefined}
              style={{ cursor: 'pointer', padding: '4px 12px', fontSize: 14 }}
              onClick={() => handleTagClick(tag.id)}
            >
              {tag.name} ({tagCounts[tag.id] || 0})
            </Tag>
          ))}
        </Space>
      </div>

      {paginatedPosts.length === 0 ? (
        <Empty description="Không tìm thấy bài viết nào" style={{ padding: 60 }} />
      ) : (
        <Row gutter={[16, 16]}>
          {paginatedPosts.map((post) => (
            <Col xs={24} sm={12} md={8} key={post.id}>
              <Card
                hoverable
                onClick={() => onViewPost(post)}
                cover={
                  <img
                    alt={post.title}
                    src={post.coverImage}
                    style={{ height: 180, objectFit: 'cover' }}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        'https://via.placeholder.com/400x200?text=Blog+Post';
                    }}
                  />
                }
                bodyStyle={{ padding: 16 }}
              >
                <Meta
                  title={
                    <Title level={5} ellipsis={{ rows: 2 }} style={{ marginBottom: 0 }}>
                      {post.title}
                    </Title>
                  }
                  description={
                    <Space direction="vertical" style={{ width: '100%' }} size={8}>
                      <Paragraph
                        type="secondary"
                        ellipsis={{ rows: 2 }}
                        style={{ marginBottom: 0 }}
                      >
                        {post.summary}
                      </Paragraph>

                      <Space wrap size={[4, 4]}>
                        {getTagNames(tags, post.tags).map((tagName) => (
                          <Tag key={tagName} color="blue" style={{ margin: 0 }}>
                            {tagName}
                          </Tag>
                        ))}
                      </Space>

                      <Space
                        split={<span style={{ color: '#d9d9d9' }}>•</span>}
                        style={{ fontSize: 12 }}
                      >
                        <Space size={4}>
                          <Avatar size={18} icon={<UserOutlined />} />
                          <Text type="secondary" style={{ fontSize: 12 }}>
                            {post.author}
                          </Text>
                        </Space>
                        <Space size={4}>
                          <CalendarOutlined style={{ color: '#999' }} />
                          <Text type="secondary" style={{ fontSize: 12 }}>
                            {formatDate(post.createdAt)}
                          </Text>
                        </Space>
                        <Space size={4}>
                          <EyeOutlined style={{ color: '#999' }} />
                          <Text type="secondary" style={{ fontSize: 12 }}>
                            {post.views}
                          </Text>
                        </Space>
                      </Space>
                    </Space>
                  }
                />
              </Card>
            </Col>
          ))}
        </Row>
      )}

      {filteredPosts.length > pageSize && (
        <div style={{ textAlign: 'center', marginTop: 32 }}>
          <Pagination
            current={currentPage}
            total={filteredPosts.length}
            pageSize={pageSize}
            onChange={(page) => setCurrentPage(page)}
            showSizeChanger={false}
            showTotal={(total) => `Tổng ${total} bài viết`}
          />
        </div>
      )}
    </div>
  );
}