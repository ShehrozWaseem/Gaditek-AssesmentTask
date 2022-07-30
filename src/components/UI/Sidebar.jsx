import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Navbar from "./Navbar";
import { selectUser } from "../../redux/reducer/useSlicer";

import { useSelector, useDispatch } from "react-redux/es/exports";
import { useNavigate } from "react-router";
import { logout } from "../../redux/reducer/useSlicer";
import { NavLink } from "react-router-dom";
import { Avatar, Stack } from "@mui/material";
export default function TemporaryDrawer() {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutFunc = (e) => {
    e.preventDefault();
    dispatch(logout({}));
    navigate("/login");
  };
  const user = useSelector(selectUser);
  const { email, data } = user;

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <Avatar
              sx={{
                bgcolor: "primary.main",
                marginLeft: 9,
                width: 55,
                height: 55,
              }}
            >
              {/* <LockOutlinedIcon /> */}
            </Avatar>
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton>
            {email}
            <ListItemText />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton>
            {data}
            <ListItemText />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      <List>
        <Stack
          flexDirection="column"
          justifyContent="flex-start"
          alignItems="flex-start"
        >
          <Button color="primary">
            <NavLink
              to="/listing"
              style={(isActive) => ({
                color: isActive ? "blue" : "green",
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
                color: isActive ? "blue" : "green",
                textDecoration: isActive ? "none" : "underlined",
              })}
            >
              Dashboard
            </NavLink>
          </Button>
          <Button onClick={logoutFunc}>Logout</Button>
        </Stack>
      </List>
    </Box>
  );

  return (
    <div>
      {["left"].map((anchor) => (
        <React.Fragment key={anchor}>
          {/* <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button> */}
          <Navbar clickMe={toggleDrawer} />
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
