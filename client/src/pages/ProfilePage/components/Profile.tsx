import { Box, Container, Stack, Tab, Tabs } from "@mui/material";
import React from "react";
import { ChangePass } from "./ChangePass";
// import Message from "../../../share/Messege";

const map = new Map();
const styles = {
  background: "rgb(255 255 255 / 90%)",
  padding: "24px",
  boxShadow: "0px 5px 25px 0px rgb(255 255 255/ 80%)",
};

export const Profile: React.FC = () => {
  const [tabNumber, setTabNumber] = React.useState<number>(0);

  const handleChange = (event: React.SyntheticEvent, current: number) => {
    setTabNumber(current);
  };

  map.set(
    0,
    <Container>
      <h1>
        <u>Profile</u>
      </h1>
      <p>
        Photo and user name Photo and user name Photo and user namePhoto and
        user name
      </p>
    </Container>
  );

  map.set(
    1,
    <Container>
      <ChangePass />
    </Container>
  );

  map.set(2, <>Favorite films and actors</>);

  return (
    <>
      {/* {(!!errUs || !!errMs) && (<Message error={errUs?.message || errMs?.message} />)} */}
      <Stack direction="row" sx={{ margin: "16px" }}>
        <Box sx={{ width: "20%" }}>
          <Tabs
            value={tabNumber}
            onChange={handleChange}
            orientation="vertical"
            aria-label="Vertical tabs example"
            sx={{ borderRight: 1, borderColor: "divider", ...styles }}
          >
            <Tab label="Пользователь" />
            <Tab label="Смена пароля" />
            <Tab label="Избранное" />
          </Tabs>
        </Box>
        <Box sx={{ width: "100%", ...styles }}>{map.get(tabNumber)}</Box>
      </Stack>
    </>
  );
};
