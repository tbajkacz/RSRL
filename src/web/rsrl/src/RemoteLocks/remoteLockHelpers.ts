import { RemoteLockModalData } from "./remoteLockTypes";
import { remoteLockService } from "./RemoteLockService";

class RemoteLockHelpers {
  requestAdd(accessCardModalData: RemoteLockModalData, onRequestCompleted: () => void) {
    remoteLockService
      .Add({
        name: accessCardModalData.name,
        url: accessCardModalData.url,
        allowedAccessCardIds: accessCardModalData.allowedAccessCardIds
      })
      .then(onRequestCompleted);
  }

  requestEdit(accessCardModalData: RemoteLockModalData, onRequestCompleted: () => void) {
    remoteLockService
      .Update({
        id: accessCardModalData.id,
        name: accessCardModalData.name,
        url: accessCardModalData.url,
        allowedAccessCardIds: accessCardModalData.allowedAccessCardIds
      })
      .then(onRequestCompleted);
  }

  requestRemove(id: number, onRequestCompleted: () => void) {
    remoteLockService.Delete({ id }).then(onRequestCompleted);
  }

  requestToggleBlock(id: number, targetState: boolean, onRequestCompleted: () => void) {
    remoteLockService.ToggleBlock({ lockId: id, targetState }).then(onRequestCompleted);
  }

  requestUnlock(id: number, onRequestCompleted: () => void) {
    remoteLockService.Unlock({ lockId: id }).then(onRequestCompleted);
  }
}

export const remoteLockHelpers = new RemoteLockHelpers();
