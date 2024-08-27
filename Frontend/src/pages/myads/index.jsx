import { useState, useEffect } from 'react';
import { Box, Container, Typography, Button, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useLoggedInUser } from '../../hooks/auth.hooks';
import PostPGForm from './PostPGform';

const MyAdsPage = () => {
    const navigate = useNavigate();
    const { data: user, isLoading } = useLoggedInUser();

    const [selectedSection, setSelectedSection] = useState('create-pg');
    const [pgs, setPgs] = useState([]);

    useEffect(() => {
        if (!user && !isLoading) {
            navigate('/sign-in');
        }
    }, [user, navigate, isLoading]);

    const handleCreatePg = (pgDetails) => {
        setPgs([...pgs, pgDetails]);
        setSelectedSection('view-pgs');
    };

    return (
        <Box sx={{ display: 'flex', height: '100vh' }}>
            {/* Sidebar */}
            <Box
                sx={{
                    width: 240,
                    bgcolor: 'background.paper',
                    position: 'fixed',
                    top: 64, // Height of the navbar to ensure the sidebar starts below it
                    left: 0,
                    height: 'calc(100vh - 64px)', // Full height minus the height of the navbar
                    display: 'flex',
                    flexDirection: 'column',
                    p: 2,
                    boxShadow: 3,
                }}
            >
                <Typography variant="h6" sx={{ mb: 2, textAlign: 'center' }}>
                    My Ads
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <Button
                    variant={
                        selectedSection === 'create-pg' ? 'contained' : 'text'
                    }
                    onClick={() => setSelectedSection('create-pg')}
                    sx={{ mb: 1 }}
                >
                    Post Your PG
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

            {/* Main Content Area */}
            <Box
                sx={{
                    flexGrow: 1,
                    ml: 30, // Adjust this value based on the sidebar width
                    mt: 8, // Adjust this value based on the navbar height
                    overflowY: 'auto', // Enable scrolling for the main content
                    p: 3,
                }}
            >
                <Container maxWidth="lg">
                    {selectedSection === 'create-pg' && (
                        <PostPGForm onCreatePg={handleCreatePg} />
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

// const ViewPgs = ({ pgs }) => {
//     return (
//         <Box>
//             <Typography variant="h4" sx={{ mb: 4 }}>
//                 Your PGs
//             </Typography>
//             {pgs.length === 0 ? (
//                 <Typography>No PGs created yet.</Typography>
//             ) : (
//                 pgs.map((pg, index) => (
//                     <Card key={index} sx={{ mb: 2 }}>
//                         <CardContent>
//                             <Typography variant="h6">{pg.name}</Typography>
//                             <Typography>Location: {pg.location}</Typography>
//                             <Typography>Rent: {pg.rent}</Typography>
//                             <Typography>Facilities: {pg.facilities}</Typography>
//                         </CardContent>
//                         <CardActions>
//                             <Button variant="outlined" color="primary">
//                                 Edit
//                             </Button>
//                             <Button variant="outlined" color="secondary">
//                                 Delete
//                             </Button>
//                         </CardActions>
//                     </Card>
//                 ))
//             )}
//         </Box>
//     );
// };

export default MyAdsPage;
