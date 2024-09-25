import PropTypes from 'prop-types';
import {useGetPropertyBooking} from '../../../../hooks/booking.hooks';

const BookingPopUp = ({id}) => {

    const {data: booking} = useGetPropertyBooking(id);

    console.log(booking);

    return (
        <div className="flex flex-col p-3 gap-3">
            <div>
                {
                    booking?.map((book) => (
                        <div key={book._id} className='flex justify-between items-center gap-3 border border-base-200 p-2 rounded-md'>
                            <div><div className='text-xs text-base-300 underline'>NAME :</div><div>{book.userId.firstName} {book.userId.lastName}</div></div>
                            <div><div className='text-xs text-base-300 underline'>Email :</div><div>{book.userId.email}</div></div>
                            <div><div className='text-xs text-base-300 underline'>Visit Date :</div><div>{book.date}</div></div>
                            <button className='btn btn-warning btn-sm'>Cancel</button>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

BookingPopUp.propTypes = {
    id: PropTypes.string.isRequired,
};

export default BookingPopUp;