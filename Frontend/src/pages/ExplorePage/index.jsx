import { useNavigate } from "react-router-dom"; 
import { useDispatch } from "react-redux";

import { useGetPgByQuery } from "../../hooks/pg.hooks";

import { fetchAd } from "../../store/slices/adSlice";

const ExplorePage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {data : properties} = useGetPgByQuery(`city=Pune`);

    const handleToAdPage = (id) => {
        navigate(`/ad/${id}`);
    }

    return (
        <div className="flex justify-center">
        <div className="w-4/5 drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex">
                <label
                    htmlFor="my-drawer-2"
                    className="btn btn-primary drawer-button lg:hidden btn-circle swap swap-rotate"
                >
                    <input type="checkbox" />

                    {/* hamburger icon */}
                    <svg
                        className="swap-off fill-current"
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        viewBox="0 0 512 512"
                    >
                        <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
                    </svg>

                    {/* close icon */}
                    <svg
                        className="swap-on fill-current"
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        viewBox="0 0 512 512"
                    >
                        <polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
                    </svg>
                </label>
                {/* Page content here */}
                <div className="flex flex-col w-full items-center gap-10 p-10">
                {properties?.map((property) => (
                            <div key={property._id} className="card bg-base-100 w-96 shadow-xl">
                            <figure>
                                <img
                                    src={property.images[0]}
                                    alt="Property Image"
                                />
                            </figure>
                            <div className="card-body">
                                <h2 className="card-title">{property.name}  @ ₹ {property.price} </h2>
                                <p>
                                    {property.description}
                                </p>
                                <div className="card-actions justify-end">
                                    <button className="btn btn-primary" onClick={() => 
                                        {dispatch(fetchAd(property._id));
                                            handleToAdPage(property._id)}}>
                                        View
                                    </button>
                                </div>
                            </div>
                        </div>
                        ))}
                </div>
            </div>
            <div className="drawer-side">
                <label
                    htmlFor="my-drawer-2"
                    aria-label="close sidebar"
                    className="drawer-overlay"
                ></label>
                <ul className="menu bg-base-100 text-base-content min-h-full w-80 p-4">
                    {/* Sidebar content here */}
                    <h1 className="text-lg underline">Filter</h1>
                    <li>
                        <label className="label cursor-pointer">
                            <span className="label-text">Remember me</span>
                            <input
                                type="checkbox"
                                defaultChecked
                                className="checkbox checkbox-primary rounded-full"
                            />
                        </label>
                    </li>
                    <li>
                        <label className="label cursor-pointer">
                            <span className="label-text">Remember me</span>
                            <input
                                type="checkbox"
                                defaultChecked
                                className="checkbox checkbox-primary rounded-full"
                            />
                        </label>
                    </li>
                </ul>
            </div>
        </div>
        </div>
    );
};

export default ExplorePage;
