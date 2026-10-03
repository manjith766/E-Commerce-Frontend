import { createTheme } from "@mui/material";

const customeTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#E87532",
      light: "#FF8C4A",
      dark: "#C95E24",
      contrastText: "#F5F0E8",
    },
    secondary: {
      main: "#C95E24",
      light: "#E87532",
      dark: "#A64F27",
      contrastText: "#F5F0E8",
    },
    background: {
      default: "#101114",
      paper: "#191A1E",
    },
    text: {
      primary: "#F5F0E8",
      secondary: "#A6A29B",
    },
    divider: "rgba(245, 240, 232, 0.12)",
  },
  typography: {
    fontFamily: "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif",
    h1: {
      fontFamily: "'Cinzel', 'Playfair Display', serif",
      letterSpacing: "0.04em",
      color: "#F5F0E8",
    },
    h2: {
      fontFamily: "'Cinzel', 'Playfair Display', serif",
      letterSpacing: "0.03em",
      color: "#F5F0E8",
    },
    h3: {
      fontFamily: "'Cinzel', 'Playfair Display', serif",
      letterSpacing: "0.02em",
      color: "#F5F0E8",
    },
    h4: {
      fontFamily: "'Playfair Display', Georgia, serif",
      color: "#F5F0E8",
    },
    h5: {
      fontFamily: "'Playfair Display', Georgia, serif",
      color: "#F5F0E8",
    },
    h6: {
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      fontWeight: 600,
      color: "#F5F0E8",
    },
    button: {
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      fontWeight: 600,
      textTransform: "none",
      letterSpacing: "0.04em",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
          padding: "10px 24px",
          fontWeight: 600,
          transition: "all 0.25s ease-in-out",
        },
        containedPrimary: {
          background: "linear-gradient(135deg, #E87532 0%, #C95E24 100%)",
          color: "#F5F0E8",
          boxShadow: "0 4px 20px rgba(232, 117, 50, 0.25)",
          "&:hover": {
            background: "linear-gradient(135deg, #FF8C4A 0%, #E87532 100%)",
            boxShadow: "0 6px 25px rgba(232, 117, 50, 0.4)",
            transform: "translateY(-1px)",
          },
        },
        outlinedPrimary: {
          borderColor: "rgba(232, 117, 50, 0.5)",
          color: "#E87532",
          "&:hover": {
            borderColor: "#E87532",
            background: "rgba(232, 117, 50, 0.08)",
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
          backgroundColor: "#191A1E",
          border: "1px solid rgba(245, 240, 232, 0.08)",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: "#141518",
          borderRadius: "8px",
          "& fieldset": {
            borderColor: "rgba(245, 240, 232, 0.15)",
          },
          "&:hover fieldset": {
            borderColor: "rgba(232, 117, 50, 0.5)",
          },
          "&.Mui-focused fieldset": {
            borderColor: "#E87532",
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          backgroundColor: "#1E2026",
          color: "#F5F0E8",
          border: "1px solid rgba(245, 240, 232, 0.12)",
        },
      },
    },
  },
});

export default customeTheme;