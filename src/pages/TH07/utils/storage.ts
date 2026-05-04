import type { BlogPost, Tag, Author } from '../types';

export const initialTags: Tag[] = [
  { id: '1', name: 'React' },
  { id: '2', name: 'TypeScript' },
  { id: '3', name: 'JavaScript' },
  { id: '4', name: 'CSS' },
  { id: '5', name: 'Node.js' },
  { id: '6', name: 'UmiJS' },
  { id: '7', name: 'Ant Design' },
  { id: '8', name: 'Web Development' },
];

export const authorInfo: Author = {
  name: 'Phạm Minh Tuấn',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
  bio: 'Lập trình viên Full-stack với hơn 3 năm kinh nghiệm phát triển ứng dụng web. Đam mê công nghệ, yêu thích React và hệ sinh thái JavaScript. Hiện đang là sinh viên ngành Công nghệ Thông tin tại Học viện Công nghệ Bưu chính Viễn thông.',
  skills: ['React', 'TypeScript', 'Node.js', 'Python', 'SQL', 'Git', 'Docker', 'Ant Design', 'UmiJS', 'REST API'],
  social: {
    github: 'https://github.com/phamminhtuan',
    facebook: 'https://facebook.com/phamminhtuan',
    twitter: 'https://twitter.com/phamminhtuan',
    linkedin: 'https://linkedin.com/in/phamminhtuan',
    email: 'phamminhtuan@example.com',
  },
};

export const initialPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Bắt đầu với React Hooks',
    slug: 'bat-dau-voi-react-hooks',
    content: `## Giới thiệu React Hooks

React Hooks là một tính năng mạnh mẽ được giới thiệu trong React 16.8, cho phép bạn sử dụng state và các tính năng khác của React mà không cần viết class component.

### useState

\`useState\` là hook cơ bản nhất, cho phép bạn thêm state vào function component:

\`\`\`tsx
const [count, setCount] = useState(0);
\`\`\`

### useEffect

\`useEffect\` cho phép bạn thực hiện các side effects trong function component:

\`\`\`tsx
useEffect(() => {
  document.title = \`Bạn đã click \${count} lần\`;
}, [count]);
\`\`\`

### useMemo và useCallback

Hai hook này giúp tối ưu hiệu năng bằng cách **memoize** giá trị và hàm:

- \`useMemo\`: Memoize giá trị tính toán
- \`useCallback\`: Memoize hàm callback

### Custom Hooks

Bạn có thể tạo custom hooks để tái sử dụng logic giữa các component:

\`\`\`tsx
function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}
\`\`\`

## Kết luận

React Hooks giúp code gọn gàng, dễ đọc và dễ test hơn. Hãy bắt đầu sử dụng Hooks trong dự án của bạn ngay hôm nay!`,
    summary: 'Tìm hiểu về React Hooks - useState, useEffect, useMemo và cách tạo Custom Hooks để viết code React gọn gàng hơn.',
    coverImage: 'https://miro.medium.com/v2/resize:fit:1400/1*-Ijet6kVJqGgul6adezDLQ.png',
    tags: ['1', '3', '8'],
    status: 'published',
    author: 'Phạm Minh Tuấn',
    views: 245,
    createdAt: '2026-04-01T10:00:00Z',
    updatedAt: '2026-04-01T10:00:00Z',
  },
  {
    id: '2',
    title: 'TypeScript cơ bản cho người mới',
    slug: 'typescript-co-ban-cho-nguoi-moi',
    content: `## TypeScript là gì?

TypeScript là một superset của JavaScript, thêm **static typing** giúp phát hiện lỗi sớm trong quá trình phát triển.

### Kiểu dữ liệu cơ bản

\`\`\`typescript
let name: string = "Hello";
let age: number = 25;
let isActive: boolean = true;
let items: string[] = ["a", "b", "c"];
\`\`\`

### Interface và Type

\`\`\`typescript
interface User {
  id: number;
  name: string;
  email?: string; // optional
}

type Status = 'active' | 'inactive' | 'pending';
\`\`\`

### Generics

Generics cho phép tạo component có thể tái sử dụng:

\`\`\`typescript
function identity<T>(arg: T): T {
  return arg;
}

const result = identity<string>("hello");
\`\`\`

### Enum

\`\`\`typescript
enum Direction {
  Up = "UP",
  Down = "DOWN",
  Left = "LEFT",
  Right = "RIGHT",
}
\`\`\`

## Lợi ích của TypeScript

1. **Phát hiện lỗi sớm** tại compile time
2. **Autocomplete** và IntelliSense tốt hơn
3. **Refactoring** an toàn hơn
4. **Documentation** tự động qua types

## Kết luận

TypeScript là công cụ không thể thiếu cho các dự án JavaScript hiện đại. Hãy bắt đầu học ngay!`,
    summary: 'Hướng dẫn TypeScript từ cơ bản đến nâng cao: kiểu dữ liệu, interface, generics và các best practices.',
    coverImage: 'https://miro.medium.com/v2/resize:fit:1400/1*moJeTvW97yShLB7URRj5Kg.png',
    tags: ['2', '3', '8'],
    status: 'published',
    author: 'Phạm Minh Tuấn',
    views: 189,
    createdAt: '2026-04-05T14:30:00Z',
    updatedAt: '2026-04-05T14:30:00Z',
  },
  {
    id: '3',
    title: 'Xây dựng UI đẹp với Ant Design',
    slug: 'xay-dung-ui-dep-voi-ant-design',
    content: `## Ant Design là gì?

Ant Design là thư viện UI component phổ biến cho React, cung cấp bộ component phong phú và đẹp mắt.

### Cài đặt

\`\`\`bash
npm install antd @ant-design/icons
\`\`\`

### Các component phổ biến

#### Button

\`\`\`tsx
import { Button } from 'antd';

<Button type="primary">Primary</Button>
<Button type="default">Default</Button>
<Button type="dashed">Dashed</Button>
<Button danger>Danger</Button>
\`\`\`

#### Table

Table là component mạnh mẽ cho việc hiển thị dữ liệu:

\`\`\`tsx
const columns = [
  { title: 'Name', dataIndex: 'name' },
  { title: 'Age', dataIndex: 'age' },
];

<Table dataSource={data} columns={columns} />
\`\`\`

#### Form

\`\`\`tsx
<Form onFinish={handleSubmit}>
  <Form.Item name="email" rules={[{ required: true }]}>
    <Input placeholder="Email" />
  </Form.Item>
  <Button type="primary" htmlType="submit">Submit</Button>
</Form>
\`\`\`

### Tùy chỉnh theme

Ant Design hỗ trợ tùy chỉnh theme thông qua Less variables hoặc ConfigProvider.

## Kết luận

Ant Design giúp xây dựng giao diện chuyên nghiệp nhanh chóng với bộ component phong phú và thiết kế nhất quán.`,
    summary: 'Hướng dẫn sử dụng Ant Design để xây dựng giao diện người dùng đẹp và chuyên nghiệp cho ứng dụng React.',
    coverImage: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
    tags: ['1', '4', '7'],
    status: 'published',
    author: 'Phạm Minh Tuấn',
    views: 312,
    createdAt: '2026-04-08T09:15:00Z',
    updatedAt: '2026-04-08T09:15:00Z',
  },
  {
    id: '4',
    title: 'CSS Flexbox và Grid Layout',
    slug: 'css-flexbox-va-grid-layout',
    content: `## Flexbox

Flexbox là module layout một chiều, lý tưởng cho việc sắp xếp items theo hàng hoặc cột.

### Container properties

\`\`\`css
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
}
\`\`\`

### Item properties

\`\`\`css
.item {
  flex: 1;
  flex-grow: 1;
  flex-shrink: 0;
  flex-basis: 200px;
}
\`\`\`

## Grid Layout

CSS Grid là module layout hai chiều mạnh mẽ.

### Cơ bản

\`\`\`css
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto;
  gap: 20px;
}
\`\`\`

### Grid Areas

\`\`\`css
.layout {
  display: grid;
  grid-template-areas:
    "header header header"
    "sidebar main main"
    "footer footer footer";
}
\`\`\`

## Khi nào dùng Flexbox vs Grid?

- **Flexbox**: Layout 1 chiều (hàng hoặc cột)
- **Grid**: Layout 2 chiều (hàng và cột cùng lúc)

Cả hai có thể kết hợp để tạo ra layout phức tạp và responsive.`,
    summary: 'So sánh và hướng dẫn sử dụng CSS Flexbox và Grid Layout để tạo bố cục web responsive hiện đại.',
    coverImage: 'https://miro.medium.com/v2/resize:fit:1400/1*XCZZZmhQN4rHLw2dW14BZQ.png',
    tags: ['4', '8'],
    status: 'published',
    author: 'Phạm Minh Tuấn',
    views: 156,
    createdAt: '2026-04-10T16:45:00Z',
    updatedAt: '2026-04-10T16:45:00Z',
  },
  {
    id: '5',
    title: 'Node.js và Express cơ bản',
    slug: 'nodejs-va-express-co-ban',
    content: `## Node.js là gì?

Node.js là runtime JavaScript chạy trên server, sử dụng V8 engine của Chrome.

### Tạo server đơn giản

\`\`\`javascript
const http = require('http');
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello World');
});
server.listen(3000);
\`\`\`

## Express Framework

Express là framework phổ biến nhất cho Node.js.

### Cài đặt

\`\`\`bash
npm install express
\`\`\`

### Routing

\`\`\`javascript
const express = require('express');
const app = express();

app.get('/api/users', (req, res) => {
  res.json([{ id: 1, name: 'User 1' }]);
});

app.post('/api/users', (req, res) => {
  // Create user
});

app.listen(3000);
\`\`\`

### Middleware

\`\`\`javascript
app.use(express.json());
app.use(cors());
app.use(authMiddleware);
\`\`\`

## Kết luận

Node.js và Express là nền tảng vững chắc để xây dựng backend API cho ứng dụng web modern.`,
    summary: 'Bắt đầu với Node.js và Express: tạo server, routing, middleware và xây dựng RESTful API.',
    coverImage: 'https://miro.medium.com/v2/resize:fit:1400/1*XP-mZOrIqX7OsFInN2ngRQ.png',
    tags: ['3', '5', '8'],
    status: 'published',
    author: 'Phạm Minh Tuấn',
    views: 198,
    createdAt: '2026-04-12T11:20:00Z',
    updatedAt: '2026-04-12T11:20:00Z',
  },
  {
    id: '6',
    title: 'Giới thiệu UmiJS Framework',
    slug: 'gioi-thieu-umijs-framework',
    content: `## UmiJS là gì?

UmiJS là enterprise-class React framework do Ant Financial phát triển, tích hợp sẵn routing, build tool và nhiều plugin.

### Tính năng nổi bật

1. **Convention-based Routing**: Tự động tạo route từ cấu trúc thư mục
2. **Plugin System**: Hệ thống plugin mạnh mẽ
3. **Ant Design Pro**: Template dựng sẵn cho ứng dụng enterprise
4. **TypeScript Support**: Hỗ trợ TypeScript out-of-the-box

### Cấu trúc dự án

\`\`\`
├── config/
│   └── routes.ts
├── src/
│   ├── pages/
│   ├── components/
│   └── services/
├── package.json
└── .umirc.ts
\`\`\`

### Routing

\`\`\`typescript
// config/routes.ts
export default [
  { path: '/', component: './Home' },
  { path: '/about', component: './About' },
];
\`\`\`

## Kết luận

UmiJS là lựa chọn tuyệt vời cho các dự án React enterprise với đầy đủ công cụ và best practices.`,
    summary: 'Tìm hiểu UmiJS - React framework cho enterprise với routing, plugin system và tích hợp Ant Design.',
    coverImage: 'https://gw.alipayobjects.com/zos/bmw-prod/598d14af-4f1c-497d-b579-5ac42cd4dd1f/k7bjua9c_w132_h130.png',
    tags: ['1', '6', '8'],
    status: 'published',
    author: 'Phạm Minh Tuấn',
    views: 87,
    createdAt: '2026-04-14T08:00:00Z',
    updatedAt: '2026-04-14T08:00:00Z',
  },
  {
    id: '7',
    title: 'JavaScript ES6+ Features',
    slug: 'javascript-es6-plus-features',
    content: `## ES6+ Features quan trọng

### Arrow Functions

\`\`\`javascript
const add = (a, b) => a + b;
const greet = name => \`Hello \${name}\`;
\`\`\`

### Destructuring

\`\`\`javascript
const { name, age } = user;
const [first, ...rest] = items;
\`\`\`

### Template Literals

\`\`\`javascript
const message = \`Hello \${name}, you are \${age} years old\`;
\`\`\`

### Spread Operator

\`\`\`javascript
const newArray = [...oldArray, newItem];
const newObj = { ...oldObj, key: value };
\`\`\`

### Optional Chaining

\`\`\`javascript
const city = user?.address?.city;
\`\`\`

### Async/Await

\`\`\`javascript
async function fetchData() {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}
\`\`\`

## Kết luận

Nắm vững ES6+ giúp viết JavaScript hiện đại, ngắn gọn và hiệu quả hơn.`,
    summary: 'Tổng hợp các tính năng ES6+ quan trọng: Arrow Functions, Destructuring, Async/Await và nhiều hơn nữa.',
    coverImage: 'https://miro.medium.com/v2/resize:fit:1400/1*ahpxPO0jLGb9EWrY2LQRew.jpeg',
    tags: ['3', '8'],
    status: 'published',
    author: 'Phạm Minh Tuấn',
    views: 267,
    createdAt: '2026-04-15T13:30:00Z',
    updatedAt: '2026-04-15T13:30:00Z',
  },
  {
    id: '8',
    title: 'Web Performance Optimization',
    slug: 'web-performance-optimization',
    content: `## Tối ưu hiệu năng Web

### Lazy Loading

\`\`\`tsx
const Component = React.lazy(() => import('./Component'));
\`\`\`

### Code Splitting

\`\`\`javascript
import(/* webpackChunkName: "module" */ './module')
  .then(module => module.default);
\`\`\`

### Image Optimization

- Sử dụng format WebP/AVIF
- Lazy load images
- Responsive images với srcset

### Caching Strategy

- Browser caching
- Service Workers
- CDN caching

## Kết luận

Tối ưu hiệu năng web là quá trình liên tục, cần đo lường và cải thiện thường xuyên.`,
    summary: 'Các kỹ thuật tối ưu hiệu năng web: lazy loading, code splitting, image optimization.',
    coverImage: 'https://miro.medium.com/v2/resize:fit:1400/format:webp/1*NMWdrRljSp0BQpqMgUJKfA.png',
    tags: ['3', '8'],
    status: 'draft',
    author: 'Phạm Minh Tuấn',
    views: 0,
    createdAt: '2026-04-18T10:00:00Z',
    updatedAt: '2026-04-18T10:00:00Z',
  },
  {
    id: '9',
    title: 'State Management trong React',
    slug: 'state-management-trong-react',
    content: `## Quản lý State trong React

### useState - Local State

\`\`\`tsx
const [count, setCount] = useState(0);
\`\`\`

### Context API

\`\`\`tsx
const ThemeContext = React.createContext('light');

function App() {
  return (
    <ThemeContext.Provider value="dark">
      <ChildComponent />
    </ThemeContext.Provider>
  );
}
\`\`\`

### useReducer

\`\`\`tsx
const [state, dispatch] = useReducer(reducer, initialState);
dispatch({ type: 'INCREMENT' });
\`\`\`

### Khi nào dùng gì?

- **useState**: State đơn giản của component
- **Context + useReducer**: State toàn cục đơn giản
- **Redux/Zustand**: State phức tạp, nhiều middleware

## Kết luận

Chọn giải pháp state management phù hợp với quy mô và độ phức tạp của dự án.`,
    summary: 'So sánh các phương pháp quản lý state trong React: useState, Context API, useReducer và Redux.',
    coverImage: 'https://miro.medium.com/v2/resize:fit:838/1*hAVoFMwhWOnnbMkO-YCBOQ.png',
    tags: ['1', '2', '8'],
    status: 'draft',
    author: 'Phạm Minh Tuấn',
    views: 0,
    createdAt: '2026-04-20T15:00:00Z',
    updatedAt: '2026-04-20T15:00:00Z',
  },
  {
    id: '10',
    title: 'Responsive Design với CSS',
    slug: 'responsive-design-voi-css',
    content: `## Responsive Web Design

### Media Queries

\`\`\`css
@media (max-width: 768px) {
  .container { flex-direction: column; }
}
\`\`\`

### Mobile First

\`\`\`css
/* Base styles for mobile */
.container { padding: 16px; }

/* Tablet and up */
@media (min-width: 768px) {
  .container { padding: 24px; }
}

/* Desktop */
@media (min-width: 1024px) {
  .container { padding: 32px; max-width: 1200px; }
}
\`\`\`

### Viewport Units

\`\`\`css
.hero {
  height: 100vh;
  width: 100vw;
}
\`\`\`

### clamp() Function

\`\`\`css
.title {
  font-size: clamp(1.5rem, 4vw, 3rem);
}
\`\`\`

## Kết luận

Responsive design đảm bảo ứng dụng hoạt động tốt trên mọi thiết bị.`,
    summary: 'Hướng dẫn thiết kế responsive với CSS: Media Queries, Mobile First, Viewport Units và các kỹ thuật modern.',
    coverImage: 'https://miro.medium.com/v2/resize:fit:1000/1*MeBviCkATCiIAqY7LIxKew.png',
    tags: ['4', '8'],
    status: 'published',
    author: 'Phạm Minh Tuấn',
    views: 134,
    createdAt: '2026-04-21T09:30:00Z',
    updatedAt: '2026-04-21T09:30:00Z',
  },
];


export const getTagName = (tags: Tag[], tagId: string): string => {
  return tags.find((t) => t.id === tagId)?.name || '';
};

export const getTagNames = (tags: Tag[], tagIds: string[]): string[] => {
  return tagIds.map((id) => getTagName(tags, id)).filter(Boolean);
};

export const getPostsByTag = (posts: BlogPost[], tagId: string): BlogPost[] => {
  return posts.filter((p) => p.tags.includes(tagId) && p.status === 'published');
};

export const getRelatedPosts = (posts: BlogPost[], currentPost: BlogPost, limit: number = 3): BlogPost[] => {
  return posts
    .filter((p) => p.id !== currentPost.id && p.status === 'published' && p.tags.some((t) => currentPost.tags.includes(t)))
    .sort((a, b) => b.views - a.views)
    .slice(0, limit);
};

export const getPostCountByTag = (posts: BlogPost[], tagId: string): number => {
  return posts.filter((p) => p.tags.includes(tagId)).length;
};

export const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

export const formatDate = (dateStr: string): string => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('vi-VN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const statusLabels: Record<string, string> = {
  draft: 'Nháp',
  published: 'Đã đăng',
};

export const statusColors: Record<string, string> = {
  draft: 'orange',
  published: 'green',
};