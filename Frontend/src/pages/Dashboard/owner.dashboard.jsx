import { useState } from 'react';
import {
    Box,
    Container,
    Typography,
    Button,
    TextField,
    FormControl,
    Divider,
    Card,
    CardContent,
    CardActions,
} from '@mui/material';

const OwnerDashboard = () => {
    const [selectedSection, setSelectedSection] = useState('create-pg');
    const [pgs, setPgs] = useState([]);
    const [pgDetails, setPgDetails] = useState({
        name: '',
        location: '',
        rent: '',
        facilities: '',
    });

    const handleChange = (e) => {
        setPgDetails({
            ...pgDetails,
            [e.target.name]: e.target.value,
        });
    };

    const handleCreatePg = () => {
        setPgs([...pgs, pgDetails]);
        setPgDetails({
            name: '',
            location: '',
            rent: '',
            facilities: '',
        });
        setSelectedSection('view-pgs'); // Optionally switch to "View PGs" after creation
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <Box
                sx={{
                    width: 240,
                    bgcolor: 'background.paper',
                    height: '100vh',
                    position: 'fixed',
                    display: 'flex',
                    flexDirection: 'column',
                    p: 2,
                    boxShadow: 3,
                }}
            >
                <Typography variant="h6" sx={{ mb: 2 }}>
                    Owner Dashboard
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <Button
                    variant={
                        selectedSection === 'create-pg' ? 'contained' : 'text'
                    }
                    onClick={() => setSelectedSection('create-pg')}
                    sx={{ mb: 1 }}
                >
                    Create PG
                </Button>
                <Button
                    variant={
                        selectedSection === 'manage-bookings'
                            ? 'contained'
                            : 'text'
                    }
                    onClick={() => setSelectedSection('manage-bookings')}
                    sx={{ mb: 1 }}
                >
                    Manage Bookings
                </Button>
                <Button
                    variant={
                        selectedSection === 'view-pgs' ? 'contained' : 'text'
                    }
                    onClick={() => setSelectedSection('view-pgs')}
                    sx={{ mb: 1 }}
                >
                    View PGs
                </Button>
            </Box>

            <Box
                sx={{
                    flexGrow: 1,
                    ml: 30,
                    p: 3,
                }}
            >
                <Container maxWidth="lg">
                    {selectedSection === 'create-pg' && (
                        <CreatePg
                            pgDetails={pgDetails}
                            handleChange={handleChange}
                            handleCreatePg={handleCreatePg}
                        />
                    )}
                    {selectedSection === 'manage-bookings' && (
                        <ManageBookings />
                    )}
                    {selectedSection === 'view-pgs' && <ViewPgs pgs={pgs} />}
                </Container>
            </Box>
        </Box>
    );
};

const CreatePg = ({ pgDetails, handleChange, handleCreatePg }) => {
    return (
        <Box>
            <Typography variant="h4" sx={{ mb: 4 }}>
                Create Property/PG
            </Typography>
            <FormControl fullWidth sx={{ mb: 2 }}>
                <TextField
                    label="PG Name"
                    name="name"
                    value={pgDetails.name}
                    onChange={handleChange}
                    variant="outlined"
                />
            </FormControl>
            <FormControl fullWidth sx={{ mb: 2 }}>
                <TextField
                    label="Location"
                    name="location"
                    value={pgDetails.location}
                    onChange={handleChange}
                    variant="outlined"
                />
            </FormControl>
            <FormControl fullWidth sx={{ mb: 2 }}>
                <TextField
                    label="Rent"
                    name="rent"
                    value={pgDetails.rent}
                    onChange={handleChange}
                    variant="outlined"
                />
            </FormControl>
            <FormControl fullWidth sx={{ mb: 2 }}>
                <TextField
                    label="Facilities"
                    name="facilities"
                    value={pgDetails.facilities}
                    onChange={handleChange}
                    variant="outlined"
                />
            </FormControl>
            <Button
                variant="contained"
                color="primary"
                onClick={handleCreatePg}
            >
                Create PG
            </Button>
        </Box>
    );
};

const ManageBookings = () => {
    return (
        <Box>
            <Typography variant="h4" sx={{ mb: 4 }}>
                Manage Bookings
            </Typography>
            {/* Booking management components here */}
        </Box>
    );
};

const ViewPgs = ({ pgs }) => {
    return (
        <Box>
            <Typography variant="h4" sx={{ mb: 4 }}>
                Your PGs
            </Typography>
            {pgs.length === 0 ? (
                <Typography>No PGs created yet.</Typography>
            ) : (
                pgs.map((pg, index) => (
                    <Card key={index} sx={{ mb: 2 }}>
                        <CardContent>
                            <Typography variant="h6">{pg.name}</Typography>
                            <Typography>Location: {pg.location}</Typography>
                            <Typography>Rent: {pg.rent}</Typography>
                            <Typography>Facilities: {pg.facilities}</Typography>
                        </CardContent>
                        <CardActions>
                            <Button variant="outlined" color="primary">
                                Edit
                            </Button>
                            <Button variant="outlined" color="secondary">
                                Delete
                            </Button>
                        </CardActions>
                    </Card>
                ))
            )}
        </Box>
    );
};

export default OwnerDashboard;
