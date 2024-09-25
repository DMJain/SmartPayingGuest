// src/components/amenitiesIcons.js
import WifiIcon from '@mui/icons-material/Wifi';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import PoolIcon from '@mui/icons-material/Pool';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import TvIcon from '@mui/icons-material/Tv';
import KitchenIcon from '@mui/icons-material/Kitchen';
import LocalLaundryServiceIcon from '@mui/icons-material/LocalLaundryService';
import LandscapeIcon from '@mui/icons-material/Landscape';
import AccessibilityIcon from '@mui/icons-material/Accessibility';
// Import other icons as needed

const amenitiesData = [
    {
        value: 'wifi',
        label: 'Wifi',
    },
    {
        value: 'parking',
        label: 'Parking',
    },
    {
        value: 'gym',
        label: 'Gym',
    },
    {
        value: 'pool',
        label: 'Pool',
    },
    {
        value: 'restaurant',
        label: 'Restaurant',
    },
    {
        value: 'ac',
        label: 'AC',
    },
    {
        value: 'tv',
        label: 'TV',
    },
    {
        value: 'fridge',
        label: 'Fridge',
    },
    {
        value: 'washingMachine',
        label: 'Washing Machine',
    },
    {
        value: 'garden',
        label: 'Garden',
    },
    {
        value: 'accessibility',
        label: 'Accessibility',
    },
];

const amenitiesIcons = {
    wifi: <WifiIcon />,
    parking: <LocalParkingIcon />,
    gym: <FitnessCenterIcon />,
    pool: <PoolIcon />,
    restaurant: <RestaurantIcon />,
    ac: <AcUnitIcon />,
    tv: <TvIcon />,
    fridge: <KitchenIcon />,
    washingMachine: <LocalLaundryServiceIcon />,
    garden: <LandscapeIcon />,
    accessibility: <AccessibilityIcon />,
};

export default amenitiesData;

export { amenitiesIcons };




// 'Wifi',
// 'Parking',
// 'Gym',
// 'Pool',
// 'Cafe',
// 'Restaurant',
// 'Laundry',
// 'AC',
// 'Heater',
// 'TV',
// 'Fridge',
// 'Microwave',
// 'WashingMachine',
// 'Dishwasher',
// 'Oven',
// 'Balcony',
// 'Garden',
// 'Terrace',
// 'Lift',
// 'Wheelchair Accessible',
// 'Pet Friendly',
// 'Smoke Friendly',
// 'Events Friendly',
// 'Kids Friendly',
// 'Couples Friendly',
// 'Family Friendly',
// 'Bachelor Friendly',
