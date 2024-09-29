import PropTypes from 'prop-types';
import {
    useGetPGDetail,
} from '../../../../hooks/pg.hooks';

import './style.css';

const ReviewCard = ({ id, closePopUp }) => {
    const { data: ad } = useGetPGDetail(id);
    console.log(ad);

    const handleCLose = () => {
        closePopUp();
    }

    return (
        <div className="review-card p-4 flex flex-col gap-2">
            <div className="">
                {ad ? (
                    <div className='flex flex-col gap-2'>
                        <div>
                            <div className="text-3xl">{ad.name}</div>
                            <div> by {ad.ownerName}</div>
                        </div>
                        <div className="size overflow-y-auto flex flex-col gap-2">
                            <div className="grid grid-cols-2 gap-2 border-b border-base-300 pb-4">
                                {ad.images.map((image, index) => (
                                    <img
                                        key={index}
                                        src={image}
                                        alt="property"
                                        className="w-full object-cover rounded-md"
                                    />
                                ))}
                            </div>
                            <div className='border-b border-base-300 pb-2'>
                                <h1 className='text-xl font-medium'>Price :</h1>
                                <div>{ad.price}</div>
                            </div>
                            <div className='border-b border-base-300 pb-2'>
                                <h1 className='text-xl font-medium'>Location :</h1>
                                <div>
                                    {ad.plot}, {ad.street}
                                </div>
                                <div>
                                    {ad.city}, {ad.state}
                                </div>
                                <div>
                                    {ad.country}, {ad.pinCode}
                                </div>
                            </div>
                            
                            <div className='border-b border-base-300 pb-2'>
                                <h1 className='text-xl font-medium'>Amenities :</h1>
                                <div>{ad.amenities.join(', ')}</div>
                            </div>
                            <div>
                                <h1 className='text-xl font-medium'>Description :</h1>
                                <div>{ad.description}</div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div>Loading...</div>
                )}
            </div>
            <div className='flex justify-end gap-2'>
                <button className="btn btn-primary" onClick={handleCLose}>Close</button>
            </div>
        </div>
    );
};
ReviewCard.propTypes = {
    id: PropTypes.string.isRequired,
    closePopUp: PropTypes.func.isRequired,
};

export default ReviewCard;

