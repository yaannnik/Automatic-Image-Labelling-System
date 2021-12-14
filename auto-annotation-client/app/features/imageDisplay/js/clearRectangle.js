/* eslint-disable import/prefer-default-export */
export function clearRectangle(classname) {
  const elements = document.getElementsByClassName(`${classname}`);
  while (elements.length > 0) {
    elements[0].parentNode.removeChild(elements[0]);
  }
}
