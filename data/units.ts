export type UnitType = '1PN' | '2PN' | '3PN' | 'Studio' | 'Shophouse' | 'Penthouse';

export type Unit = {
    id: string;
    slug: string;
    code: string;
    type: UnitType;
    area: number;
    price: number;
    status: 'Còn trống' | 'Đã đặt cọc' | 'Đã bán';
    projectSlug: string;
    building: string;
    floor: number;
    direction: string;
    view: string;
    interior: 'Cơ bản' | 'Đầy đủ' | 'Thô';
    images: string[];
};

export const units: Unit[] = [
    {
        id: 'u1',
        slug: '1pn-bs12-47m2-grand-park',
        code: 'BS12-05.10',
        type: '1PN',
        area: 47.5,
        price: 2500000000,
        status: 'Còn trống',
        projectSlug: 'vinhomes-grand-park',
        building: 'S1.02',
        floor: 5,
        direction: 'Đông Nam',
        view: 'Hồ bơi, Nội khu',
        interior: 'Đầy đủ',
        images: [
            'https://images.unsplash.com/photo-1502672260266-1c1de2d9d0cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        ]
    },
    {
        id: 'u2',
        slug: '2pn-bs15-68m2-grand-park',
        code: 'BS15-12.05',
        type: '2PN',
        area: 68.2,
        price: 3600000000,
        status: 'Còn trống',
        projectSlug: 'vinhomes-grand-park',
        building: 'S2.05',
        floor: 12,
        direction: 'Tây Bắc',
        view: 'Công viên 36ha',
        interior: 'Cơ bản',
        images: [
            'https://images.unsplash.com/photo-1600566753086-00f18efc2291?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        ]
    },
    {
        id: 'u3',
        slug: 'studio-gl01-32m2-ocean-park',
        code: 'GL01-08.12',
        type: 'Studio',
        area: 32.5,
        price: 1800000000,
        status: 'Đã đặt cọc',
        projectSlug: 'vinhomes-ocean-park',
        building: 'S2.01',
        floor: 8,
        direction: 'Đông Bắc',
        view: 'Thành phố',
        interior: 'Đầy đủ',
        images: [
            'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        ]
    },
    {
        id: 'u4',
        slug: '3pn-gr05-105m2-golden-river',
        code: 'GR05-25.01',
        type: '3PN',
        area: 105.8,
        price: 15500000000,
        status: 'Còn trống',
        projectSlug: 'vinhomes-golden-river',
        building: 'Aqua 2',
        floor: 25,
        direction: 'Đông Nam',
        view: 'Sông Sài Gòn, Landmark 81',
        interior: 'Cơ bản',
        images: [
            'https://images.unsplash.com/photo-1600607687931-cebf14cd041e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        ]
    }
];
