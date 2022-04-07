import React from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { logout } from "../../redux/action/userAction"

import { styled, alpha } from "@mui/material/styles"
import {
  Box,
  AppBar,
  Toolbar,
  Button,
  InputBase,
  Typography,
  IconButton,
} from "@mui/material"
import MenuIcon from "@mui/icons-material/Menu"
import SearchIcon from "@mui/icons-material/Search"
import NotificationsIcon from "@mui/icons-material/Notifications"
import { header } from "../../common/styles"

import Nav from "./Nav"

function Header() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const userState = useSelector((state) => state.user)
  const classes = header()

  const isLogin = !!userState.user

  const logoutHandler = () => {
    sessionStorage.removeItem("userToken")
    dispatch(logout(userState))
    navigate("/")
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ boxShadow: 0 }}>
        <StyledToolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h5" sx={{ marginTop: "5px" }}>
            Community
          </Typography>
          <Box className={classes.container}>
            <img src="pupa_logo.png" alt="logo" className={classes.logo} />
            <Box className={classes.searchContainer}>
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="검색어를 입력하세요"
                  inputProps={{ "aria-label": "search" }}
                />
              </Search>
              <StyledButton variant="contained">Search</StyledButton>
            </Box>
          </Box>
          <IconButton color="inherit">
            <NotificationsIcon />
          </IconButton>
          <Button color="inherit" onClick={() => navigate("/portfolio")}>
            MY PAGE
          </Button>
          {isLogin && (
            <Button color="inherit" onClick={logoutHandler}>
              LOGOUT
            </Button>
          )}
        </StyledToolbar>
      </AppBar>
      <Nav />
    </Box>
  )
}

export default Header

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  alignItems: "flex-start",
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(2),
  "@media all": {
    minHeight: 200,
  },
  backgroundColor: "#000d3e",
}))

const Search = styled("div")(({ theme }) => ({
  position: "relative",

  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.25),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.35),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}))

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "500px",
    },
  },
}))

const StyledButton = styled(Button)({
  backgroundColor: "#90C2F3",
  color: "#000",
  marginLeft: "20px",
  "&:hover": {
    backgroundColor: "#bad8f6",
  },
})
