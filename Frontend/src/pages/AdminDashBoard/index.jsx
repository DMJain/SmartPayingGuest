import { useState } from 'react';

import AdReview from './components/AdReviewsPage';

const AdminDashBoard = () => {
    const [selectedTab, setSelectedTab] = useState('stats'); // Initial tab

    const handleTabClick = (tabName) => {
      setSelectedTab(tabName);
    };
  
    return (
      <div className="flex justify-center items-center mt-4">
        <div className="w-3/5">
          <ul className="flex space-x-4 border-b pb-2">
            <li
              className={`border-b-2 ${selectedTab === 'stats' ? 'border-secondary' : 'border-transparent'} hover:cursor-pointer`}
              onClick={() => handleTabClick('stats')}
            >
              Stats
            </li>
            <li
              className={`border-b-2 ${selectedTab === 'AdReview' ? 'border-secondary' : 'border-transparent'} hover:cursor-pointer`}
              onClick={() => handleTabClick('AdReview')}
            >
              Ad Review
            </li>
          </ul>
          <div className="mt-4">
            {selectedTab === 'AdReview' && <AdReview />}
            
          </div>
        </div>
      </div>
    );
};

export default AdminDashBoard;
