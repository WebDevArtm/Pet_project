import React from "react";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import { MovieCard } from "./components/MovieCard";
import Message from "../../share/Messege";
import { IconButton, Tooltip } from "@mui/material";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import { AuthContext } from "../../context/AuthContext";
import useGQL from "../../hooks/useGQL/index";

export const MainPage: React.FC = () => {
  const { view, viewList } = React.useContext(AuthContext);
  const { movies, error, loading } = useGQL.getAllMovies();

  if (loading) {
    return <div>Loading...</div>;
  }
  if (!!error) {
    return <Message error={error.message} />;
  }

  const handleViewTile = () => {
    view(!viewList);
  };

  return (
    <React.Fragment>
      <Tooltip
        title="Изменить вид"
        sx={{ justifyContent: "flex-start", width: "50px", marginLeft: "25px" }}
      >
        <IconButton onClick={handleViewTile}>
          <GridViewOutlinedIcon fontSize="large" sx={{ color: "white" }} />
        </IconButton>
      </Tooltip>
      <Container
        maxWidth={false}
        sx={{ margin: 0, maxWidth: "auto", color: "white" }}
      >
        <Stack
          direction="row"
          spacing={0}
          sx={{ flexWrap: "wrap", alignItems: "center" }}
        >
          <MovieCard movies={movies!} />
        </Stack>
      </Container>
    </React.Fragment>
  );
};
