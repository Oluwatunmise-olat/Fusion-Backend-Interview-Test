import { DBSource } from "../src/db/data-source";
import { User } from "../src/db/entities";

const { JWTSECRET } = process.env;

export const createUser = async (payload?: { first_name: string; last_name: string; email: string }) => {
  const userRepository = DBSource.getRepository(User);
  const hashedPassword = await User.hashPassword("password");
  let unsavedUser: User;
  if (!payload) {
    unsavedUser = userRepository.create({
      first_name: "user_one",
      last_name: "lastname",
      email: "user_@example.com",
      type: "user",
      password: hashedPassword,
    });
    const savedUser = await userRepository.save(unsavedUser);
    return User.generateJWT({ userId: savedUser.id, email: "user_@exmaple.com" }, JWTSECRET!);
  }

  unsavedUser = userRepository.create({ ...payload, type: "user", password: hashedPassword });
  const savedUser = await userRepository.save(unsavedUser);
  return User.generateJWT({ userId: savedUser.id, email: "user_@exmaple.com" }, JWTSECRET!);
};
