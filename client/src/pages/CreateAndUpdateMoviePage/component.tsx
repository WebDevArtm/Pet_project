import React, { useEffect } from "react";
import TextField from "@mui/material/TextField";
import { styled, Box, Grid } from "@mui/material";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import ImageIcon from "@mui/icons-material/Image";
import { IGoBack } from "../../contracts/interfaces";
import { Container } from "@mui/material";
import Message from "../../share/Messege";
import useGQL from "../../hooks/useGQL/index";
import { useParams } from "react-router-dom";
import { useFormik } from "formik";
import { Schema } from "../../contracts";

const Input = styled("input")({
  display: "none",
  height: "100%",
});

type Params = {
  id: string;
};
const initialValues = {
  uuid: "",
  name: "",
  year: "",
  genre: "",
  description: "",
};

export const CreateAndUpdateMoviePage: React.FC<IGoBack> = ({
  history,
  ...props
}) => {
  const url = process.env.REACT_APP_BACKEND_URL || "";
  const { id } = useParams() as Params;
  const { error, movie, loading, getMovie } = useGQL.getOneMovie();
  const source = url + movie?.cover;

  // const [IMDb_id, setIMDb_id] = React.useState<string>("");
  // const [link, setLink] = React.useState<string>("");
  const [file, setFile] = React.useState<File>();
  const [imgUrl, setImgUrl] = React.useState<string>();

  const { upload, error: errUpld } = useGQL.upload();
  const { createAndUpdateMovie, error: errCAUM } =
    useGQL.createAndupdateMoive();

  const form = useFormik({
    validationSchema: Schema.CreateAndUpdateMovie,
    initialValues: movie ?? initialValues,
    async onSubmit(values) {
      try {
        // if (!movie?.IMDb_id) {
        //   setIMDb_id("" + link.match(/tt+\d+\d/i));
        // }
        const res = (await createAndUpdateMovie(values)).data;

        if (!!res && !!file) {
          await upload(file, res.createAndUpdateMovie.uuid, "movie");
        }
        window.location.reload();
      } catch (error) {
        console.log(error);
      }
    },
  });

  const handleAddImg = ({
    target: { files },
  }: React.ChangeEvent<HTMLInputElement>) => {
    if (files && files[0]) {
      setFile(files[0]);
      setImgUrl(URL.createObjectURL(files[0]));
    }
  };
  useEffect(() => {
    if (id.length > 6 && !loading){
      getMovie(id)
    }
  }, [ getMovie, id, loading])
  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <Container
      sx={{
        background: "rgb(255 255 255 / 90%)",
        padding: "24px",
        boxShadow: "0px 5px 25px 0px rgb(255 255 255/ 80%)",
      }}
    >
      {(!!errUpld || !!errCAUM) && (
        <Message error={errUpld?.message || errCAUM?.message} />
      )}
      <Button onClick={history?.goBack.bind(0)}>Назад</Button>
      <Stack
        direction="row"
        spacing={2}
        sx={{ width: "100%", flexWrap: "wrap", justifyContent: "center" }}
      >
        <Box sx={{ minWidth: 325 }}>
          <label htmlFor="icon-button-file">
            <Input
              accept="image/*"
              id="icon-button-file"
              type="file"
              onChange={handleAddImg}
            />
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="span"
              sx={{ width: "325px", height: "500px", borderRadius: "0" }}
            >
              {!file && !movie?.cover && (
                <div>
                  <ImageIcon name="imgIcon" fontSize="large" />
                  Добавить обложку
                </div>
              )}
              {!file && !!movie?.cover && (
                <img height="450" width="325" src={source} alt="add_image" />
              )}
              {file && (
                <img height="450" width="325" src={imgUrl} alt="add_image" />
              )}
            </IconButton>
            {/* <p>
              Скопируйне ссылку на этот фильм или id фильма{" "}
              <a
                href="https://www.imdb.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                {" "}
                с сайта IMDb
              </a>{" "}
              для рейтинга
            </p>
            <TextField
              id="link"
              label="Ссылка на IMDb фильм"
              value={link || IMDb_id}
              variant="outlined"
              onChange={handleLinkChange}
            /> */}
          </label>
        </Box>
        <form onSubmit={form.handleSubmit}>
          <Stack
            sx={{ width: "100%", margin: "off", marginTop: "16px" }}
            spacing={2}
          >
            <TextField
              fullWidth
              id="name"
              label="Название"
              value={form.values.name}
              variant="outlined"
              onChange={form.handleChange}
              helperText={form.errors.name}
              error={!!form.errors.name}
            />
            <Grid container columns={12}>
              <Grid item lg={4}>
                <TextField
                  id="year"
                  label="Год"
                  value={form.values.year}
                  variant="outlined"
                  onChange={form.handleChange}
                  helperText={form.errors.name}
                  error={!!form.errors.name}
                />
              </Grid>
              <Grid item lg={2}/>
              <Grid item lg={6} >
                <TextField
                  id="genre"
                  label="Жанр"
                  value={form.values.genre}
                  variant="outlined"
                  onChange={form.handleChange}
                  helperText={form.errors.name}
                  error={!!form.errors.name}
                />
              </Grid>
            </Grid>
            <TextField
              fullWidth
              id="description"
              label="Описание"
              variant="outlined"
              value={form.values.description}
              multiline
              minRows={8}
              maxRows={8}
              sx={{ height: "225px" }}
              onChange={form.handleChange}
              helperText={form.errors.name}
              error={!!form.errors.name}
            />
            <Button variant="contained" type="submit">
              Добавить фильм
            </Button>
          </Stack>
        </form>
      </Stack>
    </Container>
  );
};
