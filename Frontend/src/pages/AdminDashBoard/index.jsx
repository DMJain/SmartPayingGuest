import AdReview from './components/AdReview';

const AdminDashBoard = () => {
    return (
        <div className="flex justify-center items-center">
            <div className="w-4/5">
                <div role="tablist" className="tabs tabs-lifted">
                    <input
                        type="radio"
                        name="my_tabs_2"
                        role="tab"
                        className="tab"
                        aria-label="Tab 1"
                        defaultChecked
                    />
                    <div
                        role="tabpanel"
                        className="tab-content bg-base-100 border-base-300 rounded-box p-6 w-full"
                    >
                        <AdReview />
                    </div>

                    <input
                        type="radio"
                        name="my_tabs_2"
                        role="tab"
                        className="tab"
                        aria-label="Tab 2"
                    />
                    <div
                        role="tabpanel"
                        className="tab-content bg-base-100 border-base-300 rounded-box p-6 w-full"
                    >
                        Tab content 2
                    </div>

                    <input
                        type="radio"
                        name="my_tabs_2"
                        role="tab"
                        className="tab"
                        aria-label="Tab 3"
                    />
                    <div
                        role="tabpanel"
                        className="tab-content bg-base-100 border-base-300 rounded-box p-6 w-full"
                    >
                        Tab content 3
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashBoard;
