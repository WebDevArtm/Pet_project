import React from "react";
import { AdminTable } from "./AdminTable";
import useGQL from "../../../hooks/useGQL/index";
import Message from "../../../share/Messege";
import type { FC } from "react";

interface TabItemProps {
  tabNumber: number;
}

export const TabItem: FC<TabItemProps> = ({ tabNumber }) => {
  const {
    movies,
    error: moviesError,
    loading: moviesLoading,
  } = useGQL.getAllMovies();
  const {
    users,
    error: userError,
    loading: userLoading,
  } = useGQL.getAllUsers();

  if (moviesLoading || userLoading) {
    return <div>Loading...</div>;
  }

  switch (true) {
    case !!userError || !!moviesError:
      return <Message error={userError?.message || moviesError?.message} />;
    case tabNumber === 0: return (
        <AdminTable variables={movies!} addPage="/createandupdatemovie/new" />
      );
    case tabNumber === 1: return (
        <AdminTable variables={users!} addPage="/registration" />
    )
    default:
      return <></>;
  }
};
