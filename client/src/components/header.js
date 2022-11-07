import React, { useState, useEffect } from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import Grid from "@mui/material/Grid";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Image from "@mui/icons-material/Image"
import { Link } from "react-router-dom";
import logo from "../assets/image/logo.png";
import { Button } from "@mui/material";
import Modal from "@mui/material/Modal";
import { Card, CardContent, Paper, TextField, Select, FormControl, InputLabel } from '@mui/material';
import alignProperty from '@mui/material/styles/cssUtils';
import { color, fontSize, width } from '@mui/system';
import axios from "axios";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import Navbar from "./navbar";
import { baseUrl, regex, error } from "./constants";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function Header() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const initialError = { name: "", email: "", password: "", username: "", phone: "", cpassword: "", }
  const [formErrors, SetFormErrors] = useState(initialError);
  const [isSubmit, setIsSubmit] = useState(false);
  let navigate = useNavigate();
  const initialValues = { name: "", email: "", password: "", username: "", phone: "", cpassword: "", }
  const [formValues, SetFormValues] = useState(initialValues);
  const [validateError, setValidateError] = useState();
  const [nameFocus, setNameFocus] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);
  const [usernameFocus, setUsernameFocus] = useState(false);
  const [phoneFocus, setPhoneFocus] = useState(false);
  const [cpasswordFocus, setCPasswordFocus] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const oldFormValues = { ...formValues };
    oldFormValues[name] = value;
    SetFormValues(oldFormValues);
    console.log(formValues);
  };

  useEffect(() => {
    if (nameFocus || emailFocus || passwordFocus || usernameFocus || phoneFocus || cpasswordFocus) {
      validate(formValues);
      // setValidateError(validateErrors);
    }
  }, [formValues]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validateErrors = validate(formValues);
    // setValidateError(validateErrors);
    setIsSubmit(true);
    if (!validateErrors) {
      axios({
        method: "post",
        url: `/saveData`,
        data: formValues,
      })
        .then((res) => {
          swal({
            title: "Successfully Registered!",
            text: "Please log In!",
            icon: "success",
            button: "ok",
          });
          navigate("/SignIn")
        })
        .catch((err) => {
          console.log("erro : ", err)
          swal({
            title: "Wrong!",
            text: "Something went wrong!",
            icon: "warning",
            button: "ok",
          });
        });
      SetFormValues(initialValues);
      SetFormErrors(initialError);
    }
  }

  const loginOpen = () => {
    navigate('/SignIn');
  }
  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) { }
  })

  const validate = (values) => {
    let isError = false;
    const errors = {}
    if (!values.name) {
      isError = true;
      errors.name = error.requiredError;
    }
    if (!values.email) {
      isError = true;
      errors.email = error.requiredError;
    } else if (!regex.emailRegex.test(values.email)) {
      errors.email = error.emailError;
    }
    if (!values.password) {
      isError = true;
      errors.password = error.requiredError;
    } else if (!regex.passwordRegex.test(values.password)) {
      isError = true;
      errors.password = error.passwordError;
    }

    if (values.password != values.cpassword) {
      isError = true;
      errors.cpassword = error.confirmPassword;

    }
    if (!values.cpassword) {
      isError = true;
      errors.cpassword = error.requiredError;
    }
    if (!values.username) {
      isError = true;
      errors.username = error.requiredError;
    }
    if (!values.cpassword) {
      isError = true;
      errors.cpassword = error.requiredError;
    }
    if (!values.phone) {
      isError = true;
      errors.phone = error.requiredError;
    } else if (!regex.phoneRegex.test(values.phone)) {
      isError = true;
      errors.phone = error.phoneError;
    }
    SetFormErrors(errors);
    return isError;
  }

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
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
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
    <Box sx={{ flexGrow: 1, backgroundColor: "black" }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <AppBar position="static">
            <Toolbar>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ display: { xs: "none", sm: "block" } }}
              >
                <img className="logo" src={logo} />
              </Typography>
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ "aria-label": "search" }}
                />
              </Search>
              <Navbar />
              <Box sx={{ flexGrow: 1 }} />
              <Box sx={{ display: { xs: "none", md: "flex" } }}>
                <IconButton
                  size="large"
                  aria-label="show 4 new mails"
                  color="inherit"
                >
                  <Badge badgeContent={4} color="error">
                    <MailIcon />
                  </Badge>
                </IconButton>
                <IconButton
                  size="large"
                  aria-label="show 17 new notifications"
                  color="inherit"
                >
                  <Badge
                    badgeContent={17}
                    color="error"
                    sx={{ marginRight: "25px" }}
                  >
                    <ShoppingCartIcon />
                  </Badge>
                </IconButton>
                <Typography
                  variant="h6"
                  noWrap
                  component="div"
                  sx={{
                    display: { xs: "none", sm: "block", marginTop: "8px" },
                  }}
                >
                  {/* <Button onClick={handleOpen}>Sign In</Button> */}
                </Typography>
                <Typography
                  variant="h6"
                  noWrap
                  component="div"
                  sx={{
                    display: { xs: "none", sm: "block", marginTop: "8px" },
                  }}
                >
                </Typography>
                <Button onClick={handleOpen}>Sign Up</Button>
                <Button onClick={loginOpen}>Sign In</Button>
                <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box component="form" id="form" className="custom-style">
                    <Card sx={{ backgroundColor: 'white', color: 'Black', width: '57vh' }}>
                      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        <Grid item xs={12}>
                          <Typography sx={{ textAlign: 'left', fontSize: '30px', fontFamily: 'cursive', fontWeight: '800', marginTop: '2px' }} variant='h2'>Registration</Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <Typography sx={{ textAlign: 'left', fontSize: '15px', paddingTop: '12px', fontWeight: '600' }} variant='subtitle1'>Full Name</Typography>
                          <TextField sx={{ width: '53vh' }} id="name" label="Enter full name" variant="outlined" name="name" required onChange={handleChange} value={formValues.name} onFocus={() => setNameFocus(true)} />
                          <Typography sx={{ color: 'red' }} variant='body2' >{formErrors.name}</Typography>
                          <Typography sx={{ textAlign: 'left', fontSize: '15px', paddingTop: '12px', fontWeight: '600' }} variant='subtitle1' >Email</Typography>
                          <TextField sx={{ width: '53vh' }} id="email" label="Enter email address" variant="outlined" name="email" required onChange={handleChange} value={formValues.email} onFocus={() => setEmailFocus(true)} />
                          <Typography sx={{ color: 'red' }} variant='body2' >{formErrors.email}</Typography>
                          <Typography sx={{ textAlign: 'left', fontSize: '15px', paddingTop: '12px', fontWeight: '600' }} variant='subtitle1'>User Name</Typography>
                          <TextField sx={{ width: '53vh' }} id="username" label="Enter user name" variant="outlined" name="username" required onChange={handleChange} value={formValues.username} onFocus={() => setUsernameFocus(true)} />
                          <Typography sx={{ color: 'red' }} variant='body2' >{formErrors.username}</Typography>
                          <Typography sx={{ textAlign: 'left', fontSize: '15px', paddingTop: '12px', fontWeight: '600' }} variant='subtitle1'>Phone Number</Typography>
                          <TextField sx={{ width: '53vh' }} id="phone" label="Enter phone number" variant="outlined" name="phone" required onChange={handleChange} value={formValues.phone} onFocus={() => setPhoneFocus(true)} />
                          <Typography sx={{ color: 'red' }} variant='body2' >{formErrors.phone}</Typography>
                          <Typography sx={{ textAlign: 'left', fontSize: '15px', paddingTop: '12px', fontWeight: '600' }} variant='subtitle1'>Password</Typography>
                          <TextField sx={{ width: '53vh' }} id="password" label="Enter password" variant="outlined" name="password" required onChange={handleChange} value={formValues.password} onFocus={() => setPasswordFocus(true)} />
                          <Typography sx={{ color: 'red' }} variant='body2' >{formErrors.password}</Typography>
                          <Typography sx={{ textAlign: 'left', fontSize: '15px', paddingTop: '12px', fontWeight: '600' }} variant='subtitle1'>Confirm Password</Typography>
                          <TextField sx={{ width: '53vh' }} id="cpassword" label="Enter confirm password" variant="outlined" name="cpassword" required onChange={handleChange} value={formValues.cpassword} onFocus={() => setCPasswordFocus(true)} />
                          <Typography sx={{ color: 'red' }} variant='body2' >{formErrors.cpassword}</Typography>
                          <Typography sx={{ textAlign: 'left', fontSize: '15px', paddingTop: '12px', fontWeight: '600' }} component="span" variant='subtitle1'>Please upload your image</Typography>
                          <Button className="fileDesign" variant="contained" component="span">Upload File<input type="file"hidden/></Button>
                        </Grid>
                        <Grid item xs={12} style={{ textAlign: "center" }}>
                          <Button onClick={handleSubmit} sx={{ marginTop: '5px', marginBottom: '10px' }} variant="contained">Register</Button>
                        </Grid>
                      </Grid>
                    </Card>
                  </Box>
                </Modal>
                {/* </Typography> */}
              </Box>
              <Box sx={{ display: { xs: "flex", md: "none" } }}>
                <IconButton
                  size="large"
                  aria-label="show more"
                  aria-controls={mobileMenuId}
                  aria-haspopup="true"
                  onClick={handleMobileMenuOpen}
                  color="inherit"
                >
                  <MoreIcon />
                </IconButton>
              </Box>
            </Toolbar>
          </AppBar>
          {renderMobileMenu}
          {renderMenu}
        </Grid>
      </Grid>
    </Box>
  );
}
