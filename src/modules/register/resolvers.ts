import { User } from "./../../entity/User";
import { ResolverMap } from "./../../types/graphql-utils";
import * as bcrypt from "bcrypt";

export const resolvers: ResolverMap = {
  Mutation: {
    register: async (
      _: any,
      { email, password }: GQL.IRegisterOnMutationArguments
    ) => {
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
