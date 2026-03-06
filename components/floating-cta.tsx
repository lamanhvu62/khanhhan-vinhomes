'use client';

import { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { LeadForm } from './lead-form';

export function FloatingCTA() {
    const [open, setOpen] = useState(false);

    return (
        <>
            <div className="fixed bottom-6 right-6 z-50">
                <button
                    onClick={() => setOpen(!open)}
                    className="bg-[#E9C46A] hover:bg-[#DDBB57] text-white p-4 rounded-full shadow-lg transition-transform hover:scale-105 duration-200 flex items-center justify-center animate-bounce"
                >
                    {open ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
                </button>
            </div>

            {open && (
                <div className="fixed bottom-24 right-6 z-50 w-[350px] bg-white rounded-2xl shadow-xl border border-[#E7E7E7] overflow-hidden transition-all duration-300">
                    <div className="bg-[#2F2F2F] text-white p-4 flex justify-between items-center">
                        <h3 className="font-semibold text-lg">Nhận tư vấn</h3>
                        <button onClick={() => setOpen(false)} className="text-gray-300 hover:text-white"><X className="w-5 h-5" /></button>
                    </div>
                    <div className="p-4 bg-[#F5F5F5]">
                        <LeadForm title="" defaultMessage="Tôi cần bạn tư vấn thêm chi tiết." />
                    </div>
                </div>
            )}
        </>
    );
}
