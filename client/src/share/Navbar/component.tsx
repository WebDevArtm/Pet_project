import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Login from "./components/Login";
import UserMenu from "./components/UserMenu";
import { InputContext } from "../../contracts/interfaces";
import { Stack } from "@mui/material";

const Navbar: React.FC<InputContext> = ({ auth }) => {
  return (
    <Stack direction="column">
      <Box>
        <AppBar
          position="static"
          color="transparent"
          sx={{ boxShadow: "none" }}
        >
          <Toolbar
            sx={{
              background: "rgb(23 104 184/ 25%)",
              color: "white",
              boxShadow: "0px 0px 25px 0px rgb(255 255 255)",
            }}
          >
            <Typography component="div" variant="button" sx={{ flexGrow: 1 }}>
              <Button
                href="/"
                color="inherit"
                variant="text"
                sx={{ height: "64px", fontSize: "2rem" }}
              >
                Filmoteka
              </Button>
            </Typography>
            {!auth.ready && <Login auth={auth} />}
            {auth.ready && <UserMenu auth={auth} />}
          </Toolbar>
        </AppBar>
      </Box>
    </Stack>
  );
};

export default Navbar;
