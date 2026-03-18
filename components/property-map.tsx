'use client';

import { useEffect, useState, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import Link from 'next/link';
import { formatCurrencyVND } from '@/lib/format';
import { Unit } from '@prisma/client';

const customIcon = new L.Icon({
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

export default function PropertyMap({ units }: { units: any[] }) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const baseLat = 10.8415;
    const baseLng = 106.8407;

    const markers = useMemo(() => {
        return units.map((unit) => {
            // Stable random based on ID for demo purposes
            const seed = unit.id || "fallback";
            let hash = 0;
            for (let i = 0; i < seed.length; i++) {
                hash = seed.charCodeAt(i) + ((hash << 5) - hash);
            }
            const randLat = ((hash % 100) / 100) - 0.5;
            const randLng = (((hash / 100) % 100) / 100) - 0.5;

            return {
                ...unit,
                position: [
                    baseLat + randLat * 0.08,
                    baseLng + randLng * 0.08
                ] as [number, number]
            };
        });
    }, [units, baseLat, baseLng]);

    if (typeof window === 'undefined' || !mounted) {
        return <div className="h-[600px] w-full bg-[#F5F5F5] animate-pulse rounded-2xl"></div>;
    }

    return (
        <MapContainer center={[baseLat, baseLng]} zoom={12} scrollWheelZoom={false} className="h-full w-full rounded-2xl z-0">
            <TileLayer
                attribution='&copy; OpenStreetMap contributors'
                url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
            />
            {markers.map((unit) => (
                <Marker
                    key={unit.id}
                    position={unit.position}
                    icon={customIcon}
                >
                    <Popup>
                        <div className="w-[220px]">
                            <div className="font-bold text-[#2F2F2F] mb-1 line-clamp-1">{unit.title}</div>
                            <div className="text-xs text-[#6B7280] mb-2">{unit.project?.title || unit.building}</div>
                            <div className="flex gap-2 mb-3">
                                <span className="text-[10px] bg-[#F5F5F5] px-2 py-0.5 rounded font-semibold text-[#6B7280]">{unit.unitType}</span>
                                <span className="text-[10px] bg-[#F5F5F5] px-2 py-0.5 rounded font-semibold text-[#6B7280]">{unit.area}m²</span>
                            </div>
                            <div className="text-[#E9C46A] font-bold text-lg mb-3 leading-none">{formatCurrencyVND(unit.price)}</div>
                            <Link href={`/san-pham/${unit.slug}`} className="block text-center w-full bg-[#E9C46A] text-white py-2 rounded-lg text-sm font-semibold hover:bg-[#DDBB57]">Xem chi tiết</Link>
                        </div>
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
}
