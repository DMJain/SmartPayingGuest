import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { useGetPgByQuery } from '../../hooks/pg.hooks';

import { fetchAd } from '../../store/slices/adSlice';

import { Search } from '../../components/AlgoliaSearch/Search';

import './styles.css';

const HomePage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useSelector((state) => state.location);
    const { data: properties } = useGetPgByQuery(
        `city=${location.location}&&limit=4`
    );
    console.log(properties);

    const handleToExplorePage = () => {
        navigate('/explore');
    };

    const handleToAdsPage = async (id) => {
        await dispatch(fetchAd(id));
        navigate(`/ad/${id}`);
    };

    return (
        <div className="homePage">
            <div className="textContainer">
                <div className="wrapper">
                    <h1 className="title">Find Your Next Stay</h1>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Eos explicabo suscipit cum eius, iure est nulla animi
                        consequatur facilis id pariatur fugit quos laudantium
                        temporibus dolor ea repellat provident impedit!
                    </p>
                    <Search />
                    <div className="boxes">
                        <div className="box">
                            <h1>16+</h1>
                            <h2>Years of Experience</h2>
                        </div>
                        <div className="box">
                            <h1>200</h1>
                            <h2>Award Gained</h2>
                        </div>
                        <div className="box">
                            <h1>2000+</h1>
                            <h2>Property Ready</h2>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-1/2 relative">
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage:
                            'url(https://firebasestorage.googleapis.com/v0/b/staynestpgbookingapp.appspot.com/o/homepage.jpg?alt=media&token=ff9c9e6d-919d-4a74-9fea-5223ffa81485)',
                        backgroundSize: 'cover',
                        filter: 'blur(3px)',
                    }}
                ></div>
                <div className="relative z-10 text-neutral-content text-center h-full flex justify-center items-center">
                    <div className="max-w-md flex flex-col gap-4 p-4 rounded-lg">
                        <div className="grid grid-cols-2 gap-4 mt-4">
                            {properties?.map((property) => (
                                <div
                                    key={property._id}
                                    className="card glass shadow-xl w-40"
                                >
                                    <figure className="px-4 pt-4">
                                        <img
                                            src={property.images[0]}
                                            alt="Shoes"
                                            className="rounded-xl h-24 w-28"
                                        />
                                    </figure>
                                    <div className="flex justify-center gap-4 items-center p-2">
                                        <div>
                                            <b className="">{property.name}</b>
                                            <h1>₹ {property.price}</h1>
                                        </div>
                                        <div className="w-1/2">
                                            <button className="btn btn-sm btn-primary btn-outline" onClick={() => handleToAdsPage(property._id)}>
                                                →
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <button
                            className="btn btn-primary"
                            onClick={handleToExplorePage}
                        >
                            Get Started
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
