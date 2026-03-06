export default function Loading() {
    return (
        <div className="min-h-screen bg-[#F5F5F5] pb-24">
            {/* Skeleton Banner */}
            <div className="bg-[#2F2F2F] h-[300px] w-full animate-pulse"></div>

            <div className="container max-w-[1200px] px-4 mx-auto mt-12">
                {/* Skeleton Filter Tool */}
                <div className="bg-white h-48 w-full rounded-3xl -mt-20 shadow-sm border border-[#E7E7E7] animate-pulse"></div>

                <div className="flex justify-between items-center mb-8 px-2 mt-12 animate-pulse">
                    <div className="h-6 w-48 bg-gray-200 rounded"></div>
                    <div className="h-6 w-32 bg-gray-200 rounded"></div>
                </div>

                {/* Skeleton Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                        <div key={i} className="bg-white rounded-2xl h-[400px] border border-[#E7E7E7] overflow-hidden shadow-sm animate-pulse">
                            <div className="h-56 bg-gray-200 w-full"></div>
                            <div className="p-5 space-y-4">
                                <div className="h-6 w-3/4 bg-gray-200 rounded"></div>
                                <div className="h-4 w-1/2 bg-gray-200 rounded"></div>
                                <div className="h-8 w-full bg-gray-200 rounded-xl mt-4"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
