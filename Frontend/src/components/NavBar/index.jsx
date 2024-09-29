import { memo, useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { useLoggedInUser } from '../../hooks/auth.hooks';

import {setLocation, setCustomeLocation} from '../../store/slices/locationSlice';

import {Search} from '../AlgoliaSearch/Search';


const Navbar = memo(() => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { data: user, isLoading } = useLoggedInUser();
    const location = useSelector((state) => state.location);

    const [city, setCity] = useState(null);
    const [isLoggedOut, setIsLoggedOut] = useState(false);

    const searchCity = useRef("");

    const fetchLocation = () => {
        navigator.geolocation.getCurrentPosition((position) => {
          const lat = position.coords.latitude;
          const long = position.coords.longitude;
          fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${long}`    
          )
            .then((res) => res.json())
            .then((data) => {
              if (data) {
                setCity(data.address.city);
                dispatch(setLocation({ location: data.address.city }));
              } else {
                console.error("Error fetching location:", data);
              }
            })
            .catch((err) => {
              console.error("Error fetching location:", err);
            });
        });
      };

      useEffect(() => {
        if (!location.custome) {
          fetchLocation();
        }
      }, []);

    const handleLogoClick = () => {
        navigate('/');
    };

    useEffect(() => {
        if (user) {
            setIsLoggedOut(true);
        }
    }, [isLoading, user]);

    const handleLogOut = () => {
        localStorage.removeItem('token');
        setIsLoggedOut(true);
        navigate('/');
        window.location.reload();
    };

    const handleSignIN = () => {
        navigate('/sign-in');
    };

    const handleLocation = () => {
        if(!location.custome) return;
        fetchLocation();
      }

      const handleCustomLocation = (city) => {
        dispatch(setCustomeLocation({location: city}));
        setCity(city);
      }

    return (
        <div className='flex justify-center bg-primary'>
        <div className="navbar bg-primary text-primary-content w-3/5">
            <div className="flex-1">
                <a
                    className="btn btn-ghost bg-base-100 rounded-full h-12"
                    onClick={handleLogoClick}
                >
                    <img
                        alt="Tailwind CSS Navbar component"
                        className="h-12"
                        src="https://firebasestorage.googleapis.com/v0/b/staynestpgbookingapp.appspot.com/o/logoStayNest.png?alt=media&token=933d227d-6229-4963-9b26-0028bbb1ab7d"
                    />
                </a>
            </div>
            <div className="flex-none gap-2">
                {/* <div className="form-control">
                    <input
                        type="text"
                        placeholder="Search"
                        className="input input-bordered w-24 md:w-auto"
                    />
                </div> */}
                <Search />

                <div>
                    <ul className="menu menu-horizontal">
                        <li>
                            <details>
                                <summary>{city}</summary>
                                <ul className="p-1 ">
                                    <li>
                                        <a>
                                            <label className="flex items-center">
                                                <input
                                                    type="text"
                                                    className="w-24 bg-base-100 border-b-2"
                                                    placeholder="Search"
                                                    onChange={(e) =>
                                                        (searchCity.current =
                                                            e.target.value)
                                                    }
                                                    onKeyDown={(e) =>
                                                        e.key === 'Enter' &&
                                                        handleCustomLocation(
                                                            searchCity.current
                                                        )
                                                    }
                                                />
                                                <span
                                                    className=""
                                                    onClick={() =>
                                                        handleCustomLocation(
                                                            searchCity.current
                                                        )
                                                    }
                                                >
                                                    →
                                                </span>
                                            </label>
                                        </a>
                                    </li>
                                    <li>
                                        <a onClick={handleLocation}>Current</a>
                                    </li>
                                </ul>
                            </details>
                        </li>
                    </ul>
                </div>

                {isLoggedOut ? (
                    <div className="dropdown dropdown-end">
                        <div
                            tabIndex={0}
                            role="button"
                            className="btn btn-ghost btn-circle avatar"
                        >
                            <div className="w-10 rounded-full">
                                <img
                                    alt="Tailwind CSS Navbar component"
                                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                                />
                            </div>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[10] mt-3 w-52 p-2 shadow"
                        >
                            <li>
                                <a className="justify-between" onClick={() => navigate('/user')}>
                                    My Account
                                </a>
                            </li>
                            <li>
                                <a
                                    className="justify-between"
                                    onClick={() => navigate('/create-ad')}
                                >
                                    Post Your PG
                                    <span className="badge">+</span>
                                </a>
                            </li>
                            <li>
                                <a onClick={handleLogOut}>Logout</a>
                            </li>
                        </ul>
                    </div>
                ) : (
                    <button className="btn btn-base-100" onClick={handleSignIN}>
                        {' '}
                        SIGN IN
                    </button>
                )}
            </div>
        </div>
        </div>
    );
});

Navbar.displayName = 'MemoizedNavbar';

export default Navbar;
