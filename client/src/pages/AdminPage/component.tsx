import { Stack, Box } from "@mui/material";
import React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { TabItem } from "./components/TabItem";

const styles = {
  background: "rgb(255 255 255 / 90%)",
  padding: "24px",
  boxShadow: "0px 5px 25px 0px rgb(255 255 255/ 80%)",
};

export const AdminPage: React.FC = () => {
  const [tabNumber, setTabNumber] = React.useState<number>(0);



  const handleChange = (event: React.SyntheticEvent, current: number) => {
    setTabNumber(current);
  };

  return (

      <Stack direction="row" sx={{ margin: "16px" }}>
        <Box sx={{ width: "20%" }}>
          <Tabs
            value={tabNumber}
            onChange={handleChange}
            orientation="vertical"
            aria-label="Vertical tabs example"
            sx={{ borderRight: 1, borderColor: "divider", ...styles }}
          >
            <Tab label="Фильмы" />
            <Tab label="Пользователи" />
          </Tabs>
        </Box>
        <Box sx={{ width: "78%", ...styles }}>
          <TabItem tabNumber={tabNumber} />
        </Box>
      </Stack>
  );
};
