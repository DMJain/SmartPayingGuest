import { useState, useEffect, useMemo } from 'react';
import {
    Box,
    TextField,
    Typography,
    Button,
    Grid,
    CircularProgress,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useLoggedInUser, useSignup } from '../../hooks/auth.hooks';

const SignupPage = () => {
    const navigate = useNavigate();
    const { data: user, isLoading } = useLoggedInUser();

    const { mutateAsync: signupAsync } = useSignup();

    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [passwordError, setPasswordError] = useState('');

    useEffect(() => {
        console.log(user, isLoading);
        if (user && !isLoading) {
            navigate('/dashboard'); // Redirect to dashboard if already logged in
        }
    }, [user, navigate, isLoading]);

    const isConfirmPasswordMatch = useMemo(
        () => password === confirmPassword || confirmPassword === '',
        [confirmPassword, password]
    );

    const validatePassword = (password) => {
        if (password.length < 8) {
            return 'Password must be at least 8 characters long.';
        }
        if (!/[A-Z]/.test(password)) {
            return 'Password must contain at least one uppercase letter.';
        }
        if (!/[a-z]/.test(password)) {
            return 'Password must contain at least one lowercase letter.';
        }
        if (!/[0-9]/.test(password)) {
            return 'Password must contain at least one number.';
        }
        if (!/[^A-Za-z0-9]/.test(password)) {
            return 'Password must contain at least one special character (e.g., !@#$%^&*).';
        }
        return ''; // No errors
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        // Validate the password before making the API call
        const passwordValidationError = validatePassword(password);
        if (passwordValidationError) {
            setPasswordError(passwordValidationError);
            return; // Exit the function if the password is invalid
        } else {
            setPasswordError('');
        }

        setIsSubmitting(true);

        try {
            await signupAsync({
                firstName: firstname,
                lastName: lastname,
                email,
                password,
            });
            console.log('Account created successfully!');
            setFirstname('');
            setLastname('');
            setEmail('');
            setPassword('');
            setConfirmPassword('');
        } catch (error) {
            console.error('Signup failed:', error);
            //alert("Signup failed. Please try again.");
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
                        src="https://firebasestorage.googleapis.com/v0/b/staynest-uploading-images.appspot.com/o/logoStayNest.png?alt=media&token=e8e040b2-cad3-45cb-b2c9-2c1696da3608"
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
                    Create Your StayNest Account
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            name="firstname"
                            value={firstname}
                            onChange={(e) => setFirstname(e.target.value)}
                            label="First Name"
                            required
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            name="lastname"
                            value={lastname}
                            onChange={(e) => setLastname(e.target.value)}
                            label="Last Name"
                            required
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            fullWidth
                            label="Email Address"
                            type="email"
                            required
                            error={email && !/\S+@\S+\.\S+/.test(email)}
                            helperText={
                                email && !/\S+@\S+\.\S+/.test(email)
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
                            error={Boolean(passwordError)}
                            helperText={passwordError}
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            name="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            error={!isConfirmPasswordMatch}
                            helperText={
                                !isConfirmPasswordMatch
                                    ? 'Passwords do not match'
                                    : undefined
                            }
                            fullWidth
                            label="Confirm Password"
                            type="password"
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            type="submit"
                            disabled={!isConfirmPasswordMatch || isSubmitting}
                            fullWidth
                            variant="contained"
                            color="primary"
                            startIcon={
                                isSubmitting && <CircularProgress size={20} />
                            }
                        >
                            {isSubmitting
                                ? 'Creating Account...'
                                : 'Create Account'}
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};

export default SignupPage;
