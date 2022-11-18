import * as yup from 'yup';
import type { StringSchema } from 'yup';

export const id = yup
  .string().uuid()

export const name = yup
  .string()
  .max(64);

export const email = yup
  .string()
  .email();

export const text = yup
  .string()

export const password = yup
  .string()
  .max(32)

export const createPassword = password
  .matches(/\d+/)
  .matches(/[a-z]+/)
  .matches(/[A-Z]+/);

export const confirmPassword = yup
  .string()
  .when('password', (password: string, field: StringSchema) => password
    ? field.required().oneOf([yup.ref('password')]) : field
  );
