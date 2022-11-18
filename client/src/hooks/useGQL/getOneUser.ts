import { useLazyQuery } from "@apollo/client";
import { GET_USER } from "../../graphql";
import type { IQGetOneUser } from "../../contracts/interfaces";

const useUser =  () => {
  const [runQuery, { error, data, loading }] =
    useLazyQuery<IQGetOneUser>(GET_USER);
    
  const  getUser = async (name: string, password: string) => {
    runQuery({ variables: { input: { name, password } } });
  };
  
  return { getUser, error, loading, data };
};

export default useUser;
