interface IName {
  name: string;
}

interface IEmail {
  email: string;
}

interface IPassword {
  password: string;
}

export interface IMovie {
  uuid: string;
  name: string;
  year: string;
  genre: string;
  description: string;
  cover?: string;
  IMDb_id?: string;
  IMDb_rait?: string;
  IMDb_rait_update?: Date;
  likes?: string[];
  dislikes?: string[];
  createAt?: Date;
  updateAt?: Date;
  deleteAt?: Date;
  __typename?: string;
}
export interface IMovieCreate {
  createAndUpdateMovie: IMovie;
}

export interface IUser extends IName, IEmail{
  uuid: string;
  role: string;
  subscription: string;
  cover: string;
  createAt?: Date;
  updateAt?: Date;
  deleteAt?: Date;
  __typename?: string;
}


export interface IUserCreate extends IName, IEmail, IPassword {}

export interface ILogin extends IName, IPassword {
  remember: boolean,
  showPassword: boolean
}

export interface Context {
  login(name: string, role: string, isRemember?: boolean): void;
  logout(): void;
  ready: boolean;
  userRole: string | null;
  userName: string | null;
  view(view: boolean): void;
  viewList: boolean;
}

export interface RestrictedByAuthProps {
  component: React.FC;
  path: string;
  defaultRoute?: string;
  exact?: boolean;
}

export interface RestrictedByRoleProps extends RestrictedByAuthProps {
  role: string;
}

export interface InputContext {
  auth: Context;
}

export interface IQGetAllUsers {
  getAllUsers: IUser[];
}

export interface IQGetOneUser {
  getOneUser: {
    name: string;
    role: string;
  };
}

export interface IQGetOneMovei {
  getOneMovie: IMovie;
}

export interface IQGetAllMovies {
  getAllMovies: IMovie[];
}

export interface IEditMovie {
  movie?: IMovie;
  id?: string;
  offEdit?(): void;
}

export interface IGoBack {
  history?: {
    goBack():void
  }
}


export interface IObj {
  [string: string]: string[] | number[] | Date | string | number;
}
