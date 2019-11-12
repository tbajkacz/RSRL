import { AccessCardModalData } from "./accessCardTypes";
import { accessCardsService } from "./AccessCardsService";

export function requestAdd(
  accessCardModalData: AccessCardModalData,
  userId: number,
  onRequestCompleted: () => void
) {
  accessCardsService
    .Add({
      id: accessCardModalData.id,
      ownerId: userId
    })
    .then(onRequestCompleted);
}

export function requestEdit(
  accessCardModalData: AccessCardModalData,
  userId: number,
  onRequestCompleted: () => void
) {
  accessCardsService
    .Update({
      id: accessCardModalData.id,
      ownerId: userId
    })
    .then(onRequestCompleted);
}
