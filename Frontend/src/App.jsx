import { useState, useMemo, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { lightTheme, darkTheme } from './theme';
import SigninPage from './pages/sign-in';
import SignupPage from './pages/sign-up';
import DashboardPage from './pages/Dashboard';
import Navbar from './pages/Navbar';
import MyAdsPage from './pages/myads';
import './App.css';

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
            <div>
                <Navbar isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
                <Routes>
                    <Route path="/dashboard" element={<DashboardPage />} />
                    <Route path="/sign-in" element={<SigninPage />} />
                    <Route path="/sign-up" element={<SignupPage />} />
                    <Route path="/myads" element={<MyAdsPage />} />
                </Routes>
            </div>
        </ThemeProvider>
    );
}

export default App;
