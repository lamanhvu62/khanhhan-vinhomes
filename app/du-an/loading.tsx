export default function Loading() {
    return (
        <div className="min-h-screen bg-[#F5F5F5] pb-24">
            <div className="bg-[#2F2F2F] h-[350px] w-full animate-pulse"></div>
            <div className="container max-w-[1200px] px-4 mx-auto mt-16 md:mt-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="bg-white rounded-2xl h-[450px] border border-[#E7E7E7] overflow-hidden shadow-sm animate-pulse">
                            <div className="h-60 bg-gray-200"></div>
                            <div className="p-6 space-y-4">
                                <div className="h-8 w-3/4 bg-gray-200 rounded"></div>
                                <div className="h-4 w-1/2 bg-gray-200 rounded"></div>
                                <div className="h-20 w-full bg-gray-200 rounded"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
