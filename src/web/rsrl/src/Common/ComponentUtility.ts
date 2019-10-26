export function combineClasses(...params: (string | undefined)[]) {
  let combined = "";
  params.forEach(p => {
    if (typeof p !== undefined) {
      combined += (combined === "" ? "" : " ") + p;
    }
  });
  return combined;
}
