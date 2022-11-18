import { ChangePassword, CreateAndUpdateMovie, Login } from "./payloads"

export interface SchemaTypes {
    Login: typeof Login
    CreateAndUpdateMovie: typeof CreateAndUpdateMovie
    ChangePassword: typeof ChangePassword
}
