import { useState, useEffect } from 'react';
import {
    Box,
    TextField,
    Button,
    Typography,
    Container,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Chip,
    Grid,
    Link,
    useTheme,
} from '@mui/material';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from './firebase'; // Import your Firebase storage configuration
import { v4 } from 'uuid';
import { usePostPg } from '../../hooks/pg.hooks';
import { useNavigate } from 'react-router-dom';
import { useLoggedInUser } from '../../hooks/auth.hooks';

const amenitiesList = [
    'Wifi',
    'Parking',
    'Gym',
    'Pool',
    'Restaurant',
    'AC',
    'TV',
    'Fridge',
    'WashingMachine',
    'Garden',
    'Accessibility',
];

const citiesData = [
    // Cities in India
    { name: 'Hyderabad', states: ['Telangana'], countries: ['India'] },
    { name: 'Bangalore', states: ['Karnataka'], countries: ['India'] },
];

const statesData = {
    // States in India
    Telangana: ['Hyderabad', 'Secunderabad'],
    Karnataka: ['Bangalore', 'Mysore'],
};

const countriesData = ['India', 'USA', 'UK'];

const PostPGForm = () => {
    const navigate = useNavigate();
    const { data: user, isLoading } = useLoggedInUser();
    const theme = useTheme();
    const { mutateAsync: pgpostAsync } = usePostPg();

    const [name, setName] = useState('');
    const [plot, setPlot] = useState('');
    const [street, setStreet] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [pincode, setPincode] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [price, setPrice] = useState('');
    const [amenities, setAmenities] = useState([]);
    const [description, setDescription] = useState('');
    const [selectedImages, setSelectedImages] = useState([]);

    const [cities, setCities] = useState([]);
    const [states, setStates] = useState({});
    const [countries, setCountries] = useState([]);

    useEffect(() => {
        if (!user && !isLoading) {
            navigate('/sign-in');
        }
    }, [user, navigate, isLoading]);

    useEffect(() => {
        setCities(citiesData);
        setStates(statesData);
        setCountries(countriesData);
    }, []);

    useEffect(() => {
        const selectedCity = cities.find((c) => c.name === city);
        if (selectedCity) {
            setState(selectedCity.states[0]); // Set default state based on city
            setCountry(selectedCity.countries[0]); // Set default country based on city
        } else {
            setState('');
            setCountry('');
        }
    }, [city, cities, state, country]);

    const handleAmenitiesChange = (event) => {
        setAmenities(event.target.value);
    };

    const handleImageChange = (event) => {
        setSelectedImages(event.target.files);
    };

    const uploadImages = async () => {
        const imageUrls = [];
        for (const image of selectedImages) {
            const imageRef = ref(storage, `images/${image.name + v4()}`);
            await uploadBytes(imageRef, image);
            const url = await getDownloadURL(imageRef);
            imageUrls.push(url);
        }
        return imageUrls;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const imageUrls = await uploadImages();
        const payload = {
            name,
            plot,
            street,
            city,
            state,
            country,
            pinCode: Number(pincode),
            phoneNumber,
            price: Number(price),
            amenities,
            description,
            images: imageUrls,
        };

        try {
            await pgpostAsync(payload);
            alert('PG posted successfully!');
        } catch (error) {
            console.error('Error posting PG:', error);
            alert('Failed to post PG.');
        }
    };

    return (
        <Container maxWidth="md">
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mt: 4,
                    mb: 4,
                    p: 3,
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                    backgroundColor:
                        theme.palette.mode === 'dark' ? '#333' : '#fff',
                    borderRadius: '8px',
                }}
            >
                {/* Left Side Content */}
                <Box
                    sx={{
                        flex: 1,
                        pr: 3,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'flex-start',
                        color: theme.palette.text.primary,
                    }}
                >
                    <Typography variant="h4" sx={{ mb: 2, fontWeight: 'bold' }}>
                        Rent Your PG for Free
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 3 }}>
                        List your paying guest accommodation and reach thousands
                        of potential tenants easily!
                    </Typography>
                    <img
                        src="https://firebasestorage.googleapis.com/v0/b/staynest-uploading-images.appspot.com/o/StayNest.png?alt=media&token=1e3bb6b7-ac76-4c14-8ce3-8e65273670dd"
                        alt="PG Promotion"
                        style={{ width: '100%', borderRadius: '10px' }}
                    />
                    <Typography variant="body2">
                        Looking for PG?{' '}
                        <Link href="/" underline="hover">
                            Click Here
                        </Link>
                    </Typography>
                </Box>

                {/* Right Side Form */}
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    noValidate
                    autoComplete="off"
                    sx={{ flex: 1 }}
                >
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="PG Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Plot"
                                value={plot}
                                onChange={(e) => setPlot(e.target.value)}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Street"
                                value={street}
                                onChange={(e) => setStreet(e.target.value)}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <FormControl fullWidth>
                                <InputLabel>City</InputLabel>
                                <Select
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                >
                                    {cities.map((city) => (
                                        <MenuItem
                                            key={city.name}
                                            value={city.name}
                                        >
                                            {city.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <FormControl fullWidth>
                                <InputLabel>State</InputLabel>
                                <Select
                                    value={state}
                                    onChange={(e) => setState(e.target.value)}
                                >
                                    {Object.keys(states).map((state) => (
                                        <MenuItem key={state} value={state}>
                                            {state}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <FormControl fullWidth>
                                <InputLabel>Country</InputLabel>
                                <Select
                                    value={country}
                                    onChange={(e) => setCountry(e.target.value)}
                                >
                                    {countries.map((country) => (
                                        <MenuItem key={country} value={country}>
                                            {country}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Pincode"
                                value={pincode}
                                onChange={(e) => setPincode(e.target.value)}
                                fullWidth
                                required
                                type="number"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Phone Number"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                fullWidth
                                required
                                type="tel"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Price (Rent)"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                fullWidth
                                required
                                type="number"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth>
                                <InputLabel>Amenities</InputLabel>
                                <Select
                                    multiple
                                    value={amenities}
                                    onChange={handleAmenitiesChange}
                                    renderValue={(selected) => (
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                flexWrap: 'wrap',
                                                gap: 0.5,
                                            }}
                                        >
                                            {selected.map((value) => (
                                                <Chip
                                                    key={value}
                                                    label={value}
                                                />
                                            ))}
                                        </Box>
                                    )}
                                >
                                    {amenitiesList.map((amenity) => (
                                        <MenuItem key={amenity} value={amenity}>
                                            {amenity}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                fullWidth
                                multiline
                                rows={4}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                variant="contained"
                                component="label"
                                fullWidth
                            >
                                Upload Images
                                <input
                                    type="file"
                                    hidden
                                    multiple
                                    onChange={handleImageChange}
                                />
                            </Button>
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                fullWidth
                            >
                                Post PG
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
};

export default PostPGForm;
