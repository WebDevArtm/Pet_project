import { useLazyQuery } from "@apollo/client";
import { GET_MOVIE } from "../../graphql";
import { IQGetOneMovei } from "../../contracts/interfaces";

const useMovie = () => {
  const [ runQuery, {
    error,
    data,
    loading,
  }] = useLazyQuery<IQGetOneMovei>(GET_MOVIE);

  const getMovie = ( uuid: string ) => runQuery({ variables: { movie: { uuid } } })
  const movie = data?.getOneMovie

  return { getMovie, error, loading, movie };
};

export default useMovie;
