import { useQuery } from "@apollo/client";
import { GET_ALL_USERS } from "../../graphql";
import { IQGetAllUsers } from "../../contracts/interfaces";

const useUsers = () => {
  const {
    error,
    data,
    loading,
  } = useQuery<IQGetAllUsers>(GET_ALL_USERS);
  const users = data?.getAllUsers;
  return { error, users, loading };
};

export default useUsers;
