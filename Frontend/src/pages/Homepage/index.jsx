import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import {useGetPgByQuery} from '../../hooks/pg.hooks';

import {fetchAd} from '../../store/slices/adSlice';

const HomePage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {data : properties} = useGetPgByQuery(`city=Pune&&limit=5`);
    console.log(properties);

    const handleToExplorePage = () => {
        navigate('/explore');
    }

    const handleToAdsPage = async (id) => {
        await dispatch(fetchAd(id));
        navigate(`/ad/${id}`);
    } 

    

    return (
        <div className="flex justify-center">
            <div className="flex flex-col items-center w-4/5 gap-10">
                <div className="flex justify-center">
                        <img
                            src="https://firebasestorage.googleapis.com/v0/b/staynestpgbookingapp.appspot.com/o/homepage.jpg?alt=media&token=ff9c9e6d-919d-4a74-9fea-5223ffa81485"
                            alt="Shoes"
                            className="w-4/5 rounded-2xl"
                        />
                        <p className="text-center text-3xl text-white glass absolute bottom-80 left-1/2 -translate-x-1/2 p-6 rounded-xl">Book Your Next <span className="text-primary rounded-xl">STAY</span></p>
                </div>
                <div className="w-2/3 flex flex-col items-center gap-2">
                    <label className="input input-bordered w-full flex items-center gap-2">
                        <input
                            type="text"
                            className="grow"
                            placeholder="Search"
                        />
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                            className="h-4 w-4 opacity-70"
                        >
                            <path
                                fillRule="evenodd"
                                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </label>

                    <button className="btn btn-link" onClick={handleToExplorePage}>Explore more</button>

                </div>
                <div>
                    <div>
                        {properties?.map((property) => (
                            <div key={property._id} className="card bg-base-100 w-96 shadow-xl">
                            <figure>
                                <img
                                    src={property.images[0]}
                                    alt="Property Image"
                                />
                            </figure>
                            <div className="card-body">
                                <h2 className="card-title">{property.name} @ ₹ {property.price}</h2>
                                <p>
                                    {property.description}
                                </p>
                                <div className="card-actions justify-end">
                                    <button className="btn btn-primary" onClick={() => handleToAdsPage(property._id)}>
                                        View
                                    </button>
                                </div>
                            </div>
                        </div>
                        ))}
                        
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
