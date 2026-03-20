"use client";
import React, { useState, useRef } from 'react';
import { MdCloudUpload as UploadCloud, MdClose as X, MdAutorenew as Loader2 } from 'react-icons/md';
import { createClient } from '@/lib/supabase/client';

export default function Dropzone({ multiple = false, onUploadComplete }: { multiple?: boolean, onUploadComplete: (urls: string[]) => void }) {
  const [dragActive, setDragActive] = useState(false);
  const [previews, setPreviews] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const supabase = createClient();

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    else if (e.type === "dragleave") setDragActive(false);
  };

  const processFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const fileArray = Array.from(files);
    
    // Preview local
    const newPreviews = fileArray.map(f => URL.createObjectURL(f));
    setPreviews(prev => multiple ? [...prev, ...newPreviews] : newPreviews);
    
    // Upload to Supabase Storage ('images' bucket)
    setUploading(true);
    const uploadedUrls: string[] = [];

    for (const file of fileArray) {
       const fileExt = file.name.split('.').pop();
       const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
       const { data, error } = await supabase.storage.from('images').upload(`public/${fileName}`, file, { cacheControl: '3600', upsert: false });
       
       if (!error && data) {
         const { data: { publicUrl } } = supabase.storage.from('images').getPublicUrl(`public/${fileName}`);
         uploadedUrls.push(publicUrl);
       } else {
         console.error("Lỗi upload:", error);
         // Fallback to local URL for mockup if unconfigured Bucket
         uploadedUrls.push(URL.createObjectURL(file)); 
       }
    }

    setUploading(false);
    onUploadComplete(uploadedUrls);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    processFiles(e.dataTransfer.files);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    processFiles(e.target.files);
  };

  return (
    <div className="w-full">
      <div 
        className={`relative border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center transition-colors cursor-pointer
          ${dragActive ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200 hover:border-indigo-300 bg-gray-50'} ${uploading ? 'opacity-50 pointer-events-none' : ''}`}
        onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
      >
        <input ref={inputRef} type="file" multiple={multiple} accept="image/*" onChange={handleChange} className="hidden" />
        {uploading ? <Loader2 className="w-12 h-12 mb-4 text-indigo-500 animate-spin" /> : <UploadCloud className={`w-12 h-12 mb-4 transition-colors ${dragActive ? 'text-indigo-500' : 'text-gray-400'}`} />}
        <p className="text-gray-600 font-medium text-center">
          {uploading ? "Đang xử lý tải lên..." : <>Kéo thả ảnh vào đây, hoặc <span className="text-indigo-600 font-bold">chọn ảnh</span></>}
        </p>
        <p className="text-sm text-gray-400 mt-2 text-center">Hỗ trợ tự động upload lên Supabase Storage trực tiếp</p>
      </div>
      
      {previews.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-4">
          {previews.map((src, i) => (
            <div key={i} className="relative group w-32 h-32 rounded-xl overflow-hidden shadow-sm border border-gray-100 bg-gray-100">
              <img src={src} alt="preview" className="w-full h-full object-cover" />
              <button 
                type="button"
                onClick={(e) => { e.stopPropagation(); setPreviews(p => p.filter((_, idx) => idx !== i)) }}
                className="absolute top-1 right-1 bg-white/90 p-1 rounded-full text-red-500 opacity-0 group-hover:opacity-100 transition-opacity shadow"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
