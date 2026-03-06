'use client';

import { useEffect, useState } from 'react';
import { UnitCard } from './unit-card';
export function RecommendUnits({ unitId }: { unitId: string }) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [units, setUnits] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchRecommend() {
            try {
                const res = await fetch(`/api/recommend?unitId=${unitId}&limit=3`);
                if (res.ok) {
                    const data = await res.json();
                    setUnits(data);
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }
        fetchRecommend();
    }, [unitId]);

    if (loading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[1, 2, 3].map((n) => (
                    <div key={n} className="h-[380px] w-full bg-[#E7E7E7] animate-pulse rounded-2xl"></div>
                ))}
            </div>
        );
    }

    if (units.length === 0) return null;

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {units.map((unit) => (
                <UnitCard key={unit.id} unit={unit} projectName={unit.project?.title} />
            ))}
        </div>
    );
}
