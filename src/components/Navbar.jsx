import { AppBar, Toolbar, Button, IconButton } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SettingsIcon from "@mui/icons-material/Settings";

const Navbar = () => {
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    return (
        <AppBar
            position="static"
            sx={{
                backgroundColor: "#8E2839",
                height: "60px",
                display: "flex",
                justifyContent: "center",
                borderRadius: "12px",
                margin: "0 auto",
                maxWidth: "98%",
                mt: 2,
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.15)",
                fontFamily: "Lato, sans-serif",
                "& .MuiToolbar-root": {
                    padding: "0 16px",
                },
            }}
        >
            <Toolbar
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    minHeight: "45px !important",
                    gap: "32px",
                }}
            >
                <div style={{ display: "flex", gap: "32px" }}>
                    <Button
                        color="inherit"
                        component={Link}
                        to="/"
                        sx={{
                            fontSize: "20px",
                            textTransform: "uppercase",
                            fontFamily: "Lato, sans-serif",
                            fontWeight: 700,
                            color: "#FFF1E8",
                            padding: "4px 8px",
                            minWidth: "auto",
                            letterSpacing: "0.5px",
                            borderBottom: isActive("/") ? "3px solid #FFF1E8" : "none",
                            "&:hover": {
                                backgroundColor: "transparent",
                                opacity: 0.9,
                            },
                        }}
                    >
                        HOME
                    </Button>
                    <Button
                        color="inherit"
                        component={Link}
                        to="/create-scratch"
                        sx={{
                            fontSize: "20px",
                            textTransform: "uppercase",
                            fontFamily: "Lato, sans-serif",
                            fontWeight: 700,
                            color: "#FFF1E8",
                            padding: "4px 8px",
                            minWidth: "auto",
                            letterSpacing: "0.5px",
                            borderBottom: isActive("/create-scratch") ? "3px solid #FFF1E8" : "none",
                            "&:hover": {
                                backgroundColor: "transparent",
                                opacity: 0.9,
                            },
                        }}
                    >
                        CREATE EXAM
                    </Button>
                    <Button
                        color="inherit"
                        component={Link}
                        to="/take/sample-exam"
                        sx={{
                            fontSize: "20px",
                            textTransform: "uppercase",
                            fontFamily: "Lato, sans-serif",
                            fontWeight: 700,
                            color: "#FFF1E8",
                            padding: "4px 8px",
                            minWidth: "auto",
                            letterSpacing: "0.5px",
                            borderBottom: isActive("/take/sample-exam") ? "3px solid #FFF1E8" : "none",
                            "&:hover": {
                                backgroundColor: "transparent",
                                opacity: 0.9,
                            },
                        }}
                    >
                        TAKE EXAM
                    </Button>
                </div>

                <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
                    <IconButton
                        color="inherit"
                        sx={{
                            color: "#FFF1E8",
                            "&:hover": {
                                backgroundColor: "rgba(255, 241, 232, 0.1)",
                            },
                        }}
                    >
                        <SettingsIcon sx={{ fontSize: 28 }} />
                    </IconButton>

                    <IconButton
                        color="inherit"
                        sx={{
                            color: "#FFF1E8",
                            "&:hover": {
                                backgroundColor: "rgba(255, 241, 232, 0.1)",
                            },
                        }}
                    >
                        <AccountCircleIcon sx={{ fontSize: 32 }} />
                    </IconButton>
                </div>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
