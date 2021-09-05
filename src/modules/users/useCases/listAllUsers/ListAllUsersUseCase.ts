import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  user_id: string | string[];
}

class ListAllUsersUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ user_id }: IRequest): User[] {
    const admin = this.usersRepository.findById(user_id);
    const allUsers = this.usersRepository.list();

    if (!admin) {
      throw new Error("User not found!");
    }

    if (!admin.admin === true) {
      throw new Error("Only admin has access");
    }

    return allUsers;
  }
}

export { ListAllUsersUseCase };
