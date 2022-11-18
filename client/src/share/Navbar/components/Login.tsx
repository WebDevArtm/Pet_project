import React, { useState, Fragment, useEffect } from "react";
import {
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Message from "../../Messege";
import CloseIcon from "@mui/icons-material/Close";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import useGQL from "../../../hooks/useGQL";
import { useFormik } from "formik";
import { Schema } from "../../../contracts";
import type { ILogin, InputContext } from "../../../contracts/interfaces";

const initialValues: ILogin = {
  name: "",
  password: "",
  remember: false,
  showPassword: false,
};

const Login: React.FC<InputContext> = ({ auth }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [errors, setErrors] = useState<string | undefined>(undefined);
  const { getUser, error, loading, data } = useGQL.getOneUser();

  const form = useFormik({
    validationSchema: Schema.Login,
    initialValues,
    onSubmit(values) {
      getUser(values.name, values.password);
    },
  });

  const handleOpenCloseLogin = () => {
    setErrors("");
    form.resetForm();
    setOpen(!open);
  };

  useEffect(() => {
    if (!loading && !!data) {
      const user = data.getOneUser;
      auth.login(user.name, user.role, form.values.remember);
      window.location.reload();
    } else if (!!error) {
      setErrors("Неверный логин или пароль!");
    }
  }, [loading, data, error, form, auth]);

  return (
    <Fragment>
      <Stack direction="row" spacing={2}>
        <Button
          size="small"
          color="inherit"
          variant="outlined"
          onClick={handleOpenCloseLogin}
        >
          Войти
        </Button>
        <Button
          size="small"
          href="/registration"
          color="inherit"
          variant="outlined"
        >
          Регистрация
        </Button>
      </Stack>
      <Dialog
        sx={{ display: "block" }}
        open={open}
        onClose={handleOpenCloseLogin}
      >
        <form onSubmit={form.handleSubmit}>
          <Stack direction="row">
            <DialogTitle sx={{ flexGrow: 1 }}>Авторизация</DialogTitle>
            <Button onClick={handleOpenCloseLogin}>
              <CloseIcon sx={{ color: "black" }} />
            </Button>
          </Stack>
          <DialogContent sx={{ padding: "0px 24px" }}>
            <TextField
              autoComplete="off"
              size="small"
              name="name"
              onChange={form.handleChange}
              value={form.values.name}
              sx={{ backgroundColor: "#ffffff", marginRight: "10px" }}
              placeholder="Username"
              variant="outlined"
              helperText={form.errors.name}
              error={!!form.errors.name}
            />
            <TextField
              size="small"
              name="password"
              onChange={form.handleChange}
              value={form.values.password}
              type={form.values.showPassword ? "text" : "password"}
              sx={{ backgroundColor: "#ffffff" }}
              placeholder="Password"
              helperText={form.errors.password}
              error={!!form.errors.password}
              InputProps={{
                endAdornment: (
                  <IconButton tabIndex={-1} onClick={(e) =>
                    form.setFieldValue("showPassword", !form.values.showPassword)
                  }>
                    {form.values.showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                ),
              }}
              label
            />
          </DialogContent>
          <DialogActions sx={{ padding: "0px 24px" }}>
            <label htmlFor="remember">Запомнить меня</label>
            <Checkbox
              name="remember"
              checked={form.values.remember}
              onChange={form.handleChange}
            />
            <Button
              type="submit"
              sx={{
                backgroundColor: "#1976d2",
                color: "white",
                ":hover": { color: "black" },
              }}
              size="small"
              variant="outlined"
            >
              Войти
            </Button>
          </DialogActions>
        </form>
        {!!errors && <Message error={errors} />}
      </Dialog>
    </Fragment>
  );
};

export default Login;
