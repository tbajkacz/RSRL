import { FormatUserInfoArgs } from "./types";

export function formatUserInfo(u: FormatUserInfoArgs) {
  return `${u.name} ${u.surname} (${u.login})`;
}
