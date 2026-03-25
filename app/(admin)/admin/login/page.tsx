"use client";
import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const supabase = createClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      setError(signInError.message);
      setLoading(false);
    } else {
      router.push('/admin');
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-3xl shadow-xl shadow-indigo-100/50">
        <div>
          <h2 className="mt-6 text-center text-3xl font-black text-gray-900 tracking-tight">
            Vinhomes<span className="text-indigo-600">Pro</span> Admin
          </h2>
          <p className="mt-2 text-center text-sm font-medium text-gray-600">
            Đăng nhập để quản lý hệ thống
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Email quản trị</label>
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900 bg-white transition-all shadow-sm"
                placeholder="admin@vinhomes.com" />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Mật khẩu</label>
              <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900 bg-white transition-all shadow-sm"
                placeholder="••••••••" />
            </div>
          </div>

          {error && <p className="text-red-500 text-sm font-semibold text-center">{error}</p>}

          <button type="submit" disabled={loading}
            className="w-full py-4 px-4 border border-transparent rounded-xl shadow-md shadow-indigo-200 text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none font-bold text-lg disabled:opacity-50 transition-colors">
            {loading ? 'Đang xác thực...' : 'Đăng Nhập'}
          </button>
        </form>
      </div>
    </div>
  );
}
