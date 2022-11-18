import Movie from ".";
import fs from "fs/promises";
import { GraphQLUpload } from "graphql-upload";
import { GraphQLError } from "graphql";

interface InputMovie {
  movie: {
    uuid: string;
    name: string;
    year: string;
    genre: string;
    description: string;
    cover?: string;
    IMBd_id?: string;
    IMBd_rait: string;
    IMBd_rait_update: string;
  };
}

interface IUpload {
  uuid: string;
  file: { file: any };
  type: string;
}

const movie = {
  Upload: GraphQLUpload,

  Query: {
    async getAllMovies() {
      try {
        const movies = await Movie.find();
        return movies;
      } catch (e) {
        console.log(e);
      }
    },
    async getOneMovie(root: any, inputMovie: InputMovie) {
      try {
        const movie = await Movie.findOne({
          where: { uuid: inputMovie.movie.uuid },
        });
          return movie;
      } catch (e) {
        console.log(e);
      }
    },
  },

  Mutation: {
    upload: async (root: any, input: IUpload) => {
      try {
        const movieFind = await Movie.findBy({ uuid: input.uuid });
        const movie = movieFind[0];
        const file = await input.file.file;
        const { createReadStream } = file;
        const fileStream = createReadStream();
        const fileHandler = await fs.open(
          `./uploadedFiles/${input.type}/${movie.uuid}.jpg`,
          "w"
        );
        await fileHandler.writeFile(fileStream);
        await fileHandler.close();
        movie.cover = `/movie/${movie.uuid}.jpg`;
        await movie.save();
        return file;
      } catch (error) {
        console.log(error);
        return new GraphQLError("Не получилось сохранить картитнку");
      }
    },

    createAndUpdateMovie: async (root: any, input: InputMovie) => {
      const movie = input.movie;
      if (!movie.uuid) {
        try {
          const newMovie = Movie.create({
            name: movie.name,
            year: movie.year,
            genre: movie.genre,
            IMBd_id: movie.IMBd_id || "",
            description: movie.description,
          });
          await newMovie.save();
          return newMovie;
        } catch (e) {
          return new GraphQLError("Не получилось создать фильм");
        }
      } else {
        try {
          const movieFind = await Movie.findBy({ uuid: movie.uuid });
          const updateMovie = movieFind[0];
          updateMovie.name = movie.name;
          updateMovie.year = movie.year;
          updateMovie.genre = movie.genre;
          updateMovie.IMBd_id = movie.IMBd_id || "";
          updateMovie.IMBd_rait = movie.IMBd_rait || "";
          updateMovie.IMBd_rait_update = movie.IMBd_rait_update || "";
          updateMovie.description = movie.description;
          await updateMovie.save();
          return updateMovie;
        } catch (e) {
          return new GraphQLError("Не получилось обновить фильм");
        }
      }
    },

    deleteMovie: async (root: any, inputMovie: InputMovie) => {
      try {
        const movieFind = await Movie.find({
          where: { uuid: inputMovie.movie.uuid },
        });
        const movie = movieFind[0];
        const file = await fs.open(
          `./uploadedFiles/movie/${inputMovie.movie.uuid}.jpg`,
          "w"
        );
        file.close();
        fs.unlink(`./uploadedFiles/movie/${inputMovie.movie.uuid}.jpg`);
        movie.remove();
      } catch (e) {
        return new GraphQLError("Не получилось удалить фильм");
      }
    },
  },
};
export default movie;
