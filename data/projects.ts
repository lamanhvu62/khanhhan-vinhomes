export type Project = {
    id: string;
    slug: string;
    name: string;
    location: string;
    overview: string;
    status: 'Đang mở bán' | 'Sắp mở bán' | 'Đã bàn giao';
    price: string;
    image: string;
    images: string[];
    features: string[];
    amenities: string[];
};

export const projects: Project[] = [
    {
        id: '1',
        slug: 'vinhomes-grand-park',
        name: 'Vinhomes Grand Park',
        location: 'Quận 9, TP. Thủ Đức, TP.HCM',
        overview: 'Đại đô thị đẳng cấp quốc tế tọa lạc tại trung tâm TP. Thủ Đức, được kiến tạo theo mô hình đô thị thông minh tiêu chuẩn toàn cầu.',
        status: 'Đang mở bán',
        price: 'Từ 2.5 tỷ/căn',
        image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80',
        images: [
            'https://images.unsplash.com/photo-1600607687931-cebf14cd041e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        ],
        features: ['Công viên 36ha', 'Biển nhân tạo', 'Vincom Mega Mall', 'Vinschool', 'Vinmec'],
        amenities: ['Hồ bơi', 'Gym', 'BBQ', 'An ninh 24/7', 'Khu vui chơi trẻ em']
    },
    {
        id: '2',
        slug: 'vinhomes-ocean-park',
        name: 'Vinhomes Ocean Park',
        location: 'Gia Lâm, Hà Nội',
        overview: 'Thành phố Biển Hồ với những tiện ích đặc quyền mang phong cách nghỉ dưỡng đẳng cấp ngay trong lòng thủ đô.',
        status: 'Đã bàn giao',
        price: 'Từ 2.1 tỷ/căn',
        image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80',
        images: [
            'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        ],
        features: ['Biển hồ nước mặn sóng nhân tạo', 'Đại học VinUni', 'TechnoPark Tower'],
        amenities: ['Hồ bơi 4 mùa', 'Sân tennis', 'Sân bóng rổ', 'Công viên dạo bộ']
    },
    {
        id: '3',
        slug: 'vinhomes-golden-river',
        name: 'Vinhomes Golden River',
        location: 'Quận 1, TP.HCM',
        overview: 'Khu đô thị sinh thái ven sông đẳng cấp bậc nhất tọa lạc tại vị trí vàng hiếm hoi còn sót lại của trung tâm TP.HCM.',
        status: 'Đã bàn giao',
        price: 'Từ 8 tỷ/căn',
        image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80',
        images: [
            'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        ],
        features: ['Tuyến Metro số 1', 'Bến du thuyền', 'Khu biệt thự Victoria'],
        amenities: ['Hồ bơi vô cực', 'Đài quan sát', 'Khu vực cảnh quan ven sông']
    }
];
