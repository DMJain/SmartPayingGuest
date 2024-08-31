/* eslint-disable react/no-unescaped-entities */
import { useState, useEffect } from 'react';
import { Box, Container, Typography, Tab, Tabs, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useLoggedInUser } from '../../hooks/auth.hooks';
import PgCard from '../Pgs/Card';
import { UsegetPGByOwner } from '../../hooks/pg.hooks';

const MyAdsPage = () => {
    const navigate = useNavigate();
    const { data: user, isLoading: userLoading } = useLoggedInUser();
    const { data: PG = [], isLoading: pgLoading, isError } = UsegetPGByOwner();

    const [selectedTab, setSelectedTab] = useState('ads');
    const [pgs, setPgs] = useState([]);

    useEffect(() => {
        if (isError) {
            console.error('Error occurred while fetching PG data');
        }
        // Set pgs state only when PG data is loaded
        if (!pgLoading) {
            setPgs(PG);
        }
    }, [PG, pgLoading, isError]);

    useEffect(() => {
        if (!user && !userLoading) {
            navigate('/sign-in');
        }
    }, [user, navigate, userLoading]);

    const handleTabChange = (event, newValue) => {
        setSelectedTab(newValue);
    };

    return (
        <Box sx={{ height: '100vh' }}>
            <Container maxWidth="lg">
                <Typography variant="h4" sx={{ mt: 4, mb: 2 }}>
                    My PG's
                </Typography>

                {/* Tabs for Bookings and Ads */}
                <Tabs value={selectedTab} onChange={handleTabChange}>
                    <Tab label="PG's" value="ads" />
                    <Tab label="Bookings" value="bookings" />
                </Tabs>

                {/* Tab Content */}
                {/* Tab Content */}
                {selectedTab === 'ads' && (
                    <Box sx={{ mt: 4 }}>
                        <Grid container spacing={2}>
                            {pgs.length === 0 ? (
                                <Typography>No PGs created yet.</Typography>
                            ) : (
                                pgs.map((pg) => (
                                    <Grid
                                        item
                                        xs={12}
                                        sm={6}
                                        md={4}
                                        lg={3}
                                        key={pg._id}
                                    >
                                        <PgCard pg={pg} />
                                    </Grid>
                                ))
                            )}
                        </Grid>
                    </Box>
                )}
                {selectedTab === 'bookings' && (
                    <Box sx={{ mt: 4 }}>
                        <ManageBookings />
                    </Box>
                )}
            </Container>
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

export default MyAdsPage;
