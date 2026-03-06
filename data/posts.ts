export type Post = {
    id: string;
    slug: string;
    title: string;
    excerpt: string;
    content: string;
    image: string;
    date: string;
    category: 'Tin thị trường' | 'Pháp lý' | 'Kinh nghiệm mua nhà';
};

export const posts: Post[] = [
    {
        id: 'p1',
        slug: 'kinh-nghiem-chon-mua-can-ho-vinhomes-lan-dau',
        title: 'Kinh Nghiệm Chọn Mua Căn Hộ Vinhomes Dành Cho Người Lần Đầu',
        excerpt: 'Những lưu ý quan trọng giúp bạn chọn được căn hộ ưng ý, phù hợp tài chính và đảm bảo pháp lý khi mua dự án Vinhomes.',
        content: 'Nội dung bài viết chi tiết...',
        image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        date: '2023-11-15',
        category: 'Kinh nghiệm mua nhà'
    },
    {
        id: 'p2',
        slug: 'phap-ly-can-ho-vinhomes-ocean-park-cap-nhat-moi-nhat',
        title: 'Pháp Lý Căn Hộ Vinhomes Ocean Park Cập Nhật Khách Hàng Cần Biết',
        excerpt: 'Tiến độ cấp sổ hồng, các loại giấy tờ pháp lý cần lưu ý khi giao dịch chuyển nhượng hoặc mua trực tiếp từ chủ đầu tư.',
        content: 'Nội dung bài viết chi tiết...',
        image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        date: '2023-12-05',
        category: 'Pháp lý'
    },
    {
        id: 'p3',
        slug: 'thi-truong-bds-khu-dong-tp-hcm-2024',
        title: 'Thị Trường Bất Động Sản Khu Đông TP.HCM Có Gì Đột Phá Năm 2024?',
        excerpt: 'Hạ tầng giao thông, tuyến Metro số 1 và đường Vành Đai 3 sẽ tác động thế nào đến giá trị bất động sản tại Vinhomes Grand Park.',
        content: 'Nội dung bài viết chi tiết...',
        image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        date: '2024-01-20',
        category: 'Tin thị trường'
    }
];
