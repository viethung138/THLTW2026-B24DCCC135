import { Card, Col, Row, Space, Tag, Typography, Avatar, Divider } from 'antd';
import {
  GithubOutlined,
  FacebookOutlined,
  TwitterOutlined,
  LinkedinOutlined,
  MailOutlined,
  CodeOutlined,
  UserOutlined,
} from '@ant-design/icons';
import type { Author } from '../types';

const { Title, Text, Paragraph, Link } = Typography;

type Props = {
  author: Author;
};

const socialIcons: Record<string, JSX.Element> = {
  github: <GithubOutlined />,
  facebook: <FacebookOutlined />,
  twitter: <TwitterOutlined />,
  linkedin: <LinkedinOutlined />,
  email: <MailOutlined />,
};

const socialColors: Record<string, string> = {
  github: '#24292e',
  facebook: '#1877F2',
  twitter: '#1DA1F2',
  linkedin: '#0A66C2',
  email: '#EA4335',
};

export default function AboutPage({ author }: Props) {
  return (
    <div style={{ maxWidth: 800, margin: '0 auto' }}>
      <Card bodyStyle={{ padding: 40 }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <Avatar
            size={120}
            src={author.avatar}
            icon={<UserOutlined />}
            style={{ marginBottom: 16, border: '4px solid #f0f0f0' }}
          />
          <Title level={2} style={{ marginBottom: 4 }}>
            {author.name}
          </Title>
          <Text type="secondary" style={{ fontSize: 16 }}>
            Full-stack Developer
          </Text>
        </div>

        <Divider />

        <div style={{ marginBottom: 32 }}>
          <Title level={4}>
            <UserOutlined style={{ marginRight: 8 }} />
            Giới thiệu
          </Title>
          <Paragraph style={{ fontSize: 15, lineHeight: 1.8 }}>{author.bio}</Paragraph>
        </div>

        <Divider />

        <div style={{ marginBottom: 32 }}>
          <Title level={4}>
            <CodeOutlined style={{ marginRight: 8 }} />
            Kỹ năng
          </Title>
          <Row gutter={[8, 8]}>
            {author.skills.map((skill) => (
              <Col key={skill}>
                <Tag
                  color="blue"
                  style={{
                    padding: '4px 16px',
                    fontSize: 14,
                    borderRadius: 16,
                  }}
                >
                  {skill}
                </Tag>
              </Col>
            ))}
          </Row>
        </div>

        <Divider />

        <div>
          <Title level={4}>Liên kết</Title>
          <Space direction="vertical" size={12} style={{ width: '100%' }}>
            {Object.entries(author.social).map(([key, url]) => {
              if (!url) return null;
              const icon = socialIcons[key];
              const color = socialColors[key];
              const label = key.charAt(0).toUpperCase() + key.slice(1);
              const href = key === 'email' ? `mailto:${url}` : url;

              return (
                <Card
                  key={key}
                  size="small"
                  hoverable
                  bodyStyle={{ padding: '12px 16px' }}
                >
                  <Space>
                    <span style={{ color, fontSize: 20 }}>{icon}</span>
                    <div>
                      <Text strong>{label}</Text>
                      <br />
                      <Link href={href} target="_blank" style={{ fontSize: 13 }}>
                        {url}
                      </Link>
                    </div>
                  </Space>
                </Card>
              );
            })}
          </Space>
        </div>
      </Card>
    </div>
  );
}