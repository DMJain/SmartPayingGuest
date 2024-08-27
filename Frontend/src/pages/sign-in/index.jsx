import { useState, useEffect } from 'react';
import {
    Box,
    TextField,
    Typography,
    Button,
    Grid,
    CircularProgress,
    Alert,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useLoggedInUser, useSignin } from '../../hooks/auth.hooks';

const SignInPage = () => {
    const navigate = useNavigate();
    const { data: user, isLoading } = useLoggedInUser();
    const { mutateAsync: signinAsync } = useSignin();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        if (user && !isLoading) {
            navigate('/dashboard'); // Redirect to dashboard if already logged in
        }
    }, [user, navigate, isLoading]);

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setErrorMessage('');

        // Basic validation
        if (!/\S+@\S+\.\S+/.test(email)) {
            setErrorMessage('Please enter a valid email address.');
            setIsSubmitting(false);
            return;
        }

        try {
            await signinAsync({ email, password });
            // Redirect happens via the useLoggedInUser effect
        } catch (error) {
            console.error('Signin failed:', error);
            setErrorMessage(
                'Signin failed. Please check your credentials and try again.'
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
            sx={{ padding: 3, backgroundColor: 'background.default' }}
        >
            <Box
                component="form"
                onSubmit={handleFormSubmit}
                sx={{
                    padding: 4,
                    boxShadow: 3,
                    borderRadius: 2,
                    backgroundColor: 'background.paper',
                    maxWidth: 400,
                    width: '100%',
                }}
            >
                <Box display="flex" justifyContent="center" mb={3}>
                    <img
                        src="https://ik.imagekit.io/tej/StayNestLogo.png?updatedAt=1724339358442"
                        alt="Logo"
                        style={{ maxHeight: '70px' }}
                    />
                </Box>
                <Typography
                    variant="h3"
                    align="center"
                    sx={{
                        fontSize: '1.5rem',
                        fontWeight: '500',
                        fontFamily: 'sans-serif',
                    }}
                    gutterBottom
                >
                    Sign In to StayNest
                </Typography>

                {errorMessage && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {errorMessage}
                    </Alert>
                )}

                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            fullWidth
                            label="Email Address"
                            type="email"
                            required
                            error={
                                !!errorMessage && !/\S+@\S+\.\S+/.test(email)
                            }
                            helperText={
                                !!errorMessage && !/\S+@\S+\.\S+/.test(email)
                                    ? 'Enter a valid email address'
                                    : undefined
                            }
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            fullWidth
                            label="Password"
                            type="password"
                            required
                            error={!!errorMessage}
                            helperText={
                                errorMessage
                                    ? 'Password might be incorrect'
                                    : undefined
                            }
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            fullWidth
                            variant="contained"
                            color="primary"
                            startIcon={
                                isSubmitting && <CircularProgress size={20} />
                            }
                        >
                            {isSubmitting ? 'Signing In...' : 'Sign In'}
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};

export default SignInPage;
