import { useState, useMemo, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { lightTheme, darkTheme } from './theme';
import { Box } from '@mui/material';
import SigninPage from './pages/sign-in';
import SignupPage from './pages/sign-up';
import DashboardPage from './pages/Dashboard';
import Navbar from './pages/Navbar';
import MyAdsPage from './pages/myads';
import './App.css';
import HomePage from './pages/Homepage/HomePage';
import PostPGForm from './pages/myads/PostPGForm';

function App() {
    const [isDarkMode, setIsDarkMode] = useState(
        () => JSON.parse(localStorage.getItem('isDarkMode')) || false
    );

    useEffect(() => {
        localStorage.setItem('isDarkMode', JSON.stringify(isDarkMode));
    }, [isDarkMode]);

    const toggleTheme = () => {
        setIsDarkMode((prevMode) => !prevMode);
    };

    const theme = useMemo(
        () => (isDarkMode ? darkTheme : lightTheme),
        [isDarkMode]
    );

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {/* Layout container for Navbar and page content */}
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: '100vh',
                }}
            >
                <Navbar isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
                <Box component="main" sx={{ flexGrow: 1, mt: '64px' }}>
                    {' '}
                    {/* Adjust '64px' if Navbar height changes */}
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/dashboard" element={<DashboardPage />} />
                        <Route path="/sign-in" element={<SigninPage />} />
                        <Route path="/sign-up" element={<SignupPage />} />
                        <Route path="/myads" element={<MyAdsPage />} />
                        <Route path="/post-your-pg" element={<PostPGForm />} />
                    </Routes>
                </Box>
            </Box>
        </ThemeProvider>
    );
}

export default App;
