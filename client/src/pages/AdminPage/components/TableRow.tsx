import React, { Children } from "react";
import { TableRow, TableCell } from "@mui/material";
import { IObj } from "../../../contracts/interfaces";


// let MovieRow: IMovie = {
//   uuid: "",
//   name: "",
//   year: "",
//   genre: "",
//   description: "",
// };
// let UserRow: IUser = {
//   uuid: "",
//   name: "",
//   email: "",
//   role: "",
//   subscription: "",
//   cover: "",
// };

interface IRow {
  row: IObj;
}

export const Row: React.FC<IRow> = ({ row, ...props }) => {
  const { __typename, ...rowData } = row
  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        {Object.values(rowData).map((row, index) => {
          return (
            <TableCell key={index} align="center">
              {row}
            </TableCell>
          );
        })}
        {Children.map(props.children, (chield, index) => {
              return <TableCell key={index}>
                {chield}
              </TableCell>
            })}
      </TableRow> 
    </React.Fragment>
  );
};
