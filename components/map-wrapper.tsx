'use client';

import dynamic from 'next/dynamic';


const PropertyMap = dynamic(() => import('./property-map'), {
    ssr: false,
    loading: () => <div className="h-[600px] w-full bg-[#F5F5F5] animate-pulse rounded-2xl"></div>
});

export function MapWrapper({ units }: { units: any[] }) {
    return <PropertyMap units={units} />;
}
