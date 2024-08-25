import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
} from "@mui/material";
//import { useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useSignOut } from "../../hooks/auth.hooks";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { useLoggedInUser } from "../../hooks/auth.hooks";

const Navbar = ({ isDarkMode, toggleTheme }) => {
  //const navigate = useNavigate();
  const { data: user } = useLoggedInUser();
  //const navigate = useNavigate();
  const signOutMutation = useSignOut();

  // useEffect(() => {
  //   if (!user) {
  //     navigate("/sign-in"); // Redirect to sign-in if not logged in
  //   }
  // }, [user, navigate]);

  const handleSignOut = () => {
    signOutMutation.mutate();
  };

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "background.paper",
      }}
    >
      <Toolbar>
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{
            flexGrow: 1,
            textDecoration: "none",
            color: "inherit",
            fontWeight: "bold",
          }}
        >
          <img
            src="https://ik.imagekit.io/tej/StayNestLogo.png?updatedAt=1724339358442"
            alt="Logo"
            style={{ height: "40px" }}
          />
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {user ? (
            <>
              <Button
                color="inherit"
                component={Link}
                to="/profile"
                sx={{
                  backgroundColor: "primary.main",
                  borderRadius: "20px",
                  padding: "8px 16px",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "primary.dark",
                  },
                }}
              >
                Profile
              </Button>
              <Button
                color="inherit"
                sx={{
                  backgroundColor: "primary.main",
                  borderRadius: "20px",
                  padding: "8px 16px",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "primary.dark",
                  },
                }}
                onClick={handleSignOut}
              >
                Sign out
              </Button>
            </>
          ) : (
            <>
              <Button
                color="inherit"
                component={Link}
                to="/sign-in"
                sx={{
                  backgroundColor: "primary.main",
                  borderRadius: "20px",
                  padding: "8px 16px",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "primary.dark",
                  },
                }}
              >
                Sign In
              </Button>
              <Button
                color="inherit"
                component={Link}
                to="/sign-up"
                sx={{
                  backgroundColor: "primary.main",
                  borderRadius: "20px",
                  padding: "8px 16px",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "primary.dark",
                  },
                }}
              >
                Sign Up
              </Button>
            </>
          )}

          <IconButton color="inherit" onClick={toggleTheme}>
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
