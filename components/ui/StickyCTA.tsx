'use client';

import { Phone, MessageCircle } from 'lucide-react';

export default function StickyCTA() {
    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
            <a
                href="https://zalo.me/0909123456"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-500 text-white shadow-lg hover:bg-blue-600 hover:scale-110 transition-all"
                aria-label="Chat Zalo"
            >
                <MessageCircle className="h-6 w-6" />
            </a>

            <a
                href="tel:0909123456"
                className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white shadow-lg hover:bg-primary/90 hover:scale-110 transition-all animate-bounce"
                aria-label="Gọi điện thoại"
            >
                <Phone className="h-6 w-6" />
            </a>
        </div>
    );
}
