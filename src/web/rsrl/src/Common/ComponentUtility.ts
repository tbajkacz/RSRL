import roles from "./roles";

export function combineClasses(...params: (string | undefined)[]) {
  let combined = "";
  params.forEach(p => {
    if (p !== undefined) {
      combined += (combined === "" ? "" : " ") + p;
    }
  });
  return combined;
}

export function getRoleDisplayString(role: string) {
  switch (role) {
    case roles.admin:
      return "admin";
      break;
    case roles.guest:
      return "guest";
    case roles.lockManager:
      return "lock manager";
    case roles.logManager:
      return "log manager";
    default:
      return role;
  }
}
