const AdReview = () => {
    return (
        <div className="flex justify-center items-center">
            <div className="flex flex-col items-center gap-10">
                <div>
                    <h1 className="text-3xl font-bold">Review Ads</h1>
                    
                </div>
                <div>
                        <div className="flex">
                            <h1 className="text-2xl font-bold">Property Name</h1>
                            <button className="btn btn-primary">Approve</button>
                        </div>
                    </div>
            </div>
        </div>
    );
};

export default AdReview;