import * as React from "react";
import {
  Paper,
  TableRow,
  TableHead,
  TableContainer,
  TableCell,
  TableBody,
  Table,
  Button,
} from "@mui/material";
import { IMovie, IUser, IObj } from "../../../contracts/interfaces";
import { Row } from "./TableRow";
import { Link } from "react-router-dom";
import { ManagmentButtons } from "../../../share/ManagmentButtons";


const normalizeDate = (date: Date) => {
  if (date === null || date === undefined) {
    return "";
  }

  const normalDate = new Date(date).toLocaleString("ru", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });

  return normalDate;
};

interface IAdminTable {
  variables: IUser[] | IMovie[];
  addPage: string;
}
export const AdminTable: React.FC<IAdminTable> = ({
  variables,
  addPage,
}) => {

  if (variables.length === 0) {
    return <p>Данных нет</p>;
  }

  const [, ...columns] = Object.keys(variables[0]);

  return (
    <>
      <Link style={{ textDecoration: "none" }} to={addPage}>
        <Button>Добавить</Button>
      </Link>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead key="header" sx={{ background: "rgb(23 104 184/ 90%)" }}>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column} sx={{ color: "white" }} align="center">
                  {column}
                </TableCell>
              ))}
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {variables.map((row, index) => {
              const newRow: IObj = { ...row };
              newRow.createAt = normalizeDate(row.createAt!);
              newRow.updateAt = normalizeDate(row.updateAt!);
              newRow.deleteAt = normalizeDate(row.deleteAt!);
              if (newRow.__typename === "Movie") {
                delete newRow.deleteAt;
              }
              return (
                <Row key={index} row={newRow} >
                  <ManagmentButtons data={newRow} />
                </Row>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
