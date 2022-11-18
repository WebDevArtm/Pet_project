import React, { useEffect } from "react";
import { useParams } from "react-router";
import Message from "../../share/Messege";
import useGQL from "../../hooks/useGQL";
import { Container, Stack } from "@mui/material";
import { AuthContext } from "../../context/AuthContext";
import { ManagmentButtons } from "../../share/ManagmentButtons";
// import { useHttp } from "../hooks/http.hook";
// import Rating from "@mui/material/Rating";
// import useGQL from "../hooks/useGQL";


// A raiting from IMDb doesn't work any more

type Params = {
  id: string;
};

export const DetailPage: React.FC = () => {
  // const raitUrl = process.env.REACT_APP_RATE_URL || "";
  const url = process.env.REACT_APP_BACKEND_URL || "";

  const { id } = useParams() as Params;
  const [errors, setErrors] = React.useState<string | undefined>();
  const { error, movie, loading, getMovie } = useGQL.getOneMovie();
  // const { remove, error: removingError } = useGQL.remove();

  // const { request } = useHttp();
  // const { createAndUpdateMovie } = useGQL.createAndupdateMoive();
  const auth = React.useContext(AuthContext);
  // const [open, setOpen] = React.useState<boolean>(false);
  // const [rait, setRait] = React.useState<number>(0);
  
  const source = url + movie?.cover;
  // const IMBdRait = raitUrl + movie.IMDb_id;

  // const removeMovie = async (id: string) => {
  //   try {
  //     await remove(id);
  //     window.location.href = "/";
  //   } catch (e) {
  //     console.log(e);
  //     setErrors("Что-то пошло не так...");
  //   }
  // };
  useEffect(()=>{
    if (!!error) {
      setErrors(error?.message);
    }
  }, [error])
  
  useEffect(() => {
    if (!movie && !loading) {
      getMovie(id)
    }
  }, [ getMovie, id, movie, loading])


  // const raiting = React.useCallback(async () => {
  //   const fetching = await request(IMBdRait);
  //   console.log(fetching);

  //   const ratings = fetching.ratings;
  //   if (!!ratings) {
  //     console.log('4');

  //     const numbers = ratings.map((obj: any) => {
  //       return Number(obj.rating) * Number(obj.votes);
  //     });
  //     const summ = numbers.reduce((x: number, y: number) => x + y);
  //     const result = (summ / Number(fetching.totalRatingVotes)).toFixed(1);
  //     setRait(Number(result));
  //     const newMovie = { ...movie };
  //     delete newMovie.__typename;
  //     newMovie.IMDb_rait = result;
  //     newMovie.IMDb_rait_update = new Date();
  //     console.log(movie);
  //     await createAndUpdateMovie(newMovie);
  //     window.location.reload();
  //   }
  // }, [request, IMBdRait, movie, createAndUpdateMovie]);

  // React.useEffect(() => {
  //   if (!movie?.IMDb_id) {
  //     console.log('1');

  //     const dateNow = new Date();
  //     const movieUpd = new Date(movie.IMDb_rait_update!);
  //     if (dateNow.getDate() === movieUpd.getDate()) {
  //       setRait(Number(movie.IMDb_rait));
  //       console.log('2');
  //     } else {
  //       console.log(movie);
  //       console.log("3");
  //       raiting();
  //     }
  //   }
  // }, [movie]);
if(!movie) {
  return (
    <>
      {!!errors && <Message error={errors} />}
    </>
)
}else return (
    <Container
      sx={{
        background: "rgb(255 255 255 / 90%)",
        padding: "24px",
        boxShadow: "0px 5px 25px 0px rgb(255 255 255/ 80%)",
      }}
    >
      {!!errors && <Message error={errors} />}
      {auth.userRole === "admin" && <ManagmentButtons data={movie}/>}
      <h1>
        {movie.name} ({movie.year})
      </h1>
      {/* <label htmlFor="raiting">
        IMDb: <strong>{rait}</strong>{" "}
      </label> */}
      {/* <Rating name="raiting" value={rait} max={10.0} precision={0.1} readOnly /> */}
      <Stack direction="row" sx={{ margin: 2 }}>
        <img src={source} alt={movie.name} width="400px" />
        <Stack sx={{ marginLeft: 2 }}>
          <p>Жанр: {movie.genre}</p>
          <p>Описание: {movie.description}</p>
        </Stack>
      </Stack>
      <h3>Трейлер:</h3>
      <iframe
        width="560px"
        height="316px"
        src="https://www.youtube.com/embed/fELWzluxdnY"
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </Container>
  );
};
