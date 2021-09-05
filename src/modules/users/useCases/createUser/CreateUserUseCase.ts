import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  name: string;
  email: string;
}

class CreateUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ email, name }: IRequest): User {
    const alreadyExistEmail = this.usersRepository.findByEmail(email);

    if (alreadyExistEmail) {
      throw new Error("This email already exist!");
    }
    return this.usersRepository.create({ name, email });
  }
}

export { CreateUserUseCase };
