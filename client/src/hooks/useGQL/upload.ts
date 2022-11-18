import { useMutation } from "@apollo/client";
import { UPLOAD_IMG } from "../../graphql";

const useUpload = () => {
  const [runMutation, { error, loading }] =
    useMutation(UPLOAD_IMG);
  const upload = (file: File, uuid: String, type: string) => {
    runMutation({ variables: { file, type, uuid } });
  };
  return { error, upload, loading };
};

export default useUpload;
