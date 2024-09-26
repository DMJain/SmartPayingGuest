import { useState } from 'react';
import { useGetPgToReview} from '../../../../hooks/pg.hooks';
import ReviewCard from '../ReviewCard';

const AdReview = () => {
    const { data: ads } = useGetPgToReview();

    const [isBookingPopupOpen, setIsBookingPopupOpen] = useState(false);
    const [selectedAdId, setSelectedAdId] = useState(null); // To store the clicked ad's ID

    const handlePopupOpen = (adId) => {
        setSelectedAdId(adId);
        setIsBookingPopupOpen(true);
    };

    const handlePopupClose = () => {
        setSelectedAdId(null);
        setIsBookingPopupOpen(false);
    };

    return (
        <div className="flex justify-center items-center">
            <div className="flex flex-col items-center gap-10 w-full">
                <div>
                    <h1 className="text-3xl font-bold">Review Ads</h1>
                </div>
                <div className='flex flex-col gap-2 w-1/2'>
                    {ads?.map((ad) => (
                        <div key={ad._id} className="flex justify-between items-center border border-base-300 p-4 rounded-lg">
                            <div>
                            <h1 className="text-2xl font-bold">{ad.name}</h1>
                            <h1 className="text-sm">by. {ad.ownerName}</h1>
                            </div>
                            <button className="btn btn-primary" onClick={() => handlePopupOpen(ad._id)}>View</button>
                        </div>
                    ))}
                </div>

                {isBookingPopupOpen && (
                    <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 z-50">
                        <div className="absolute top-1/2 left-1/2 transform translate-x-[-50%] translate-y-[-50%] bg-base-100 rounded-md p-4 shadow-md w-1/3">
                            <div className="flex justify-between items-center border-b-2 border-secondary p-2">
                                <div>
                                    <h2 className="text-3xl">
                                        Review
                                    </h2>
                                </div>
                                <div>
                                    <button
                                        className="btn btn-ghost btn-sm "
                                        onClick={handlePopupClose}
                                    >
                                        X
                                    </button>
                                </div>
                            </div>
                            <ReviewCard id={selectedAdId} closePopUp={handlePopupClose}/>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdReview;
