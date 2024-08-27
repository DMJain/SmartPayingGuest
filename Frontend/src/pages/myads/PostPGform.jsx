import { useState } from 'react';
import {
    Container,
    TextField,
    MenuItem,
    Button,
    Typography,
    Box,
    InputLabel,
    Select,
    Chip,
    FormControl,
} from '@mui/material';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from './firebase';
import { v4 } from 'uuid';
import { usePostPg } from '../../hooks/pg.hooks';

const amenitiesList = ['Wifi', 'AC', 'TV', 'Refrigerator', 'Laundry'];

const PostPGForm = () => {
    const { mutateAsync: pgpostAsync } = usePostPg();
    // State for each form field
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

        console.log(payload);

        try {
            await pgpostAsync(payload);
            alert('PG posted successfully!');
        } catch (error) {
            console.error('Error posting PG:', error);
            alert('Failed to post PG.');
        }
    };

    return (
        <Container sx={{ height: '100vh' }}>
            <Typography variant="h4" gutterBottom>
                Post Your PG
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="PG Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Plot"
                    value={plot}
                    onChange={(e) => setPlot(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Street"
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="City"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="State"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Country"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Pincode"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Phone Number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Price (Rent)"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    fullWidth
                    margin="normal"
                    type="number"
                />
                <FormControl fullWidth margin="normal">
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
                                    <Chip key={value} label={value} />
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
                <TextField
                    label="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    fullWidth
                    margin="normal"
                    multiline
                    rows={4}
                />
                <input type="file" multiple onChange={handleImageChange} />
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    sx={{ marginTop: 2 }}
                >
                    Submit
                </Button>
            </form>
        </Container>
    );
};

export default PostPGForm;
