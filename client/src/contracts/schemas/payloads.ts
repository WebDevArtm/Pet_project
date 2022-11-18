import * as yup from 'yup';
import * as fields from './fields';

export const Login = yup.object({
    name: fields.name.required(),
    password: fields.password.required()
}).noUnknown()

export const CreateAndUpdateMovie = yup.object({
    uuid: fields.id,
    name: fields.name.required(),
    year: fields.text,
    genre: fields.text,
    description: fields.text
}).noUnknown()

export const ChangePassword = yup.object({
    password: fields.password.required(),
    newPassword: fields.createPassword.required(),
    confirmPassword: fields.confirmPassword.required()
}).noUnknown()
