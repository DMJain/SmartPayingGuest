import React, { useState } from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    IconButton,
    Box,
    Menu,
    MenuItem,
    useMediaQuery,
    Drawer,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';
import { useSignOut, useLoggedInUser } from '../../hooks/auth.hooks';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import ProfileIcon from '@mui/icons-material/Person';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LoginIcon from '@mui/icons-material/Login';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';

// Define common styles separately
const useStyles = (theme, isMobile) => ({
    appBar: {
        backgroundColor: theme.palette.background.paper,
    },
    logoContainer: {
        display: 'flex',
        alignItems: 'center',
        textDecoration: 'none',
        color: 'inherit',
        flexGrow: 1,
    },
    logoImage: {
        maxHeight: '70px',
        marginRight: '8px',
    },
    button: {
        backgroundColor: theme.palette.primary.main,
        borderRadius: '4px',
        padding: '6px 12px',
        color: 'white',
        '&:hover': {
            backgroundColor: theme.palette.primary.dark,
        },
    },
    iconButton: {
        backgroundColor: theme.palette.primary.main,
        color: 'white',
        '&:hover': {
            backgroundColor: theme.palette.primary.dark,
        },
    },
    menuItem: {
        color: theme.palette.text.primary,
        transition: 'background-color 0.3s, transform 0.3s',
        '&:hover': {
            backgroundColor: theme.palette.grey[200],
            transform: 'scale(1.05)',
        },
    },
    drawerListItem: {
        color: theme.palette.text.primary,
        transition: 'background-color 0.3s, transform 0.3s',
        '&:hover': {
            backgroundColor: theme.palette.grey[200],
            transform: 'scale(1.05)',
        },
    },
});

const Navbar = ({ isDarkMode, toggleTheme }) => {
    const { data: user } = useLoggedInUser();
    const signOutMutation = useSignOut();
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    // State for managing the dropdown menu and mobile drawer
    const [anchorEl, setAnchorEl] = useState(null);
    const [mobileOpen, setMobileOpen] = useState(false);
    const open = Boolean(anchorEl);

    const styles = useStyles(theme, isMobile);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleMyPgs = () => {
        navigate('/myads');
        if (isMobile) {
            handleDrawerToggle();
        } else {
            handleClose();
        }
    };

    const handleSignOut = () => {
        signOutMutation.mutate();
        handleClose();
    };

    const renderDesktopMenu = () => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Button
                variant="outlined"
                sx={styles.button}
                component={Link}
                to="/post-your-pg"
            >
                <AddCircleOutlineIcon sx={{ marginRight: 1 }} /> Post Your PG
            </Button>
            {user ? (
                <>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            backgroundColor: theme.palette.primary.main,
                            borderRadius: '4px',
                            padding: '6px 12px',
                            cursor: 'pointer',
                            '&:hover': {
                                backgroundColor: theme.palette.primary.dark,
                            },
                        }}
                        onClick={handleClick}
                    >
                        <IconButton
                            color="white"
                            sx={{
                                padding: 0,
                                backgroundColor: 'transparent',
                            }}
                        >
                            <ProfileIcon sx={{ color: 'white' }} />
                        </IconButton>
                        <Typography
                            variant="body1"
                            sx={{ marginLeft: 1, color: 'white' }}
                        >
                            {user.firstName.toUpperCase()}
                        </Typography>
                    </Box>
                    <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                        <MenuItem
                            component={Link}
                            to="/profile"
                            onClick={handleClose}
                            sx={styles.menuItem}
                        >
                            <ListItemIcon>
                                <AccountCircleIcon />
                            </ListItemIcon>
                            Profile
                        </MenuItem>
                        <MenuItem onClick={handleMyPgs} sx={styles.menuItem}>
                            <ListItemIcon>
                                <ProfileIcon />
                            </ListItemIcon>
                            My PGs
                        </MenuItem>
                        <MenuItem onClick={handleSignOut} sx={styles.menuItem}>
                            <ListItemIcon>
                                <ExitToAppIcon />
                            </ListItemIcon>
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
                        sx={styles.button}
                    >
                        <LoginIcon sx={{ marginRight: 1 }} /> Sign In
                    </Button>
                    <Button
                        color="inherit"
                        component={Link}
                        to="/sign-up"
                        sx={styles.button}
                    >
                        <AppRegistrationIcon sx={{ marginRight: 1 }} /> Sign Up
                    </Button>
                </>
            )}
            <IconButton
                color="inherit"
                onClick={toggleTheme}
                sx={styles.iconButton}
            >
                {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>
        </Box>
    );

    const renderMobileMenu = () => (
        <Drawer anchor="right" open={mobileOpen} onClose={handleDrawerToggle}>
            <List>
                <ListItem
                    component={Link}
                    to="/"
                    onClick={handleDrawerToggle}
                    sx={styles.drawerListItem}
                >
                    <ListItemIcon>
                        <HomeIcon />
                    </ListItemIcon>
                    <ListItemText primary="Home" />
                </ListItem>
                <ListItem
                    component={Link}
                    to="/post-your-pg"
                    onClick={handleDrawerToggle}
                    sx={styles.drawerListItem}
                >
                    <ListItemIcon>
                        <AddCircleOutlineIcon />
                    </ListItemIcon>
                    <ListItemText primary="Post Your PG" />
                </ListItem>
                {user ? (
                    <>
                        <ListItem
                            component={Link}
                            to="/profile"
                            onClick={handleDrawerToggle}
                            sx={styles.drawerListItem}
                        >
                            <ListItemIcon>
                                <AccountCircleIcon />
                            </ListItemIcon>
                            <ListItemText primary="Profile" />
                        </ListItem>
                        <ListItem
                            button
                            onClick={handleMyPgs}
                            sx={styles.drawerListItem}
                        >
                            <ListItemIcon>
                                <ProfileIcon />
                            </ListItemIcon>
                            <ListItemText primary="My PGs" />
                        </ListItem>
                        <ListItem
                            button
                            onClick={handleSignOut}
                            sx={styles.drawerListItem}
                        >
                            <ListItemIcon>
                                <ExitToAppIcon />
                            </ListItemIcon>
                            <ListItemText primary="Sign out" />
                        </ListItem>
                    </>
                ) : (
                    <>
                        <ListItem
                            component={Link}
                            to="/sign-in"
                            onClick={handleDrawerToggle}
                            sx={styles.drawerListItem}
                        >
                            <ListItemIcon>
                                <LoginIcon />
                            </ListItemIcon>
                            <ListItemText primary="Sign In" />
                        </ListItem>
                        <ListItem
                            component={Link}
                            to="/sign-up"
                            onClick={handleDrawerToggle}
                            sx={styles.drawerListItem}
                        >
                            <ListItemIcon>
                                <AppRegistrationIcon />
                            </ListItemIcon>
                            <ListItemText primary="Sign Up" />
                        </ListItem>
                    </>
                )}
                <ListItem
                    button
                    onClick={toggleTheme}
                    sx={styles.drawerListItem}
                >
                    <ListItemIcon>
                        {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
                    </ListItemIcon>
                    <ListItemText
                        primary={isDarkMode ? 'Light Mode' : 'Dark Mode'}
                    />
                </ListItem>
            </List>
        </Drawer>
    );

    return (
        <AppBar position="fixed" sx={styles.appBar}>
            <Toolbar>
                {/* Logo and Text */}
                <Box component={Link} to="/" sx={styles.logoContainer}>
                    <img
                        src="https://firebasestorage.googleapis.com/v0/b/staynest-uploading-images.appspot.com/o/logoStayNest.png?alt=media&token=e8e040b2-cad3-45cb-b2c9-2c1696da3608"
                        alt="Logo"
                        style={styles.logoImage}
                    />
                </Box>

                {isMobile ? (
                    <IconButton
                        edge="end"
                        color="inherit"
                        aria-label="menu"
                        onClick={handleDrawerToggle}
                    >
                        <MenuIcon />
                    </IconButton>
                ) : (
                    renderDesktopMenu()
                )}
            </Toolbar>
            {isMobile && renderMobileMenu()}
        </AppBar>
    );
};

// PropTypes for Navbar component
Navbar.propTypes = {
    isDarkMode: PropTypes.bool.isRequired,
    toggleTheme: PropTypes.func.isRequired,
};

export default Navbar;
