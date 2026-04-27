import component from "@/locales/en-US/component";

export default [
	{
		path: '/user',
		layout: false,
		routes: [
			{
				path: '/user/login',
				layout: false,
				name: 'login',
				component: './user/Login',
			},
			{
				path: '/user',
				redirect: '/user/login',
			},
		],
	},

	///////////////////////////////////
	// DEFAULT MENU
	{
		path: '/dashboard',
		name: 'Dashboard',
		component: './TrangChu',
		icon: 'HomeOutlined',
	},
	{
		path: '/gioi-thieu',
		name: 'About',
		component: './TienIch/GioiThieu',
		hideInMenu: true,
	},
	{
		path: '/random-user',
		name: 'RandomUser',
		component: './RandomUser',
		icon: 'ArrowsAltOutlined',
	},
	{
		path: '/todo-list',
		name: 'TodoList',
		icon: 'OrderedListOutlined',
		component: './TodoList',
	},
	{
		path: '/baitap01',
		name: 'baitap01',
		component: './BaiTap01',
	},
	{
		path: '/baitap02',
		name: 'baitap02',
		component: './BaiTap02/pages',
	},
	{
		path: '/TH01-bai1',
		name: 'Bài 1 - Trò chơi đoán số',
		component: './TH01/Bai1',
	},
	{
		path: '/TH01-bai2',
		name: 'Bài 2 - Theo dõi và quản lý tiến độ học tập',
		component: './TH01/Bai2',
	},
	{
		path: '/TH02-bai1',
		name: 'Bài 1 - Trò chơi Oẳn tù tì',
		component: './TH02/Bai1',
	},
	{
		path: '/TH02-bai2',
		name: 'Bài 2 - Ngân hàng câu hỏi',
		component: './TH02/Bai2',
	},
	{
		path: '/TH03',
		name: 'Xây dựng ứng dụng',
		component: './TH03',
	},
	{
		path: '/TH04',
		name: 'Quản lý sổ văn bằng tốt nghiệp',
		component: './TH04',
	},
	{
		path: '/TH05',
		name: 'Xây dựng hệ thống quản lý clb',
		component: './TH05',
	},
	{
		path: '/TH06',
		name: 'Xây dựng ứng dụng lập kế hoạch du lịch',
		component: './TH06',
	},
	{
		path: '/TH07',
		name: 'Personal Blog',
		component: './TH07',
		routes: [
			{
				path: '/TH07/post/:slug',
				component: './TH07/PostDetail',
				hideInMenu: true,
			},
			{
				path: '/TH07/about',
				component: './TH07/About',
				hideInMenu: true,
			},
			{
				path: '/TH07/management/posts',
				component: './TH07/PostManagement',
				hideInMenu: true,
			},
			{
				path: '/TH07/management/tags',
				component: './TH07/TagManagement',
				hideInMenu: true,
			},
		],
	},
	// DANH MUC HE THONG
	// {
	// 	name: 'DanhMuc',
	// 	path: '/danh-muc',
	// 	icon: 'copy',
	// 	routes: [
	// 		{
	// 			name: 'ChucVu',
	// 			path: 'chuc-vu',
	// 			component: './DanhMuc/ChucVu',
	// 		},
	// 	],
	// },

	{
		path: '/notification',
		routes: [
			{
				path: './subscribe',
				exact: true,
				component: './ThongBao/Subscribe',
			},
			{
				path: './check',
				exact: true,
				component: './ThongBao/Check',
			},
			{
				path: './',
				exact: true,
				component: './ThongBao/NotifOneSignal',
			},
		],
		layout: false,
		hideInMenu: true,
	},
	{
		path: '/',
		redirect: '/dashboard',
	},
	{
		path: '/403',
		component: './exception/403/403Page',
		layout: false,
	},
	{
		path: '/hold-on',
		component: './exception/DangCapNhat',
		layout: false,
	},
	{
		path: '*',
		component: './exception/404',
	},
];
