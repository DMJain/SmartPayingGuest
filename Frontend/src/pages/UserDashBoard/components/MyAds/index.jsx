import { useGetPGByOwner } from '../../../../hooks/pg.hooks';
import { useGetPropertyBooking } from '../../../../hooks/booking.hooks';
import { useEffect, useState } from 'react';

import BookingPopup from '../bookingPopUp';

const MyAds = () => {
    const { data: ads } = useGetPGByOwner();
    const [isBookingPopupOpen, setIsBookingPopupOpen] = useState(false);
    const [selectedAdId, setSelectedAdId] = useState(null); // To store the clicked ad's ID
    const [selectedAdName, setSelectedAdName] = useState(null); // To store the clicked ad's name

    const handleBookingClick = (adId, name) => {
        setSelectedAdId(adId);
        setSelectedAdName(name);
        setIsBookingPopupOpen(true);
    };

    const handlePopupClose = () => {
        setSelectedAdId(null);
        setIsBookingPopupOpen(false);
    };

    return (
        <div>
            <div className="grid grid-cols-2 gap-4 p-5">
                {ads?.map((ad) => (
                    <div
                        key={ad._id}
                        className={`indicator w-full flex justify-evenly items-center p-4 border ${
                            ad.status === 'approved'
                                ? 'border-success'
                                : ad.status === 'rejected'
                                ? 'border-failure'
                                : ad.status === 'closed'
                                ? 'border-base-300'
                                : 'border-warning'
                        } rounded-md gap-2 h-52`}
                    >
                        {ad.status === 'approved' ? (
                            <span className="indicator-item badge badge-success"></span>
                        ) : ad.status === 'rejected' ? (
                            <span className="indicator-item badge badge-error"></span>
                        ) : ad.status === 'closed' ? (
                            <span className="indicator-item badge badge-base-300"></span>
                        ) : (
                            <span className="indicator-item badge badge-warning"></span>
                        )}
                        <div className="w-1/4 h-44 border border-base-200 rounded-md">
                            <img
                                src={ad.images[0]}
                                alt={ad.name}
                                className="rounded-md object-contain h-full w-full"
                            />
                        </div>
                        <div className="flex flex-col gap-3">
                            <div>
                                <h2 className="text-3xl">{ad.name}</h2>
                            </div>
                            <div className="text-xl">Price : ₹ {ad.price}</div>
                            <div className="flex gap-2">
                                <button className="btn btn-primary">
                                    View
                                </button>
                                <button className="btn btn-primary">
                                    Edit
                                </button>
                                <button
                                    className={`btn btn-primary ${
                                        ad.status === 'approved'
                                            ? ''
                                            : 'btn-disabled'
                                    }`}
                                    onClick={(e) =>
                                        handleBookingClick(ad._id, ad.name)
                                    }
                                >
                                    Bookings
                                </button>
                                <button className="btn btn-outline btn-error">
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}

                {isBookingPopupOpen && (
                    <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 z-50">
                        <div className="absolute top-1/2 left-1/2 transform translate-x-[-50%] translate-y-[-50%] bg-base-100 rounded-md p-4 shadow-md w-1/3">
                            <div className="flex justify-between items-center border-b-2 border-secondary p-2">
                                <div>
                                    <h2 className="text-3xl">
                                        Bookings for {selectedAdName}
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
                            <BookingPopup id={selectedAdId} />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyAds;
