export function combineClasses(...params: (string | undefined)[]) {
  let combined = "";
  params.forEach(p => {
    if (p !== undefined) {
      combined += (combined === "" ? "" : " ") + p;
    }
  });
  return combined;
}
