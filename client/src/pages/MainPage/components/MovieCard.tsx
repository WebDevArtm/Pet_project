import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { IMovie } from "../../../contracts/interfaces";
import { AuthContext } from "../../../context/AuthContext";
import LikeDislike from "../../../share/LikeDislike";

type MoviesProps = {
  movies: IMovie[];
};

export const MovieCard: React.FC<MoviesProps> = ({ movies }) => {
  const { viewList } = React.useContext(AuthContext);

  const view = (position: string) => {
    if (viewList) {
      if (position === "Card") {
        return {
          width: 325,
          height: 600,
          margin: 2,
          boxShadow: "0px 5px 25px 0px rgb(255 255 255/ 80%)",
        };
      }
    } else {
      if (position === "Card") {
        return {
          margin: 2,
          width: "100%",
          boxShadow: "0px 5px 25px 0px rgb(255 255 255/ 80%)",
        };
      } else if (position === "CardActionArea") {
        return { display: "flex", justifyContent: "flex-start" };
      } else if (position === "CardMedia") {
        return { width: 150 };
      }
    }
  };

  if (movies.length === 0) {
    return <p>Фильмов нет</p>;
  }
  return (
    <>
      {movies.map((movie) => {
        const url = process.env.REACT_APP_BACKEND_URL || "";
        const source = url + movie.cover;
        return (
          <Card sx={view("Card")} key={movie.uuid}>
            <CardActionArea
              href={"/detail/" + movie.uuid}
              sx={view("CardActionArea")}
            >
              <CardMedia
                component="img"
                height={viewList ? "480" : "200"}
                image={source}
                alt={movie.name}
                sx={view("CardMedia")}
              ></CardMedia>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {movie.name + "(" + movie.year + ")"}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {"Жанр: " + movie.genre}
                </Typography>
                {!viewList && (
                  <>
                    <Typography variant="body2" color="text.secondary">
                      {`Описание: ${movie.description}`}
                    </Typography>
                    <LikeDislike />
                  </>
                )}
                {!!viewList && <LikeDislike />}
              </CardContent>
            </CardActionArea>
          </Card>
        );
      })}
    </>
  );
};
