import { createTheme } from "@mui/material/styles";

// Light theme
const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#FF9800", // Orange color
    },
    background: {
      default: "#f5f5f5", // Light background color
      paper: "#ffffff", // Light paper color
    },
  },
});

// Dark theme
const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#FF9800", // Orange color
    },
    background: {
      default: "#303030", // Dark background color
      paper: "#424242", // Dark paper color
    },
  },
});

export { lightTheme, darkTheme };
