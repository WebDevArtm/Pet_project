import { Button, IconButton, Stack, TextField } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import React from "react";

const initialValues = {
  password: '',
  showPassword: false,
  createPassword: '',
  showCreatePassword: false,
  confirmPassword: '',
  showConfirmPassword: false
}

export const ChangePass: React.FC = () => {
  const [message] = React.useState({
    currentPass: "Не верный пароль",
    confPass: "Пароли не совпадают",
  });

  const [password, setPassword] = React.useState<string>("");
  const [newPassword, setNewPassword] = React.useState<string>("");
  const [confPass, setConfPass] = React.useState<string>("");
  const [showPass, setShowPass] = React.useState<boolean>(false);
  const [showNewPass, setShowNewPass] = React.useState<boolean>(false);
  const [showConfPass, setShowConfPass] = React.useState<boolean>(false);
  const [passError, setPassError] = React.useState<boolean>(false);
  const [confPassError, setConfPassError] = React.useState<boolean>(false);
  const [newPassError, setNewPassError] = React.useState<boolean>(false);

  const handleChengeVisible = () => {
    setShowPass(!showPass);
  };
  const handleChengeNewVisible = () => {
    setShowNewPass(!showNewPass);
  };
  const handleChengeConfVisible = () => {
    setShowConfPass(!showConfPass);
  };

  const handlePass = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassError(false);
    setPassword(event.currentTarget.value);
  };
  const handleNewPass = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassError(false);
    setNewPassword(event.currentTarget.value);
  };
  const handleConfPass = (event: React.ChangeEvent<HTMLInputElement>) => {
    setConfPassError(false);
    setConfPass(event.currentTarget.value);
  };

  const requestChangePass = () => {
    if (!password) {
      setPassError(true);
    }
    if (!newPassword) {
      setNewPassError(true);
    }
    if (!confPass) {
      setConfPassError(true);
    }
  };

  React.useEffect(() => {
    if (newPassword.length < 6 && newPassword.length !== 0) {
      setNewPassError(true);
    }
    if (
      newPassword !== confPass &&
      confPass.length !== 0 &&
      newPassword.length !== 0
    ) {
      setConfPassError(true);
    }
  }, [newPassword, confPass]);

  return (
    <>
      <Stack rowGap={1} sx={{ width: "400px", textAlign: "center" }}>
        <h3>Change password</h3>

        <TextField
          error={passError}
          name="password"
          type={showPass ? "text" : "password"}
          onChange={handlePass}
          InputProps={{
            endAdornment: (
              <IconButton tabIndex={-1} onClick={handleChengeVisible}>
                {showPass ? <VisibilityOffIcon /> : <VisibilityIcon />}
              </IconButton>
            ),
          }}
          label="Current password"
          tabIndex={2}
          value={password}
        />

        <TextField
          error={newPassError}
          name="createPassword"
          type={showNewPass ? "text" : "password"}
          onChange={handleNewPass}
          InputProps={{
            endAdornment: (
              <IconButton tabIndex={-1} onClick={handleChengeNewVisible}>
                {showNewPass ? <VisibilityOffIcon /> : <VisibilityIcon />}
              </IconButton>
            ),
          }}
          label="New password"
          tabIndex={3}
          value={newPassword}
          helperText="Минимальная длинна пароля 6 символов"
        />

        <TextField
          error={confPassError}
          name="confirmPassword"
          value={confPass}
          type={showConfPass ? "text" : "password"}
          onChange={handleConfPass}
          InputProps={{
            endAdornment: (
              <IconButton tabIndex={-1} onClick={handleChengeConfVisible}>
                {showConfPass ? <VisibilityOffIcon /> : <VisibilityIcon />}
              </IconButton>
            ),
          }}
          label="Confirm password"
          tabIndex={4}
          helperText={confPassError ? message.confPass : false}
        />
        <Button
          onClick={requestChangePass}
          sx={{
            backgroundColor: "#1976d2",
            color: "white",
            ":hover": { color: "black" },
          }}
          variant="outlined"
        >
          Change password
        </Button>
      </Stack>
    </>
  );
};
