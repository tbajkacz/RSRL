import { UserAccountModalData } from "./userTypes";
import { userService } from "./UserService";

class UserAccountHelpers {
  requestAdd(data: UserAccountModalData, onRequestCompleted: () => void) {
    userService
      .Add({
        login: data.login,
        password: data.password,
        roles: data.roles,
        name: data.name,
        surname: data.surname,
        pesel: data.pesel
      })
      .then(onRequestCompleted);
  }

  requestUpdate(data: UserAccountModalData, onRequestCompleted: () => void) {
    userService
      .Update({
        id: data.id,
        login: data.login,
        roles: data.roles,
        name: data.name,
        surname: data.surname,
        pesel: data.pesel
      })
      .then(onRequestCompleted);
  }

  requestRemove(id: number, onRequestCompleted: () => void) {
    userService.Delete({ id }).then(onRequestCompleted);
  }

  requestChangePassword(data: UserAccountModalData, onRequestCompleted: () => void) {
    userService
      .UpdatePassword({
        id: data.id,
        password: data.password
      })
      .then(onRequestCompleted);
  }
}

export const userHelpers = new UserAccountHelpers();
