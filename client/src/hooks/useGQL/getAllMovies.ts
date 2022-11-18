import { useQuery } from "@apollo/client";
import { GET_ALL_MOVIES } from "../../graphql";
import { IQGetAllMovies } from "../../contracts/interfaces";

const useMovies = () => {
  const {
    error,
    data,
    loading,
  } = useQuery<IQGetAllMovies>(GET_ALL_MOVIES);
  const movies = data?.getAllMovies;
  return { error, movies, loading };
};

export default useMovies;
