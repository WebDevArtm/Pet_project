import { useMutation } from "@apollo/client";
import { REMOVE_MOVIE } from "../../graphql";

const useRemove = () => {
  const [runMutation, { error, loading }] =
    useMutation(REMOVE_MOVIE);
  const remove = (uuid: string) => {
    runMutation({ variables: { movie: { uuid } } });
  };
  return { remove, error, loading };
};

export default useRemove;
