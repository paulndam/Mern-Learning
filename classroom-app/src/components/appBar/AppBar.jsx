import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import HomeIcon from "@mui/icons-material/Home";
import { withRouter } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Link from "@mui/material/Link";
import auth from "../../auth/AuthHelper";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Badge from "@mui/material/Badge";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Avatar from "@mui/material/Avatar";

const isActive = (history, path) => {
  if (history.location.path === path) {
    return { color: "#f57c00" };
  } else return { color: "#fffde7" };
};

const isPartActive = (history, path) => {
  if (history.location.pathname.includes(path))
    return { color: "#fffde7", backgroundColor: "#f57c00", marginRight: 10 };
  else
    return {
      color: "#616161",
      backgroundColor: "#fffde7",
      border: "1px solid #f57c00",
      marginRight: 10,
    };
};

const theme = createTheme({
  palette: {
    primary: {
      light: "#1769aa",
      main: "#2196f3",
      dark: "#4dabf5",
      contrastText: "#fffde7",
    },
    secondary: {
      light: "#484848",
      main: "#000000",
      dark: "#000000",
      contrastText: "#ffcc00",
    },

    contrastThreshold: 3,
    tonalOffset: 0.2,
    openTitle: "#455a64",
    protectedTitle: "#f57c00",
    type: "light",
  },
});

const Appbar = withRouter(({ history }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem
      //   onClick={handleMenuClose}
      >
        {auth.isAuthenticated() && (
          <Link
            href={`/user/${auth.isAuthenticated().user._id}`}
            underline="none"
          >
            <Button
              style={isActive(
                history,
                `/user/${auth.isAuthenticated().user._id}`
              )}
              variant="contained"
              color="warning"
            >
              My Profile
            </Button>
          </Link>
        )}
      </MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ bgcolor: "secondary.main" }}>
          <Toolbar>
            <Link href="/" underline="none">
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
                style={isActive(history, "/")}
              >
                <HomeIcon />
              </IconButton>
            </Link>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Mern-Learn
            </Typography>

            <Link
              href="/users"
              underline="none"
              sx={{ flexGrow: 0.1, color: "white", marginRight: 10 }}
            >
              Students
            </Link>

            <Link
              href="/about"
              underline="none"
              sx={{ flexGrow: 0.1, color: "white", marginRight: 10 }}
            >
              About-Us
            </Link>

            <Link
              href="/contact"
              underline="none"
              sx={{ flexGrow: 0.1, color: "white", marginRight: 10 }}
            >
              Contact
            </Link>

            {auth.isAuthenticated() && (
              <Link
                href={`/user/${auth.isAuthenticated().user._id}`}
                underline="none"
                sx={{ flexGrow: 0.1, color: "white", marginRight: 10 }}
              >
                Profile
              </Link>
            )}

            {!auth.isAuthenticated() && (
              <Stack direction="row" spacing={2}>
                <Link href="/signup" underline="none">
                  <Button
                    style={isActive(history, "/signup")}
                    variant="contained"
                    //   color="success"
                    sx={{ bgcolor: "primary.main" }}
                  >
                    Sign-Up
                  </Button>
                </Link>
                <Link href="/signin" underline="none">
                  <Button
                    style={isActive(history, "/signin")}
                    variant="outlined"
                    color="warning"
                  >
                    Sign-In
                  </Button>
                </Link>
              </Stack>
            )}

            {auth.isAuthenticated() && (
              <>
                <Typography variant="h6" sx={{ p: 2, pb: 0 }}>
                  Hello 👋🏻 {auth.isAuthenticated().user.name}
                  {console.log(auth.isAuthenticated())}
                </Typography>

                <Box
                  sx={{
                    display: { xs: "none", md: "flex", marginRight: 50 },
                  }}
                >
                  <IconButton
                    size="large"
                    edge="end"
                    aria-label="account of current user"
                    aria-controls={menuId}
                    aria-haspopup="true"
                    onClick={handleProfileMenuOpen}
                    color="inherit"
                  >
                    <Avatar
                      alt="profile-pic"
                      src={`${process.env.REACT_APP_API}/api/users/photo/${
                        auth.isAuthenticated().user._id
                      }`}
                    />
                  </IconButton>
                </Box>

                {auth.isAuthenticated() &&
                  auth.isAuthenticated().user.educator && (
                    <Stack direction="row" spacing={2}>
                      <Link href="/teach/courses" underline="none">
                        <Button
                          style={isPartActive(history, "/teach/")}
                          variant="contained"
                          color="info"
                        >
                          Teach
                        </Button>
                      </Link>
                    </Stack>
                  )}

                <Stack direction="row" spacing={2}>
                  <Link href="/signup" underline="none">
                    <Button
                      onClick={() => {
                        auth.clearJWT(() => history.push("/"));
                      }}
                      variant="contained"
                      color="warning"
                      // sx={{ bgcolor: "primary.main" }}
                    >
                      Log-Out
                    </Button>
                  </Link>
                </Stack>
              </>
            )}
          </Toolbar>
        </AppBar>
        {renderMobileMenu}
        {renderMenu}
      </Box>
    </ThemeProvider>
  );
});

export default Appbar;
