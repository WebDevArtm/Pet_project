import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  Tooltip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
} from "@mui/material";
import type { FC } from "react";
import useGQL from "../hooks/useGQL";
import { Link } from "react-router-dom";

export const ManagmentButtons: FC<any> = ({ data }) => {
  const [open, setOpen] = React.useState<boolean>(false);
  const [errors, setErrors] = React.useState<string | undefined>();

  const { remove, error } = useGQL.remove();

  const removeMovie = async () => {
    try {
      await remove(data.uuid);
      window.location.href = '/';
    } catch (e) {
      setErrors("Что-то пошло не так...");
    }
  };
  return (
    <>
      <Tooltip title="Редактировать">
        <IconButton>
          <Link
            style={{ height: "24px" }}
            to={`/createandupdatemovie/${data.uuid}`}
            aria-label="edit"
          >
            <EditIcon color="success" />
          </Link>
        </IconButton>
      </Tooltip>
      <Tooltip title="Удалить">
        <IconButton onClick={setOpen.bind(0, true)} aria-label="delete">
          <DeleteIcon color="error" />
        </IconButton>
      </Tooltip>
      <Dialog
        open={open}
        onClose={setOpen.bind(0, false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Подтвердите удаление!"}
        </DialogTitle>
        <DialogActions>
          <Button onClick={setOpen.bind(0, false)} autoFocus>
            Отменить
          </Button>
          <Button onClick={removeMovie} color="error">
            Удалить
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
