import { useMemo, useState, useEffect } from 'react';
import {
    Box,
    Typography,
    useMediaQuery,
    TextField,
    Button,
    useTheme,
    Grid,
    Container,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import PgCard from '../Pgs/Card';
// import pggs from '../../pg';
import { UsegetPGByOwner } from '../../hooks/pg.hooks';

const HomePage = () => {
    const theme = useTheme(); // Get the theme object
    const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Use breakpoints for responsiveness
    const isTablet = useMediaQuery(theme.breakpoints.down('md'));

    const [pgs, setPgs] = useState([]);
    const { data: PG = [], isLoading, isError } = UsegetPGByOwner();

    useEffect(() => {
        if (isError) {
            console.error('Error occurred while fetching PG data');
        } else if (!isLoading && PG.length === 0) {
            console.warn('No PGs found for the owner.');
        } else {
            setPgs(PG);
        }
    }, [PG, isLoading, isError]);

    // Memoize styles to prevent unnecessary recalculations
    const styles = useMemo(
        () => ({
            container: {
                position: 'relative',
                height: isMobile ? '50vh' : '70vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'end',
                backgroundImage:
                    'url("https://firebasestorage.googleapis.com/v0/b/staynest-uploading-images.appspot.com/o/homepage.jpg?alt=media&token=a6167e1c-cde4-41a7-84a4-086d590b29c4")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                color: '#000000',
                textAlign: 'center',
                padding: '20px',
                overflow: 'hidden',
                marginBottom: theme.spacing(3),
            },
            contentBox: {
                position: 'relative',
                zIndex: 2,
                maxWidth: isMobile ? '90%' : '600px',
                padding: isMobile ? '15px' : '20px',
                borderRadius: '10px',
                textAlign: 'center',
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            },
            title: {
                marginBottom: theme.spacing(2),
                fontWeight: 'bold',
                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)',
                fontSize: isMobile ? '2.5rem' : isTablet ? '3rem' : '2.5rem',
            },
            subtitle: {
                textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)',
                fontSize: isMobile ? '1rem' : isTablet ? '1.25rem' : '1.5rem',
            },
            button: {
                fontWeight: 'bold',
                padding: '10px 20px',
                fontSize: isMobile
                    ? '0.875rem'
                    : isTablet
                    ? '1rem'
                    : '1.125rem',
                borderRadius: '5px',
            },
            searchBox: {
                display: 'flex',
                justifyContent: 'center',
                marginTop: theme.spacing(3),
                gap: theme.spacing(2),
            },
            searchInput: {
                width: isMobile ? '80%' : '60%',
            },
            heading: {
                fontSize: isMobile ? '2.5rem' : isTablet ? '3rem' : '2.5rem',
                textAlign: 'center',
                fontWeight: 'bold',
                // mt: -4,
            },
        }),
        [isMobile, isTablet, theme]
    );

    return (
        <Container>
            <Box sx={styles.container}>
                <Box sx={styles.contentBox}>
                    <Typography variant="h3" sx={styles.title}>
                        Find Your Perfect Nest Away from Home
                    </Typography>
                    <Typography variant="h6" sx={styles.subtitle}>
                        Comfortable, Convenient, and Close to You!
                    </Typography>
                </Box>
            </Box>
            <Box sx={styles.searchBox}>
                <TextField
                    variant="outlined"
                    placeholder="Search PGs..."
                    sx={styles.searchInput}
                    aria-label="Search PGs" // Added for accessibility
                />
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<SearchIcon />}
                    sx={styles.button}
                    aria-label="Search button" // Added for accessibility
                >
                    Search
                </Button>
            </Box>
            <Box sx={{ mt: 2 }}>
                {/* <Divider sx={{ marginY: 3, fontWeight: 'bold' }} /> */}
                <Typography variant="h3" sx={styles.heading}>
                    Closet PG near you
                </Typography>
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
            </Box>
        </Container>
    );
};

export default HomePage;
