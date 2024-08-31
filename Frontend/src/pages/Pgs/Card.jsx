/* eslint-disable react/prop-types */
// /* eslint-disable react/prop-types */
// // src/components/PgCard.js
// import React from 'react';
import {
    Typography,
    Card,
    CardContent,
    CardMedia,
    Grid,
    Divider,
    Tooltip,
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import amenitiesIcons from './amenities'; // Ensure the path to amenitiesIcons is correct

const PgCard = ({ pg }) => {
    const capitalizeEveryWord = (str) =>
        str
            .split(' ')
            .map(
                (word) =>
                    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
            )
            .join(' ');
    return (
        <Card
            sx={{
                mb: 2,
                maxWidth: 400,
                borderRadius: 2,
                boxShadow: 3,
                // transition: 'transform 0.3s ease-in-out',
                maxHeight: 400, // Set a fixed height for the card
                '&:hover': {
                    // transform: 'scale(1.05)',
                    boxShadow: 6,
                },
                cursor: 'pointer',
            }}
        >
            <CardMedia
                component="img"
                height="140"
                image={pg.images[0]} // Display the first image as the card media
                alt={pg.name}
                sx={{ borderTopLeftRadius: 2, borderTopRightRadius: 2 }}
            />
            <CardContent
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: 'calc(100% - 140px)', // Ensure content height fits within the card
                    overflow: 'auto', // Allow scrolling if content overflows
                }}
            >
                <Typography variant="h6" sx={{ mb: 1 }}>
                    <span style={{ fontWeight: 'bold', color: '#f57c00' }}>
                        {capitalizeEveryWord(pg.name)}
                    </span>
                </Typography>
                <Divider sx={{ marginY: 1 }} />
                <Typography variant="body2" color="textSecondary">
                    <LocationOnIcon sx={{ mr: 1 }} />
                    Located in {pg.city}, {pg.state}, {pg.country}
                </Typography>
                <Divider sx={{ marginY: 1 }} />
                <Typography variant="h6" sx={{ fontWeight: 'bold', mt: 1 }}>
                    ₹{pg.price}
                </Typography>
                <Divider sx={{ marginY: 1 }} />
                <Grid container spacing={1} sx={{ mt: 1 }}>
                    {pg.amenities.map((amenity) => (
                        <Grid item xs={3} sm={2} key={amenity}>
                            <Tooltip title={amenity} arrow>
                                <div
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                    }}
                                >
                                    {amenitiesIcons[amenity] || (
                                        <Typography variant="body2">
                                            {amenity}
                                        </Typography>
                                    )}
                                </div>
                            </Tooltip>
                        </Grid>
                    ))}
                </Grid>
            </CardContent>
        </Card>
    );
};

export default PgCard;

// src/components/PgCard.js
// import React from 'react';
// import {
//     Box,
//     Typography,
//     Card,
//     CardContent,
//     CardMedia,
//     Grid,
// } from '@mui/material';
// import { styled } from '@mui/material/styles';
// import amenitiesIcons from './amenities';

// const CardContainer = styled(Card)(({ theme }) => ({
//     maxWidth: 400,
//     borderRadius: 8,
//     boxShadow: theme.shadows[3],
//     transition: 'transform 0.3s ease, box-shadow 0.3s ease',
//     '&:hover': {
//         transform: 'scale(1.05)',
//         boxShadow: theme.shadows[6],
//     },
// }));

// const CardMediaStyled = styled(CardMedia)(({ theme }) => ({
//     height: 180,
//     borderTopLeftRadius: 8,
//     borderTopRightRadius: 8,
// }));

// const InfoBox = styled(Box)(({ theme }) => ({
//     padding: theme.spacing(2),
// }));

// const PgCard = ({ pg }) => {
//     return (
//         <CardContainer>
//             <CardMediaStyled
//                 component="img"
//                 image={pg.images[0]} // Display the first image as the card media
//                 alt={pg.name}
//             />
//             <CardContent>
//                 <InfoBox>
//                     <Typography variant="h6" sx={{ mb: 1 }}>
//                         <span style={{ fontWeight: 'bold', color: '#f57c00' }}>
//                             {pg.name}
//                         </span>
//                     </Typography>
//                     <Typography variant="body2" color="textSecondary">
//                         Located in {pg.city}, {pg.state}, {pg.country}
//                     </Typography>
//                     <Typography variant="h6" sx={{ fontWeight: 'bold', mt: 1 }}>
//                         ₹{pg.price}
//                     </Typography>
//                     <Grid container spacing={1} sx={{ mt: 1 }}>
//                         {pg.amenities.map((amenity) => (
//                             <Grid item xs={3} sm={2} key={amenity}>
//                                 <div
//                                     style={{
//                                         display: 'flex',
//                                         alignItems: 'center',
//                                     }}
//                                 >
//                                     {amenitiesIcons[amenity] || (
//                                         <span>{amenity}</span>
//                                     )}
//                                     {/* <Typography variant="body2" sx={{ ml: 1 }}>
//                                     {amenity}
//                                 </Typography> */}
//                                 </div>
//                             </Grid>
//                         ))}
//                     </Grid>
//                 </InfoBox>
//             </CardContent>
//         </CardContainer>
//     );
// };

// export default PgCard;
