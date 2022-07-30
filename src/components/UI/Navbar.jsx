import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { logout } from "../../redux/reducer/useSlicer";
import { selectUser } from "../../redux/reducer/useSlicer";
import LoadingButton from "@mui/lab/LoadingButton";
import { Link, NavLink } from "react-router-dom";
import ButtonRouter from "./ButtonRouter";
import { Avatar } from "@mui/material";

export default function Navbar(props) {
  const dispatch = useDispatch();
  const [isLoading, setLoad] = React.useState();

  const navigate = useNavigate();
  const logoutFunc = (e) => {
    e.preventDefault();
    setLoad(true);
    dispatch(logout({}));
    setLoad(false);
    navigate("/login");
  };
  const toListing = (e) => {
    e.preventDefault();
    navigate("/listing");
  };
  const user = useSelector(selectUser);
  const { isLoggedin } = user;
  return (
    <Box sx={{ flexGrow: 1 }} marginBottom={2}>
      <AppBar position="static">
        <Toolbar>
          {isLoggedin && (
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={props.clickMe("left", true)}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Gaditek
          </Typography>
          {isLoggedin ? (
            !isLoading ? (
              <>
                <Button color="inherit">
                  <NavLink
                    to="/listing"
                    style={(isActive) => ({
                      color: isActive ? "white" : "black",
                      textDecoration: isActive ? "none" : "underlined",
                    })}
                  >
                    LSITING
                  </NavLink>
                </Button>

                <Button color="inherit">
                  <NavLink
                    to="/dashboard"
                    style={(isActive) => ({
                      color: isActive ? "white" : "black",
                      textDecoration: isActive ? "none" : "underlined",
                    })}
                  >
                    Dashboard
                  </NavLink>
                </Button>
                <Avatar sx={{  bgcolor: "primary.main",marginLeft:3 }}>
            {/* <LockOutlinedIcon /> */}
          </Avatar>
                <Button color="inherit" onClick={logoutFunc}>
                  Logout
                </Button>

                {/* <ButtonRouter>test</ButtonRouter> */}
              </>
            ) : (
              <LoadingButton
                loading
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Submit
              </LoadingButton>
            )
          ) : (
            <Button disabled>
              {" "}
              <Typography
                variant="h6"
                component="div"
                color="#fff"
                sx={{ flexGrow: 1 }}
              >
                LOGIN
              </Typography>
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
