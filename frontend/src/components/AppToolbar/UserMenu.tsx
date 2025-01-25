import {Button, Menu, MenuItem} from "@mui/material";
import React, {useState} from "react";
import {useAppDispatch} from "../../app/hooks";
import {UserFields} from "../../types";
import {logout} from "../../features/users/userThunks.ts";
import {unsetUser} from "../../features/users/userSlice.ts";
import {NavLink} from "react-router-dom";

interface Props {
  user: UserFields;
}

const UserMenu: React.FC<Props> = ({ user }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const dispatch = useAppDispatch();
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    dispatch(unsetUser());
  };
  return (
    <>
      <Button
          onClick={handleClick}
          color="inherit"
          sx={{
              fontWeight: "bold",
              transition: "color 0.3s",
              "&:hover": {
                  textDecoration: "underline",
              },
          }}
      >
        Hello, {user.displayName}!
      </Button>
        <Button
            sx={{
                fontWeight: "bold",
                color: "#2196f3",
                border: "2px solid #2196f3",
                borderRadius: "10px",
                textTransform: "uppercase",
                margin: "0 8px",
                padding: "6px 24px",
                transition: "all 0.3s",
                "&:hover": {
                    backgroundColor: "#2196f3",
                    color: "#fff",
                },
            }}
            component={NavLink}
            to="/add_product"
            color="inherit"
        >
            Add new product
        </Button>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem>Profile</MenuItem>
        <MenuItem>My account</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </>
  );
};

export default UserMenu;
