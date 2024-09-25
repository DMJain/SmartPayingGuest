import { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useCreatreBooking } from '../../hooks/booking.hooks';

const OnSuccess = () => {
  const ad = useSelector((state) => state.ad);
  const booking = useSelector((state) => state.booking);

  const { mutateAsync: createBookingAsync } = useCreatreBooking();

  const [isLoading, setIsLoading] = useState(true); // Start with loading state
  const [bookingError, setBookingError] = useState(null); // Track potential booking errors
  const isBookingCreatedRef = useRef(false);

  const handleCreateBooking = async () => {
    if (!isBookingCreatedRef.current) {try {
      isBookingCreatedRef.current = true; // Set booking created flag to true
      await createBookingAsync({
        propertyId: ad._id,
        date: booking.date,
        paymentId: booking.orderId,
      });
      setIsLoading(false); // Set loading to false on success
    } catch (error) {
      console.error('Error creating booking:', error);
      setBookingError(error); // Store error for potential display
      setIsLoading(false); // Set loading to false on error
    }}
  };

  useEffect(() => {
      handleCreateBooking();
  }, []); // Run booking creation on component mount

  return (
    <div className="flex justify-center items-center p-20">
      {isLoading ? (
        <div className="w-7/12">
          <div className="loading-indicator">{/* Customize loading indicator */}</div>
        </div>
      ) : bookingError ? (
        <div className="error-message">{/* Display booking error message */} Error creating Booking</div>
      ) : (
        <div className="booking-details">
          <div className="border rounded-xl border-success shadow-lg flex gap-5">
            <div className="w-6/12 flex justify-center items-center bg-success p-5 rounded-xl">
              <div className="h-80 w-56 rounded-xl">
                <img
                  src={ad.imageURLs[0]}
                  alt=""
                  className="object-fill w-full h-full rounded-xl"
                />
              </div>
            </div>
            <div className="flex flex-col gap-5 w-full p-5">
              <div>
                <h1 className="text-6xl">{ad.name}</h1>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OnSuccess;