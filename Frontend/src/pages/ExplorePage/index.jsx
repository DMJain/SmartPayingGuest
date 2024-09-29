import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { useGetPgByQuery } from '../../hooks/pg.hooks';

import { amenitiesIcons } from '../../utlis/aminities';

import { fetchAd } from '../../store/slices/adSlice';

const ExplorePage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { data: properties } = useGetPgByQuery(`city=Pune`);
    const uniqueStreets = [
        ...new Set(properties?.map((property) => property.street)),
    ];
    const uniqueAmenities = [
        ...new Set(properties?.flatMap((property) => property.amenities || [])),
    ];

    const handleToAdPage = (id) => {
        navigate(`/ad/${id}`);
    };

    const [selectedStreet, setSelectedStreet] = useState(null);
    const [selectedAmenities, setSelectedAmenities] = useState([]);
    const [priceRange, setPriceRange] = useState([null, Infinity]);

    const filteredProperties = properties?.filter((property) => {
        const passesStreetFilter =
            !selectedStreet || property.street === selectedStreet;
        const passesAmenitiesFilter =
            selectedAmenities.length === 0 ||
            selectedAmenities.every((amenity) =>
                property.amenities?.includes(amenity)
            );
        const passesPriceFilter =
            property.price >= priceRange[0] && property.price <= priceRange[1];

        return passesStreetFilter && passesAmenitiesFilter && passesPriceFilter;
    });

    const resetFilters = () => {
        setSelectedStreet(null);
        setSelectedAmenities([]);
        setPriceRange([0, Infinity]);
    };

    const clearPriceFilters = () => {
        setPriceRange([0, Infinity]);
    };
    return (
        <div className="flex justify-center">
            <div className="w-4/5 flex flex-col items-center">
                <div className="flex gap-4 items-center">
                    <div className='border-r border-base-base-300'>
                        <div className="flex gap-2 border-b border-base-300">
                            {/* Street Filter */}
                            <div className='p-2 border-r border-base-300'>
                            <select
                                id="streetFilter"
                                className="select select-bordered"
                                value={selectedStreet || ''}
                                onChange={(e) =>
                                    setSelectedStreet(e.target.value || null)
                                }
                            >
                                <option value="">Select Area</option>
                                {uniqueStreets.map((street) => (
                                    <option key={street} value={street}>
                                        {street}
                                    </option>
                                ))}
                            </select>
                            </div>

                            {/* Price Filter */}
                            <div className="flex gap-2 pt-2 pb-2">
                                <label
                                    htmlFor="minPrice"
                                    className="input input-bordered flex items-center gap-2"
                                >
                                    Min Price:
                                    <input
                                        type="number"
                                        id="minPrice"
                                        value={priceRange[0]}
                                        onChange={(e) => {
                                            const newMin = Number(
                                                e.target.value
                                            );
                                            setPriceRange([
                                                newMin,
                                                Math.max(newMin, priceRange[1]),
                                            ]);
                                        }}
                                    />
                                </label>

                                <label
                                    htmlFor="maxPrice"
                                    className="input input-bordered flex items-center gap-2"
                                >
                                    Max Price:
                                    <input
                                        type="number"
                                        id="maxPrice"
                                        value={priceRange[1]}
                                        onChange={(e) => {
                                            const newMax = Number(
                                                e.target.value
                                            );
                                            setPriceRange([
                                                Math.min(newMax, priceRange[0]),
                                                newMax,
                                            ]);
                                        }}
                                    />
                                </label>

                                <button
                                    onClick={clearPriceFilters}
                                    className="btn btn-link"
                                >
                                    Clear Price
                                </button>
                            </div>
                        </div>

                        {/* Amenities Filter */}
                        <div className="flex items-center gap-2 p-2">
                            <p className="text-lg">Amenities : {''}</p>
                            {uniqueAmenities.map((amenity) => (
                                <label
                                    key={amenity}
                                    className="flex items-center"
                                >
                                    <span className="p-1">{amenity}</span>
                                    <input
                                        type="checkbox"
                                        checked={selectedAmenities.includes(
                                            amenity
                                        )}
                                        className="checkbox checkbox-secondary checkbox-xs "
                                        onChange={() => {
                                            if (
                                                selectedAmenities.includes(
                                                    amenity
                                                )
                                            ) {
                                                setSelectedAmenities(
                                                    selectedAmenities.filter(
                                                        (a) => a !== amenity
                                                    )
                                                );
                                            } else {
                                                setSelectedAmenities([
                                                    ...selectedAmenities,
                                                    amenity,
                                                ]);
                                            }
                                        }}
                                    />
                                </label>
                            ))}
                        </div>
                    </div>
                    {/* Reset Button */}
                    <button onClick={resetFilters} className="btn btn-base-300">
                        Reset All Filters
                    </button>
                </div>

                <div className="grid grid-cols-2 gap-10 p-10">
                    {filteredProperties?.map((ad) => (
                        <div
                            key={ad._id}
                            className="w-full flex justify-evenly items-center p-2 border rounded-md gap-2 h-52 shadow-xl"
                        >
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
                                <div className="text-xl">
                                    Price : ₹ {ad.price}
                                </div>
                                <div className="flex gap-2 justify-end">
                                    <div className="flex gap-2 overflow-x-auto">
                                        {ad.amenities?.map((am, idx) => (
                                            <div key={idx}>
                                                {amenitiesIcons[am] || ''}
                                            </div>
                                        ))}
                                    </div>
                                    <button
                                        className="btn btn-primary"
                                        onClick={() => {
                                            dispatch(fetchAd(ad._id));
                                            handleToAdPage(ad._id);
                                        }}
                                    >
                                        View
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ExplorePage;
