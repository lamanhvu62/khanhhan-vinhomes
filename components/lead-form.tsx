'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function LeadForm({ title = "Nhận Tư Vấn", defaultMessage = "" }: { title?: string, defaultMessage?: string }) {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData(e.currentTarget);
        const payload = {
            name: formData.get('name') as string,
            phone: formData.get('phone') as string,
            email: formData.get('email') as string,
            message: formData.get('message') as string,
            page: window.location.pathname,
        };

        try {
            await fetch('/api/leads', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });
            setSuccess(true);
            (e.target as HTMLFormElement).reset();
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    if (success) {
        return (
            <div className="bg-[#FAF3DD] border border-[#E9C46A] text-[#2F2F2F] p-6 rounded-2xl text-center shadow-sm w-full">
                <h3 className="font-bold text-lg mb-2 text-[#E9C46A]">Đăng ký thành công!</h3>
                <p className="text-sm leading-relaxed mb-4">Chuyên tài Vinhomes sẽ sớm liên hệ với bạn qua số điện thoại đã cung cấp.</p>
                <Button variant="outline" className="w-full border-[#E9C46A] text-[#E9C46A] hover:bg-[#E9C46A] hover:text-white rounded-xl h-12 font-semibold" onClick={() => setSuccess(false)}>Gửi yêu cầu khác</Button>
            </div>
        );
    }

    return (
        <form onSubmit={onSubmit} className="bg-white p-6 rounded-2xl shadow-sm border border-[#E7E7E7] space-y-4 w-full">
            {title && <h3 className="font-bold text-xl text-[#2F2F2F] mb-1">{title}</h3>}
            {title && <p className="text-sm text-[#6B7280] mb-6 font-light">Tuyệt mật thông tin cá nhân. Hỗ trợ 24/7.</p>}

            <div className="space-y-3">
                <Input name="name" required placeholder="Họ và tên *" className="bg-[#F5F5F5] border-none h-12 rounded-xl focus-visible:ring-[#E9C46A] text-[#2F2F2F] placeholder:text-[#6B7280]" />
                <Input name="phone" required placeholder="Số điện thoại *" className="bg-[#F5F5F5] border-none h-12 rounded-xl focus-visible:ring-[#E9C46A] text-[#2F2F2F] placeholder:text-[#6B7280]" />
                <textarea
                    name="message"
                    defaultValue={defaultMessage}
                    className="flex min-h-[120px] w-full rounded-xl border-none bg-[#F5F5F5] px-4 py-3 text-sm ring-offset-white placeholder:text-[#6B7280] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E9C46A] disabled:cursor-not-allowed disabled:opacity-50 text-[#2F2F2F] resize-none"
                    placeholder="Nội dung cần tư vấn..."
                ></textarea>
            </div>
            <Button type="submit" className="w-full h-12 bg-[#E9C46A] hover:bg-[#DDBB57] text-white font-semibold rounded-xl transition-all duration-200 mt-2 shadow-sm" disabled={loading}>
                {loading ? 'Đang gửi...' : 'Gửi Yêu Cầu'}
            </Button>
        </form>
    );
}
