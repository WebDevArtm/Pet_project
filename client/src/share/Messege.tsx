import React from "react";
import Alert from "@mui/material/Alert";
import { AlertColor } from "@mui/material";

interface InputMessage {
  error?: string;
  warining?: string;
  info?: string;
  success?: string;
}

const Message: React.FC<InputMessage> = ({
  error,
  warining,
  info,
  success,
}) => {
  const [type, setType] = React.useState<AlertColor>();

  React.useEffect(() => {
    if (error) {
      setType("error");
    } else if (warining) {
      setType("warning");
    } else if (info) {
      setType("info");
    } else {
      setType("success");
    }
  }, [setType, error, warining, info, success]);

  return (
    <>
      <Alert severity={type}>{error || warining || info || success}</Alert>
    </>
  );
};

export default Message;
