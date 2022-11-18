import React from "react";
import { InputContext } from "../../../contracts/interfaces";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";

const style = {
  width: "100%",
  color: "black",
};

const UserMenu: React.FC<InputContext> = ({ auth }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleLogout = () => {
    auth.logout();
    setAnchorEl(null);
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  return (
    <div>
      <label htmlFor="IconButton">{auth.userName}</label>
      <IconButton
        name="IconButton"
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
      >
        <AccountCircle />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        color="transparent"
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
      >
        {" "}
        {auth.userRole === "admin" && (
          <div>
            <MenuItem disableGutters={true}>
              <Button sx={style} href="/admin">
                Админ
              </Button>
            </MenuItem>
          </div>
        )}
        <div>
          <MenuItem disableGutters={true}>
            <Button sx={style} href="/profile">
              Профиль
            </Button>
          </MenuItem>
          <MenuItem disableGutters={true}>
            <Button sx={style} onClick={handleLogout}>
              Выйти
            </Button>
          </MenuItem>
        </div>
      </Menu>
    </div>
  );
};
export default UserMenu;
