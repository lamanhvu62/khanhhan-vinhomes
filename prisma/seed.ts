import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('Seeding data...');

    // 1. Projects
    const project1 = await prisma.project.upsert({
        where: { slug: 'vinhomes-grand-park' },
        update: {},
        create: {
            title: 'Vinhomes Grand Park',
            slug: 'vinhomes-grand-park',
            location: 'Quận 9, TP. Thủ Đức, TP. HCM',
            summary: 'Đại đô thị thông minh đẳng cấp quốc tế',
            heroImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80',
            content: 'Vinhomes Grand Park là đại đô thị thông minh đẳng cấp quốc tế đầu tiên tại TP.HCM...',
        },
    });

    const project2 = await prisma.project.upsert({
        where: { slug: 'vinhomes-ocean-park' },
        update: {},
        create: {
            title: 'Vinhomes Ocean Park',
            slug: 'vinhomes-ocean-park',
            location: 'Gia Lâm, Hà Nội',
            summary: 'Thành phố biển hồ giữa lòng thủ đô',
            heroImage: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80',
            content: 'Vinhomes Ocean Park mang đến đặc quyền sống nghỉ dưỡng sinh thái cho cư dân...',
        },
    });

    // 2. Units
    await prisma.unit.upsert({
        where: { slug: '1pn-grand-park-s102' },
        update: {},
        create: {
            title: 'Căn 1PN Tòa S1.02',
            slug: '1pn-grand-park-s102',
            unitType: '1PN',
            area: 47.5,
            building: 'S1.02',
            floor: '05',
            view: 'Hồ bơi nội khu',
            legal: 'Sổ hồng lâu dài',
            price: 2500000000,
            furniture: 'Đầy đủ nội thất',
            content: 'Căn hộ thiết kế tối ưu công năng, phù hợp đón ánh sáng tự nhiên...',
            images: ['https://images.unsplash.com/photo-1502672260266-1c1de2d9d0cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
            projectId: project1.id,
        },
    });

    await prisma.unit.upsert({
        where: { slug: '2pn-grand-park-s205' },
        update: {},
        create: {
            title: 'Căn 2PN Góc S2.05',
            slug: '2pn-grand-park-s205',
            unitType: '2PN',
            area: 68.2,
            building: 'S2.05',
            floor: '12',
            view: 'Công viên 36ha',
            legal: 'Sổ hồng lâu dài',
            price: 3600000000,
            furniture: 'Cơ bản chủ đầu tư',
            content: 'Căn góc 2 mặt thoáng, tầm nhìn trực diện công viên ánh sáng...',
            images: ['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
            projectId: project1.id,
        },
    });

    await prisma.unit.upsert({
        where: { slug: 'studio-ocean-park-s201' },
        update: {},
        create: {
            title: 'Studio S2.01 Ocean Park',
            slug: 'studio-ocean-park-s201',
            unitType: 'Studio',
            area: 32.5,
            building: 'S2.01',
            floor: '08',
            view: 'Thành phố',
            legal: 'Sổ hồng lâu dài',
            price: 1800000000,
            furniture: 'Đầy đủ nội thất cao cấp',
            content: 'Studio thiết kế hiện đại, phù hợp cho người độc thân hoặc đầu tư cho thuê...',
            images: ['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
            projectId: project2.id,
        },
    });

    // 3. Posts
    await prisma.post.upsert({
        where: { slug: 'luu-y-khi-mua-can-ho-vinhomes' },
        update: {},
        create: {
            title: 'Những lưu ý khi mua căn hộ Vinhomes lần đầu',
            slug: 'luu-y-khi-mua-can-ho-vinhomes',
            excerpt: 'Bí quyết chọn căn, thương lượng giá và xem xét pháp lý dành cho người mới.',
            coverImage: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            content: 'Khi mua chung cư Vinhomes lần đầu, bạn cần xác định kỹ ngân sách, vay ngân hàng và lựa chọn phân khu phù hợp...',
        },
    });

    await prisma.post.upsert({
        where: { slug: 'tien-do-chuyen-nhuong-vinhomes' },
        update: {},
        create: {
            title: 'Quy trình chuyển nhượng căn hộ Vinhomes an toàn',
            slug: 'tien-do-chuyen-nhuong-vinhomes',
            excerpt: 'Các bước chuẩn bị giấy tờ, đặt cọc và công chứng sang tên đầy đủ nhất.',
            coverImage: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            content: 'Quy trình chuyển nhượng gồm: Thỏa thuận đặt cọc, xin xác nhận chủ đầu tư, công chứng sang tên và đóng thuế thu nhập cá nhân...',
        },
    });

    console.log('Seed completed successfully!');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
