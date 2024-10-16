import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { useLoggedInUser } from '../../hooks/auth.hooks';
import { useCreatreRoom } from '../../hooks/chat.hooks';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

import { amenitiesIcons } from '../../utlis/aminities';

import './style.css';

const PgDetailPage = () => {
    const ad = useSelector((state) => state.ad);
    const { mutateAsync: createChatAsync } = useCreatreRoom();
    const navigate = useNavigate();

    const { data: user } = useLoggedInUser();

    useEffect(() => {
        if (ad._id === null) {
            navigate('/explore');
        }
    }, []);

    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const handleImageChange = (index) => {
        if (index >= 0 && index < ad.imageURLs.length) {
            setCurrentImageIndex(index);
        }
    };

    const handleToBookingPage = () => {
        navigate('/booking');
    };

    const handleToChatPage = async (e) => {
        e.preventDefault();
        await createChatAsync({ userId: user._id, ownerId: ad.owner_id, propertyId: ad._id });
        navigate('/chat');
    }

    const handleToSignIn = () => {
        navigate('/sign-in')
    }

    return (
        <div className="flex justify-center mt-4">
            <div className="w-4/5 flex flex-col items-center">
                <div className="flex flex-col gap-5">
                    <div className="flex flex-col gap-2">
                        {ad.imageURLs ? (
                            <>
                                <div className="flex justify-center">
                                    <img
                                        src={ad.imageURLs[currentImageIndex]}
                                        alt="Advertisement Image"
                                        className="main-image rounded-lg object-content border border-base-300 rounded-lg "
                                    />
                                </div>

                                <div className="image-thumbnails flex justify-start gap-4">
                                    {ad.imageURLs.map((imageUrl, index) => (
                                        <button
                                            key={index}
                                            className={`btn btn-lg btn-ghost btn-secondary ${
                                                index === currentImageIndex
                                                    ? 'btn-active'
                                                    : ''
                                            }`}
                                            onClick={() =>
                                                handleImageChange(index)
                                            }
                                        >
                                            <img
                                                src={imageUrl}
                                                alt={`Image ${index + 1}`}
                                                style={{
                                                    maxHeight: '60px',
                                                    maxWidth: '80px',
                                                }}
                                            />
                                        </button>
                                    ))}
                                </div>
                            </>
                        ) : (
                            <div className="no-image flex w-full flex-col border-opacity-50">
                                <div className="card bg-base-300 rounded-box grid place-items-center main-image">
                                    No Images
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="join join-vertical shadow-lg rounded-lg ">
                        <div className="join-item flex justify-between items-center p-5 border bg-primary">
                            <div className="text-3xl font-medium">
                                {ad.name}
                            </div>
                            <div className="text-3xl"> ₹ {ad.price}</div>
                        </div>

                        <div className="join-item p-5 border">
                            <div className="text-xl">Description : </div>
                            <div>{ad.description}</div>
                        </div>

                        <div className="join-item p-5 border">
                            <div className="text-xl">Amenities : </div>
                            <div className="flex gap-2">
                                {ad.amenities?.map((am, idx) => (
                                    <div key={idx}>
                                        {amenitiesIcons[am] || ''}
                                        <span>{am} ,</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="join-ite p-5 borderm">
                            <div className="text-xl">Location : </div>
                            <div>
                                {ad.plot} {ad.street} {ad.city} - {ad.pinCode}
                            </div>
                            <div>
                                <div className="border h-80 rounded-lg border-primary">
                                    {ad.lon && (
                                        <MapContainer
                                            center={[ad.lat, ad.lon]}
                                            zoom={18}
                                            scrollWheelZoom={false}
                                            className="w-full h-full rounded-lg"
                                        >
                                            <TileLayer
                                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                            />
                                            <Marker position={[ad.lat, ad.lon]}>
                                                <Popup>
                                                    Set Location <br />{' '}
                                                </Popup>
                                            </Marker>
                                        </MapContainer>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="join-item  p-5 border">
                            <div className="text-xl">Owner Information : </div>
                            <div className="flex justify-between items-center">
                                <div>{ad.owner}</div>

                                {user ? (
                                    user._id === ad.owner_id ? (
                                        <button className="btn btn-primary">
                                            Edit
                                        </button>
                                    ) : (
                                        <>
                                        <button className="btn btn-primary" onClick={handleToChatPage}>Chat</button>
                                        <button className="btn btn-primary" onClick={handleToBookingPage}>
                                            Book
                                        </button>
                                        </>
                                    )
                                ) : (
                                    <button
                                        className="btn btn-primary"
                                        onClick={handleToSignIn}
                                    >
                                        Sign In
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PgDetailPage;
