import { useState } from 'react';
import { algoliasearch } from 'algoliasearch';
import instantsearch from 'instantsearch.js';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useDispatch } from "react-redux";
// import "instantsearch.css/themes/satellite.css";
import './style.css';

import {
    searchBox,
    hits,
    configure,
    pagination,
} from 'instantsearch.js/es/widgets';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import {fetchAd} from '../../store/slices/adSlice';

const AppID = import.meta.env.VITE_REACT_APP_ALGOLIA_APP_ID;
const SearchKey = import.meta.env.VITE_REACT_APP_ALGOLIA_SEARCH_KEY;
const indexName = 'stayNest';
const city = 'Pune';

const ExplorePage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [hitsJsonArray, setHitsJsonArray] = useState([]);
    const [center, setCenter] = useState([51.505, -0.09]);
    const [key, setKey] = useState(0);

    const navigateTo = async (url) => {
        console.log(url);
        await dispatch(fetchAd(url));
        navigate(`/ad/${url}`);
    };

    useEffect(() => {
        const searchClient = algoliasearch(AppID, SearchKey);

        const search = instantsearch({
            indexName: indexName,
            searchClient,
        });

        search.addWidgets([
            searchBox({
                container: '.searchbox',
            }),

            hits({
                container: '.hits',
                transformItems: (items) => {
                    setHitsJsonArray(items);
                    return items;
                },
                templates: {
                    item: (hit, { html, components }) => html`
                        <div class="hit-container">
                            <div class="hit-image">
                                <img src=${hit.image} alt=${hit.name} />
                            </div>
                            <div class="hit-content">
                                <h1>
                                    ${components.Highlight({
                                        hit,
                                        attribute: 'name',
                                    })}
                                </h1>
                                <p>₹ ${hit.price}</p>
                                <button onClick="${(e) => {e.preventDefault();
                                    navigateTo(hit.objectID);}}">
                                    Veiw
                                </button>
                            </div>
                        </div>
                    `,
                },
            }),
            pagination({
                container: '.pagenation',
                cssClasses: {
                    root: 'pagination-container',
                    item: 'item-custom-css-class',
                  },
            }),
            configure({
                hitsPerPage: 10,
                filters:`city:${city}`,
            })
        ]);

        search.start();
    }, []);

    useEffect(() => {
        if (hitsJsonArray.length > 0) {
            setCenter([hitsJsonArray[0].lat, hitsJsonArray[0].lon]);
            setKey((prev) => prev + 1);
        }
    }, [hitsJsonArray]);

    console.log(hitsJsonArray);

    return (
        <div className="flex justify-center h-full">
            <div className="flex explore-container p-2">
                <div className="flex flex-col gap-2 p-2">
                    <div className="searchbox sticky top-0"></div>
                    <div className="hits overflow-auto flex-grow p-1"></div>
                    <div className='pagenation flex w-full justify-center sticky bottom-0 border-t pt-2 border-base-300'></div>
                </div>

                <div className="h-full w-full border border-primary rounded-2xl">
                    {hitsJsonArray && (
                        <MapContainer
                            key={key}
                            center={center}
                            zoom={13}
                            scrollWheelZoom={false}
                            className="w-full h-full rounded-2xl"
                        >
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            {hitsJsonArray.map((item) => (
                                <Marker
                                    key={item.objectID}
                                    position={[item.lat, item.lon]}
                                >
                                    <Popup>
                                        <div className="flex gap-2 w-40 max-h-24">
                                            <img
                                                src={item.image}
                                                alt=""
                                                className="border border-primary h-16 w-12 object-cover rounded"
                                            />
                                            <div className="flex flex-col justify-between overflow-hidden">
                                                <b>{item.name}</b>
                                                <b>₹ {item.price}</b>
                                            </div>
                                        </div>
                                    </Popup>
                                </Marker>
                            ))}
                        </MapContainer>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ExplorePage;
