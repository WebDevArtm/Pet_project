import { useMutation } from "@apollo/client";
import { CREATE_MOVIE } from "../../graphql";
import { IMovie, IMovieCreate } from "../../contracts/interfaces";

const useCreateAndUpdateMovie = () => {
  const [runMutation, { data, error, loading }] =
    useMutation<IMovieCreate>(CREATE_MOVIE);
  const createAndUpdateMovie = (movie: IMovie) => {
    const data = runMutation({ variables: { movie } });
    return data;
  };

  return { createAndUpdateMovie, data, loading, error };
};

export default useCreateAndUpdateMovie;
