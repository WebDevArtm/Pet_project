import User from "./index";
import * as bcrypt from "bcrypt";
import { GraphQLError } from "graphql";

interface InputUser {
  input: {
    uuid: number;
    name: string;
    email: string;
    password: string;
    role: string;
    cover: string;
  };
}

const user = {
  Query: {
    async getAllUsers() {
      try {
        const users = await User.find();
        return users;
      } catch (e) {
        console.log(e);
      }
    },
    async getOneUser(root: null, inputUser: InputUser) {
      try {
        const user = await User.find({
          where: { name: inputUser.input.name },
        });
        const userPass = user[0].password;

        const pass = await bcrypt.compare(inputUser.input.password, userPass);
        if (user.length === 0) {
          return new GraphQLError("Пользователь не найден");
        }
        if (pass) {
          return user[0];
        }
      } catch (e) {
        console.log(e);
      }
    },
  },
  Mutation: {
    async createUser(root: any, inputUser: InputUser) {
      try {
        const validEmail = await User.findOne({
          where: { email: inputUser.input.email },
        });
        const validName = await User.findOne({
          where: { name: inputUser.input.name },
        });

        if (!!validName) {
          if (!!validEmail) {
            return new GraphQLError(
              "Пользователь и почта уже существует",
              null,
              null,
              null,
              null,
              null,
              { argumentUser: "user", argumentEmail: "email" }
            );
          }
          return new GraphQLError(
            "Пользователь уже существует",
            null,
            null,
            null,
            null,
            null,
            { argumentUser: "user" }
          );
        } else if (!!validEmail) {
          return new GraphQLError(
            "Почта уже зарегистрирована",
            null,
            null,
            null,
            null,
            null,
            { argumentEmail: "email" }
          );
        } else {
          const hashedPss = await bcrypt.hash(inputUser.input.password, 12);

          const user = User.create({
            name: inputUser.input.name,
            email: inputUser.input.email,
            password: hashedPss,
            role: inputUser.input.role || "user",
            subscription: "none",
          });
          await user.save();
          return user;
        }
      } catch (e) {
        console.log(e);
      }
    },
  },
};
export default user;
