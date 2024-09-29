import { useState } from 'react';

import { useGetUserBooking } from '../../../../hooks/booking.hooks';
import { useCancelBooking } from '../../../../hooks/booking.hooks';

import AdViewCard from '../AdViewCard';

const UserBooking = () => {
    const { data: bookings } = useGetUserBooking();

    const { mutateAsync: cancelBooking } = useCancelBooking();

    const [isBookingPopupOpen, setIsBookingPopupOpen] = useState(false);
    const [selectedAdId, setSelectedAdId] = useState(null); // To store the clicked ad's ID

    const handleCancel = async (id) => {
        await cancelBooking({ id });
    };

    const handlePopupOpen = (adId) => {
        setSelectedAdId(adId);
        setIsBookingPopupOpen(true);
    };

    const handlePopupClose = () => {
        setSelectedAdId(null);
        setIsBookingPopupOpen(false);
    };

    console.log('selectedID', selectedAdId);

    return (
        <div className="flex justify-center">
            <div className="flex flex-col gap-2 w-1/2 border shadow-lg p-4 rounded-xl">
                <div className="text-3xl border-b border-base-300">
                    Your Bookings
                </div>
                <div className="p-3">
                    {bookings?.map((booking) => (
                        <div
                            key={booking._id}
                            className={`border ${
                                booking.status === 'confirmed'
                                    ? 'border-secondary'
                                    : 'border-base-300 bg-base-200'
                            } rounded-md`}
                        >
                            <div className="flex justify-between items-center gap-3 p-2 rounded-md">
                                <div>
                                    <div className="text-xs text-base-300 underline">
                                        Property Name :
                                    </div>
                                    <div>{booking.propertyId.name}</div>
                                </div>
                                <div>
                                    <div className="text-xs text-base-300 underline">
                                        Visit Date :
                                    </div>
                                    <div>{booking.date}</div>
                                </div>
                                <div>
                                    <div className="text-xs text-base-300 underline">
                                        Payment Id :
                                    </div>
                                    <div>{booking.paymentId}</div>
                                </div>
                                <button
                                    className={`btn btn-secondary btn-sm ${
                                        booking.status === 'confirmed'
                                            ? ''
                                            : 'btn-outline'
                                    }`}
                                    onClick={() =>
                                        handlePopupOpen(booking.propertyId._id)
                                    }
                                >
                                    View
                                </button>
                                <button
                                    className={`btn btn-outline btn-warning btn-sm ${
                                        booking.status === 'confirmed'
                                            ? ''
                                            : 'btn-disabled'
                                    }`}
                                    onClick={() => handleCancel(booking._id)}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {isBookingPopupOpen && (
                    <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 z-50">
                        <div className="absolute top-1/2 left-1/2 transform translate-x-[-50%] translate-y-[-50%] bg-base-100 rounded-md p-4 shadow-md w-1/3">
                            <div className="flex justify-between items-center border-b-2 border-secondary p-2">
                                <div>
                                    <h2 className="text-3xl">
                                        Booked Property
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
                            <AdViewCard
                                id={selectedAdId}
                                closePopUp={handlePopupClose}
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserBooking;
