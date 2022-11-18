import React from "react";
import {
  Container,
  Stack,
  TextField,
  IconButton,
  Button,
  Box,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Message from "../../share/Messege";
import useCreateAndUpdateUser from "../../hooks/useGQL/createAndUpdateUser";
import type { IGoBack } from "../../contracts/interfaces";


type form = {
  [keys: string]: string;
};

export const RegistrationPage: React.FC<IGoBack> = ({history, ...props}) => {
  const {createAndUpdateUser} = useCreateAndUpdateUser();

  const [message, setMessage] = React.useState<form>({
    username:
      "Длина имени должна быть не менее 6 символов и содержать только буквы и цифры",
    email: "Не корректный email",
    confPass: "Пароли не совпадают",
  });
  const [success, setSuccess] = React.useState<string>();
  const [showPass, setShowPass] = React.useState<boolean>(false);
  const [showConfPass, setShowConfPass] = React.useState<boolean>(false);
  const [username, setUserName] = React.useState<string>("");
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [confPass, setConfPass] = React.useState<string>("");
  const [userError, setUserError] = React.useState<boolean>(false);
  const [emailError, setEmailError] = React.useState<boolean>(false);
  const [passError, setPassError] = React.useState<boolean>(false);
  const [confPassError, setConfPassError] = React.useState<boolean>(false);

  const back = () => {
    history?.goBack();
  };

  const handleChengeVisible = () => {
    setShowPass(!showPass);
  };
  const handleChengeConfVisible = () => {
    setShowConfPass(!showConfPass);
  };

  const handleUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage({
      ...message,
      username:
        "Длина имени должна быть не менее 6 символов и содержать только буквы и цифры",
    });
    setUserName(event.currentTarget.value);
    setUserError(false);
  };
  const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmailError(false);
    setMessage({ ...message, email: "Не корректный email" });
    setEmail(event.currentTarget.value);
  };
  const handlePass = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassError(false);
    setPassword(event.currentTarget.value);
  };
  const handleConfPass = (event: React.ChangeEvent<HTMLInputElement>) => {
    setConfPassError(false);
    setConfPass(event.currentTarget.value);
  };
  const handleReg = async () => {
    if (!(userError || emailError || passError || confPassError)) {
      if (username && email && password) {
        try {
          await createAndUpdateUser({
                name: username,
                email: email,
                password: password
          });
          setUserName("");
          setEmail("");
          setPassword("");
          setConfPass("");
          setSuccess("Пользователь успешно зарегистрирован");
        } catch (err: any) {
          if (err.graphQLErrors[0].extensions!.argumentUser === "user") {
            if (err.graphQLErrors[0].extensions!.argumentEmail === "email") {
              setMessage({
                ...message,
                username: "Пользователь с таким именем уже существует",
                email: "Пользователь с такой почтой уже зарегистрирован",
              });
              setEmailError(true);
              setUserError(true);
            } else {
              setMessage({
                ...message,
                username: "Пользователь с таким именем уже существует",
              });
              setUserError(true);
            }
          } else if (
            err.graphQLErrors[0].extensions!.argumentEmail === "email"
          ) {
            setMessage({
              ...message,
              email: "Пользователь с такой почтой уже зарегистрирован",
            });
            setEmailError(true);
          }
          console.log(err);
        }
      } else if (!username && !email && !password) {
        setUserError(true);
        setEmailError(true);
        setPassError(true);
      } else if (!username) {
        setUserError(true);
      } else if (!email) {
        setEmailError(true);
      } else if (!password) {
        setPassError(true);
      }
    }
  };

  React.useEffect(() => {
    if (
      (!!username.match(/[^0-9a-zA-Z]/) || username.length < 6) &&
      username.length !== 0
    ) {
      setUserError(true);
    }
    if (
      !email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i) &&
      email.length !== 0
    ) {
      setEmailError(true);
    }
    if (password.length < 6 && password.length !== 0) {
      setPassError(true);
    }
    if (
      password !== confPass &&
      confPass.length !== 0 &&
      password.length !== 0
    ) {
      setConfPassError(true);
    }
  }, [
    username,
    email,
    password,
    confPass,
    setUserError,
    setEmailError,
    setPassError,
    setConfPassError,
  ]);

  return (
    <Container
      component="form"
      noValidate
      sx={{
        background: "rgb(255 255 255 / 90%)",
        padding: "24px",
        boxShadow: "5px 10px 25px 15px rgb(255 255 255)",
      }}
    >
      <Button onClick={back}>Назад</Button>
      {success && <Message success={success} />}
      <Box sx={{ textAlign: "center" }}>
        <h1>Registration</h1>
        <Stack
          direction="column"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "50ch" },
            alignItems: "center",
          }}
        >
          <TextField
            error={userError}
            name="username"
            autoComplete="off"
            onChange={handleUsername}
            label="Username"
            value={username}
            tabIndex={1}
            helperText={userError ? message.username : message.username}
          />
          <TextField
            error={emailError}
            name="email"
            type="email"
            onChange={handleEmail}
            label="Email"
            value={email}
            tabIndex={2}
            helperText={emailError ? message.email : false}
          />
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
            label="Password"
            tabIndex={3}
            value={password}
            helperText="Минимальная длинна пароля 6 символов"
          />
          <TextField
            error={confPassError}
            name="confPass"
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
            sx={{
              backgroundColor: "#1976d2",
              color: "white",
              ":hover": { color: "black" },
            }}
            variant="outlined"
            onClick={handleReg}
          >
            Registration
          </Button>
        </Stack>
      </Box>
    </Container>
  );
};
