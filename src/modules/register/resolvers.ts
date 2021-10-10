import { formatYupError } from "./../../utils/formatYupError";
import { User } from "./../../entity/User";
import { ResolverMap } from "./../../types/graphql-utils";
import * as bcrypt from "bcrypt";

import * as yup from "yup";

const schema = yup.object().shape({
  email: yup.string().email(),
  password: yup.string().min(6).max(20).required(),
});

export const resolvers: ResolverMap = {
  Mutation: {
    register: async (_: any, args: GQL.IRegisterOnMutationArguments) => {
      try {
        await schema.validate(args, { abortEarly: false });
      } catch (err) {
        return formatYupError(err);
      }

      const { email, password } = args;

      const emailAlreadyExists = await User.findOne({
        where: { email },
        select: ["id"],
      });

      if (emailAlreadyExists) {
        return [{ path: "email", message: "already taken" }];
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = User.create({
        email,
        password: hashedPassword,
      });

      await user.save();

      return null;
    },
  },
};
