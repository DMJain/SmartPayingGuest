import React, { useState } from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    IconButton,
    Box,
    TextField,
    Menu,
    MenuItem,
} from '@mui/material';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useSignOut, useLoggedInUser } from '../../hooks/auth.hooks';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import ProfileIcon from '@mui/icons-material/Person'; // Or any other icon
import { useNavigate } from 'react-router-dom';

// Define common styles
const appBarStyles = {
    backgroundColor: 'background.paper',
};

const logoStyles = {
    height: '40px',
};

const searchFieldStyles = {
    backgroundColor: 'background.paper',
    borderRadius: '4px',
    marginRight: 2,
};

const buttonStyles = {
    backgroundColor: 'primary.main',
    borderRadius: '20px',
    padding: '8px 16px',
    color: 'white',
    '&:hover': {
        backgroundColor: 'primary.dark',
    },
};

const iconButtonStyles = {
    backgroundColor: 'primary.main', // Background color from the theme
    color: 'white', // Icon color
    '&:hover': {
        backgroundColor: 'primary.dark', // Darker background on hover
    },
};

const Navbar = ({ isDarkMode, toggleTheme }) => {
    const { data: user } = useLoggedInUser();
    const signOutMutation = useSignOut();
    const navigate = useNavigate();

    // State for managing the dropdown menu
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleMyPgs = () => {
        navigate('/myads');
    };
    const handleSignOut = () => {
        signOutMutation.mutate();
        handleClose();
    };

    return (
        <AppBar position="fixed" sx={appBarStyles}>
            <Toolbar>
                <Typography
                    variant="h6"
                    component={Link}
                    to="/"
                    sx={{
                        flexGrow: 1,
                        textDecoration: 'none',
                        color: 'inherit',
                        fontWeight: 'bold',
                    }}
                >
                    <img
                        src="https://ik.imagekit.io/tej/StayNestLogo.png?updatedAt=1724339358442"
                        alt="Logo"
                        style={logoStyles}
                    />
                </Typography>

                <TextField
                    variant="outlined"
                    placeholder="Search PG..."
                    size="small"
                    sx={searchFieldStyles}
                />

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    {user ? (
                        <>
                            <IconButton
                                color="inherit"
                                onClick={handleClick}
                                sx={iconButtonStyles}
                            >
                                <ProfileIcon />
                            </IconButton>
                            <Menu
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                            >
                                <MenuItem
                                    component={Link}
                                    to="/profile"
                                    onClick={handleClose}
                                >
                                    Profile
                                </MenuItem>
                                <MenuItem onClick={handleMyPgs}>
                                    My PGs
                                </MenuItem>
                                <MenuItem onClick={handleSignOut}>
                                    Sign out
                                </MenuItem>
                            </Menu>
                        </>
                    ) : (
                        <>
                            <Button
                                color="inherit"
                                component={Link}
                                to="/sign-in"
                                sx={buttonStyles}
                            >
                                Sign In
                            </Button>
                            <Button
                                color="inherit"
                                component={Link}
                                to="/sign-up"
                                sx={buttonStyles}
                            >
                                Sign Up
                            </Button>
                        </>
                    )}

                    <IconButton
                        color="inherit"
                        onClick={toggleTheme}
                        sx={iconButtonStyles}
                    >
                        {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
                    </IconButton>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

// Prop validation
Navbar.propTypes = {
    isDarkMode: PropTypes.bool.isRequired,
    toggleTheme: PropTypes.func.isRequired,
};

export default Navbar;
