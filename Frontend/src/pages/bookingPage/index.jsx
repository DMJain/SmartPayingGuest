import { useSelector, useDispatch} from 'react-redux';
import { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { load } from '@cashfreepayments/cashfree-js';

import { setOrderID, setBookingDetails} from '../../store/slices/bookingSlice';
import { apiInstance } from '../../api';

const BookingPage = () => {
    const ad = useSelector((state) => state.ad);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const orderIdRef = useRef('');
    const dateRef = useRef('');

    let cashfree;
var initializeSDK = async function () {          
    cashfree = await load({
        mode: "sandbox"
    });
};
initializeSDK();

useEffect(() => {
    if (ad._id === null) {
      navigate('/explore');
    }
  }, []);

  const getSessionId = async () => {
    try {
      const totalPrice = '500';
      let res = await apiInstance.post(`/booking/initiate`, {
        propertyId: ad._id,
        date: dateRef.current,
        totalPrice: totalPrice,
      });

      if (res.data && res.data.payment_session_id) {
        console.log('/payment response', res.data);
        orderIdRef.current = res.data.order_id;
        return res.data.payment_session_id;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const verifyPayment = async (orderIdRef) => {
    try {
      console.log("in verify payment")
      dispatch(setOrderID({ orderId: orderIdRef }));
      let res = await apiInstance.post(`/booking/verify-payment`, {
        propertyId: ad._id,
        orderId: orderIdRef,
        date: dateRef.current,
      });
      if (res && res.data) {
        console.log('payment verified', res.data);
        if (res.data.order_status === 'PAID') {
           navigate('/success');
          }
        // else navigate('/failure');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    dispatch(setBookingDetails({ date: dateRef.current, totalPrice: '500' }));
    try {
      let sessionId = await getSessionId();
      console.log('sessionId', sessionId);
      let checkoutOptions = {
        paymentSessionId: sessionId,
        redirectTarget: "_modal",
    };


      cashfree.checkout(checkoutOptions).then((res) => {
        console.log('payment initialized');
        verifyPayment(orderIdRef.current);
      });
    } catch (error) {
      console.log(error);
    }
  };


    return (
        <div className="flex justify-center items-center">
            <div className="w-3/5 flex flex-col items-center gap-5">
                <div>
                    <h1 className="text-3xl font-bold">Book a Visit</h1>
                </div>
                <div className='flex flex-col gap-5 border p-5 shadow-xl rounded-lg'>
                    <div className='text-2xl'>
                        Property : {ad.name}
                    </div>
                    <div>
                        Price : {ad.price}
                    </div>
                    <div>
                        Property Address
                    </div>
                    <label className="input input-bordered flex items-center gap-2">
                        Date
                        <input
                            type="date"
                            className="grow"
                            placeholder="Daisy"
                            onChange={(e) => dateRef.current = e.target.value}
                        />
                    </label>
                    <div>
                        Booking Amount : ₹ 500<span className='text-red-600'>*</span>
                    </div>

                    <button className="btn btn-primary" onClick={(e) => handlePayment(e)}>Book</button>

                    <div className='text-xs text-gray-400'>
                        *
                        <p>Booking amount is refundable on cancellation of visit</p>
                        <p>Booking amount will be refunded if Property Ad gets closed</p>
                        <p>In Case of no booking, amount will be refunded after 7 days of visit</p>
                        <p>If no show booking amount will not be refundable</p>
                        <p>User can change visit date without extra fees till a day prior to visit</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BookingPage;