/* eslint-disable import/prefer-default-export */
export function removeRectangle(id) {
  const element = document.getElementById(`${id}`);
  element.parentNode.removeChild(element);
  console.log("remove");
  console.log(id);
}
