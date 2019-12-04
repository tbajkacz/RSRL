import { AccessCardModalData } from "./accessCardTypes";
import { accessCardsService } from "./AccessCardsService";
import { UserAccountSelectOptionModel } from "../Users/userTypes";

class AccessCardHelpers {
  requestAdd(accessCardModalData: AccessCardModalData, userId: number, onRequestCompleted: () => void) {
    accessCardsService
      .Add({
        id: accessCardModalData.id,
        ownerId: userId
      })
      .then(onRequestCompleted);
  }

  requestEdit(accessCardModalData: AccessCardModalData, userId: number, onRequestCompleted: () => void) {
    accessCardsService
      .Update({
        id: accessCardModalData.id,
        ownerId: userId
      })
      .then(onRequestCompleted);
  }

  requestRemove(id: string, onRequestCompleted: () => void) {
    accessCardsService.Delete({ id }).then(onRequestCompleted);
  }
}

export const accessCardHelpers = new AccessCardHelpers();
