import { useState } from 'react';
import MyAds from './components/MyAds';
// import ProfileDetails from './components/ProfileDetails';
// import MyBooking from './components/MyBooking';

const UserDashboard = () => {
  const [selectedTab, setSelectedTab] = useState('ProfileDetails'); // Initial tab

  const handleTabClick = (tabName) => {
    setSelectedTab(tabName);
  };

  return (
    <div className="flex justify-center items-center">
      <div className="w-3/5">
        <ul className="flex space-x-4 border-b pb-2">
          <li
            className={`border-b-2 ${selectedTab === 'ProfileDetails' ? 'border-secondary' : 'border-transparent'} hover:cursor-pointer`}
            onClick={() => handleTabClick('ProfileDetails')}
          >
            Profile Details
          </li>
          <li
            className={`border-b-2 ${selectedTab === 'MyAds' ? 'border-secondary' : 'border-transparent'} hover:cursor-pointer`}
            onClick={() => handleTabClick('MyAds')}
          >
            My Ads
          </li>
          <li
            className={`border-b-2 ${selectedTab === 'MyBooking' ? 'border-secondary' : 'border-transparent'} hover:cursor-pointer`}
            onClick={() => handleTabClick('MyBooking')}
          >
            My Booking
          </li>
        </ul>
        <div className="mt-4">
          {selectedTab === 'MyAds' && <MyAds />}
          
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;