"use client";
import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { MdCheckCircle as CheckCircle, MdClose as X } from 'react-icons/md';

type Toast = { id: string; message: string; type: 'success' | 'error' };
type ToastContextType = { showToast: (message: string, type?: 'success' | 'error') => void };

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((message: string, type: 'success' | 'error' = 'success') => {
    const id = Math.random().toString(36).substring(7);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed bottom-4 right-4 z-[9999] flex flex-col gap-2">
        {toasts.map((toast) => (
          <div key={toast.id} className="bg-white text-gray-900 border border-gray-100 shadow-xl rounded-xl p-4 flex items-center gap-3 transition-all duration-300 transform rounded-2xl min-w-[280px]">
            {toast.type === 'success' ? <CheckCircle className="w-6 h-6 text-green-500" /> : <X className="w-6 h-6 text-red-500" />}
            <p className="font-medium">{toast.message}</p>
            <button onClick={() => setToasts(t => t.filter(x => x.id !== toast.id))} className="ml-auto text-gray-400 hover:text-gray-600 focus:outline-none">
              <X className="w-5 h-5" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast missing provider");
  return context;
}
