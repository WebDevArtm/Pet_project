import { useMutation } from "@apollo/client";
import { CREATE_USER } from "../../graphql";
import type { IUser, IUserCreate } from "../../contracts/interfaces";

const useCreateAndUpdateUser = () => {
  const [runMutation, { data, error, loading }] =
    useMutation<IUser>(CREATE_USER);
  const createAndUpdateUser = (user: IUserCreate) => {
    const data = runMutation({ variables:{ input: { user } }});
    return data;
  };

  return { createAndUpdateUser, data, loading, error };
};

export default useCreateAndUpdateUser;
