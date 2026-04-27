import { useMemo } from 'react';
import { Button, Card, Col, Row, Space, Tag, Typography, Avatar, Divider } from 'antd';
import {
  ArrowLeftOutlined,
  CalendarOutlined,
  EyeOutlined,
  UserOutlined,
} from '@ant-design/icons';
import type { BlogPost, Tag as TagType } from '../types';
import { formatDate, getRelatedPosts, getTagNames } from '../utils/storage';

const { Title, Text, Paragraph } = Typography;

type Props = {
  post: BlogPost;
  posts: BlogPost[];
  tags: TagType[];
  onBack: () => void;
  onViewPost: (post: BlogPost) => void;
};

function renderMarkdown(content: string): JSX.Element {
  const lines = content.split('\n');
  const elements: JSX.Element[] = [];
  let inCodeBlock = false;
  let codeContent: string[] = [];
  let codeLanguage = '';
  let blockIndex = 0;

  const processInline = (text: string): (string | JSX.Element)[] => {
    const parts: (string | JSX.Element)[] = [];
    const regex = /(`[^`]+`|\*\*[^*]+\*\*|\*[^*]+\*)/g;
    let lastIndex = 0;
    let match;

    while ((match = regex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push(text.slice(lastIndex, match.index));
      }
      const token = match[0];
      if (token.startsWith('`') && token.endsWith('`')) {
        parts.push(
          <code
            key={`ic-${match.index}`}
            style={{
              background: '#f5f5f5',
              padding: '2px 6px',
              borderRadius: 4,
              fontSize: '0.9em',
              color: '#d63384',
            }}
          >
            {token.slice(1, -1)}
          </code>,
        );
      } else if (token.startsWith('**') && token.endsWith('**')) {
        parts.push(<strong key={`b-${match.index}`}>{token.slice(2, -2)}</strong>);
      } else if (token.startsWith('*') && token.endsWith('*')) {
        parts.push(<em key={`i-${match.index}`}>{token.slice(1, -1)}</em>);
      }
      lastIndex = regex.lastIndex;
    }
    if (lastIndex < text.length) {
      parts.push(text.slice(lastIndex));
    }
    return parts;
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line.trim().startsWith('```')) {
      if (!inCodeBlock) {
        inCodeBlock = true;
        codeLanguage = line.trim().slice(3).trim();
        codeContent = [];
        continue;
      } else {
        inCodeBlock = false;
        elements.push(
          <pre
            key={`code-${blockIndex++}`}
            style={{
              background: '#282c34',
              color: '#abb2bf',
              padding: 16,
              borderRadius: 8,
              overflow: 'auto',
              fontSize: 14,
              lineHeight: 1.6,
              margin: '12px 0',
            }}
          >
            {codeLanguage && (
              <div
                style={{
                  color: '#61afef',
                  fontSize: 12,
                  marginBottom: 8,
                  textTransform: 'uppercase',
                }}
              >
                {codeLanguage}
              </div>
            )}
            <code>{codeContent.join('\n')}</code>
          </pre>,
        );
        continue;
      }
    }

    if (inCodeBlock) {
      codeContent.push(line);
      continue;
    }

    if (!line.trim()) {
      elements.push(<div key={`empty-${i}`} style={{ height: 8 }} />);
      continue;
    }

    if (line.startsWith('### ')) {
      elements.push(
        <Title key={`h3-${i}`} level={4} style={{ marginTop: 20, marginBottom: 8 }}>
          {line.slice(4)}
        </Title>,
      );
      continue;
    }
    if (line.startsWith('## ')) {
      elements.push(
        <Title key={`h2-${i}`} level={3} style={{ marginTop: 24, marginBottom: 12 }}>
          {line.slice(3)}
        </Title>,
      );
      continue;
    }
    if (line.startsWith('# ')) {
      elements.push(
        <Title key={`h1-${i}`} level={2} style={{ marginTop: 28, marginBottom: 16 }}>
          {line.slice(2)}
        </Title>,
      );
      continue;
    }

    if (line.trim().startsWith('- ')) {
      const indent = line.search(/\S/);
      elements.push(
        <div key={`li-${i}`} style={{ paddingLeft: indent * 8 + 16, marginBottom: 4 }}>
          <span style={{ marginRight: 8 }}>•</span>
          {processInline(line.trim().slice(2))}
        </div>,
      );
      continue;
    }

    const orderedMatch = line.trim().match(/^(\d+)\.\s+(.*)/);
    if (orderedMatch) {
      elements.push(
        <div key={`ol-${i}`} style={{ paddingLeft: 16, marginBottom: 4 }}>
          <span style={{ marginRight: 8 }}>{orderedMatch[1]}.</span>
          {processInline(orderedMatch[2])}
        </div>,
      );
      continue;
    }

    elements.push(
      <Paragraph key={`p-${i}`} style={{ marginBottom: 8, lineHeight: 1.8, fontSize: 15 }}>
        {processInline(line)}
      </Paragraph>,
    );
  }

  return <div>{elements}</div>;
}

export default function PostDetail({ post, posts, tags, onBack, onViewPost }: Props) {
  const relatedPosts = useMemo(() => getRelatedPosts(posts, post, 3), [posts, post]);

  return (
    <div>
      <Button
        type="link"
        icon={<ArrowLeftOutlined />}
        onClick={onBack}
        style={{ marginBottom: 16, paddingLeft: 0, fontSize: 15 }}
      >
        Quay lại danh sách
      </Button>

      <Card bodyStyle={{ padding: 32 }}>
        <div style={{ marginBottom: 24, borderRadius: 12, overflow: 'hidden' }}>
          <img
            alt={post.title}
            src={post.coverImage}
            style={{ width: '100%', maxHeight: 400, objectFit: 'cover' }}
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                'https://via.placeholder.com/800x400?text=Blog+Post';
            }}
          />
        </div>

        <Title level={2} style={{ marginBottom: 16 }}>
          {post.title}
        </Title>

        <Space
          size={16}
          wrap
          split={<Divider type="vertical" />}
          style={{ marginBottom: 16 }}
        >
          <Space>
            <Avatar size={28} icon={<UserOutlined />} />
            <Text strong>{post.author}</Text>
          </Space>
          <Space>
            <CalendarOutlined />
            <Text type="secondary">{formatDate(post.createdAt)}</Text>
          </Space>
          <Space>
            <EyeOutlined />
            <Text type="secondary">{post.views} lượt xem</Text>
          </Space>
        </Space>

        <div style={{ marginBottom: 24 }}>
          <Space wrap>
            {getTagNames(tags, post.tags).map((tagName) => (
              <Tag key={tagName} color="blue">
                {tagName}
              </Tag>
            ))}
          </Space>
        </div>

        <Divider />

        <div style={{ maxWidth: 800 }}>{renderMarkdown(post.content)}</div>
      </Card>

      {relatedPosts.length > 0 && (
        <div style={{ marginTop: 32 }}>
          <Title level={4}>Bài viết liên quan</Title>
          <Row gutter={[16, 16]}>
            {relatedPosts.map((rp) => (
              <Col xs={24} sm={12} md={8} key={rp.id}>
                <Card
                  hoverable
                  onClick={() => onViewPost(rp)}
                  cover={
                    <img
                      alt={rp.title}
                      src={rp.coverImage}
                      style={{ height: 140, objectFit: 'cover' }}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          'https://via.placeholder.com/400x200?text=Blog+Post';
                      }}
                    />
                  }
                  bodyStyle={{ padding: 12 }}
                >
                  <Title level={5} ellipsis={{ rows: 2 }} style={{ marginBottom: 4 }}>
                    {rp.title}
                  </Title>
                  <Space size={8}>
                    <Text type="secondary" style={{ fontSize: 12 }}>
                      {formatDate(rp.createdAt)}
                    </Text>
                    <Text type="secondary" style={{ fontSize: 12 }}>
                      <EyeOutlined /> {rp.views}
                    </Text>
                  </Space>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      )}
    </div>
  );
}