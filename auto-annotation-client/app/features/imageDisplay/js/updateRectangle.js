/* eslint-disable import/prefer-default-export */

/* eslint-disable import/prefer-default-export */
export function UpdateRectangle(id, left, top, width, height, index) {
  console.log("id: ", id);
  const element = document.getElementById(id);
  console.log(element);
  console.log('update an existed frame');
  element.style.left = `${left}px`;
  element.style.top = `${top}px`;
  element.style.width = `${width}px`;
  element.style.height = `${height}px`;
}

