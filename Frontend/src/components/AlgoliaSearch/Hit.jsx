/* eslint-disable react/prop-types */
import { Highlight } from 'react-instantsearch';

import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { fetchAd } from '../../store/slices/adSlice';

export const Hit = ({ hit }) => {
	const navigate = useNavigate();
    const dispatch = useDispatch();

	const handleToAdPage = (id) => {
        navigate(`/ad/${id}`);
    };

    return (
        <div
            className={`indicator w-full flex items-center p-4 border rounded-md gap-10 h-52 mt-2 mb-2`}
        >
            <div className="w-1/4 h-44 border border-base-200 rounded-md">
                <img
                    src={hit.image}
                    alt={hit.name}
                    className="rounded-md object-contain h-full w-full"
                />
            </div>
            <div className="flex flex-col items-start gap-3">
                <div>
                    <h2 className="text-3xl"><Highlight attribute="name" hit={hit} /></h2>
                </div>
                <div className="text-xl">Price : ₹ {hit.price}</div>
                <div className="flex gap-2">
                    <button className="btn btn-primary" onClick={() => {dispatch(fetchAd(hit.objectID));
                                            handleToAdPage(hit.objectID);}}>View</button>
                </div>
            </div>
        </div>
    );
};
