import { UserAccountModalData } from "./userTypes";
import { userService } from "./UserService";

class UserAccountHelpers {
  requestAdd(data: UserAccountModalData, onRequestCompleted: () => void) {
    userService
      .Add({
        login: data.login,
        password: data.password,
        roles: data.roles
      })
      .then(onRequestCompleted);
  }

  requestUpdate(data: UserAccountModalData, onRequestCompleted: () => void) {
    userService
      .Update({
        id: data.id,
        login: data.login,
        roles: data.roles
      })
      .then(onRequestCompleted);
  }

  requestRemove(id: number, onRequestCompleted: () => void) {
    userService.Delete({ id }).then(onRequestCompleted);
  }
}

export const userHelpers = new UserAccountHelpers();
